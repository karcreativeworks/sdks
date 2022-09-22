import hre, { ethers } from 'hardhat';
import { expect } from 'chai';

import DutchLimitOrderReactorAbi from '../../abis/DutchLimitOrderReactor.json';
import PermitPostAbi from '../../abis/PermitPost.json';
import OrderQuoterAbi from '../../abis/OrderQuoter.json';
import MockERC20Abi from '../../abis/MockERC20.json';

import {
  OrderQuoter,
  PermitPost,
  DutchLimitOrderReactor,
  MockERC20,
} from '../../src/contracts';
import {
  DutchLimitOrderBuilder,
  DutchLimitOrder,
  OrderValidator,
  OrderQuoter as OrderQuoterLib,
  OrderValidation,
  getCancelSingleParams,
} from '../../';

const { BigNumber } = ethers;

describe('OrderValidator', () => {
  let reactor: DutchLimitOrderReactor;
  let permitPost: PermitPost;
  let quoter: OrderQuoter;
  let chainId: number;
  let builder: DutchLimitOrderBuilder;
  let wallet: ethers.Wallet;
  let validator: OrderValidator;
  let tokenIn: MockERC20;
  let tokenOut: MockERC20;

  before(async () => {
    const [admin] = await ethers.getSigners();
    const permitPostFactory = await ethers.getContractFactory(
      PermitPostAbi.abi,
      PermitPostAbi.bytecode
    );
    permitPost = (await permitPostFactory.deploy()) as PermitPost;

    const reactorFactory = await ethers.getContractFactory(
      DutchLimitOrderReactorAbi.abi,
      DutchLimitOrderReactorAbi.bytecode
    );
    reactor = (await reactorFactory.deploy(
      permitPost.address
    )) as DutchLimitOrderReactor;

    const orderQuoterFactory = await ethers.getContractFactory(
      OrderQuoterAbi.abi,
      OrderQuoterAbi.bytecode
    );
    quoter = (await orderQuoterFactory.deploy()) as OrderQuoter;
    chainId = hre.network.config.chainId || 1;
    builder = new DutchLimitOrderBuilder(
      chainId,
      reactor.address,
      permitPost.address
    );

    wallet = ethers.Wallet.createRandom().connect(ethers.provider);
    await admin.sendTransaction({
      to: await wallet.getAddress(),
      value: BigNumber.from(10).pow(18),
    });
    validator = new OrderValidator(ethers.provider, chainId, quoter.address);

    const tokenFactory = await ethers.getContractFactory(
      MockERC20Abi.abi,
      MockERC20Abi.bytecode
    );
    tokenIn = (await tokenFactory.deploy('TEST', 'test', 18)) as MockERC20;
    await tokenIn.mint(await wallet.getAddress(), BigNumber.from(10).pow(18));
    await tokenIn
      .connect(wallet)
      .approve(permitPost.address, ethers.constants.MaxUint256);

    tokenOut = (await tokenFactory.deploy('TEST', 'test', 18)) as MockERC20;
  });

  it('quotes a valid order', async () => {
    const deadline = Math.floor(new Date().getTime() / 1000) + 1000;
    const order = builder
      .deadline(deadline)
      .endTime(deadline)
      .startTime(deadline - 1000)
      .nonce(BigNumber.from(98))
      .input({
        token: tokenIn.address,
        amount: BigNumber.from('1000000'),
      })
      .output({
        token: tokenOut.address,
        startAmount: BigNumber.from('1000000000000000000'),
        endAmount: BigNumber.from('900000000000000000'),
        recipient: '0x0000000000000000000000000000000000000000',
      })
      .build();

    const { domain, types, values } = order.permitData();
    const signature = await wallet._signTypedData(domain, types, values);

    const quoterLib = new OrderQuoterLib(
      ethers.provider,
      chainId,
      quoter.address
    );
    const { validation, quote } = await quoterLib.quote({ order, signature });
    expect(validation).to.equal(OrderValidation.OK);
    if (!quote) {
      throw new Error('Invalid quote');
    }

    expect(quote.input.amount.toString()).to.equal('1000000');
  });

  it('validates a valid order', async () => {
    const deadline = Math.floor(new Date().getTime() / 1000) + 1000;
    const order = builder
      .deadline(deadline)
      .endTime(deadline)
      .startTime(deadline - 1000)
      .nonce(BigNumber.from(100))
      .input({
        token: tokenIn.address,
        amount: BigNumber.from('1000000'),
      })
      .output({
        token: tokenOut.address,
        startAmount: BigNumber.from('1000000000000000000'),
        endAmount: BigNumber.from('900000000000000000'),
        recipient: '0x0000000000000000000000000000000000000000',
      })
      .build();

    const { domain, types, values } = order.permitData();
    const signature = await wallet._signTypedData(domain, types, values);

    expect(await validator.validate({ order, signature })).to.equal(
      OrderValidation.OK
    );
  });

  it('validates an order with insufficient funds', async () => {
    const deadline = Math.floor(new Date().getTime() / 1000) + 1000;
    const order = builder
      .deadline(deadline)
      .endTime(deadline)
      .startTime(deadline - 1000)
      .nonce(BigNumber.from(100))
      .input({
        token: tokenIn.address,
        amount: BigNumber.from('10')
          .pow(18)
          .mul(2),
      })
      .output({
        token: tokenOut.address,
        startAmount: BigNumber.from('1000000000000000000'),
        endAmount: BigNumber.from('900000000000000000'),
        recipient: '0x0000000000000000000000000000000000000000',
      })
      .build();

    const { domain, types, values } = order.permitData();
    const signature = await wallet._signTypedData(domain, types, values);

    expect(await validator.validate({ order, signature })).to.equal(
      OrderValidation.InsufficientFunds
    );
  });

  it('validates an expired order', async () => {
    const deadline = Math.floor(new Date().getTime() / 1000) + 1;
    const info = builder
      .deadline(deadline)
      .endTime(deadline)
      .startTime(deadline)
      .nonce(BigNumber.from(100))
      .input({
        token: tokenIn.address,
        amount: BigNumber.from('1000000'),
      })
      .output({
        token: tokenOut.address,
        startAmount: BigNumber.from('1000000000000000000'),
        endAmount: BigNumber.from('900000000000000000'),
        recipient: '0x0000000000000000000000000000000000000000',
      })
      .build().info;
    const order = new DutchLimitOrder(
      Object.assign(info, {
        deadline: deadline - 100,
        endTime: deadline - 100,
        startTime: deadline - 101,
      }),
      chainId,
      permitPost.address
    );

    const { domain, types, values } = order.permitData();
    const signature = await wallet._signTypedData(domain, types, values);

    expect(await validator.validate({ order, signature })).to.equal(
      OrderValidation.Expired
    );
  });

  it('validates an order before and after expiry', async () => {
    const deadline = Math.floor(new Date().getTime() / 1000) + 1000;
    const info = builder
      .deadline(deadline)
      .endTime(deadline)
      .startTime(deadline - 1000)
      .nonce(BigNumber.from(100))
      .input({
        token: tokenIn.address,
        amount: BigNumber.from('1000000'),
      })
      .output({
        token: tokenOut.address,
        startAmount: BigNumber.from('1000000000000000000'),
        endAmount: BigNumber.from('900000000000000000'),
        recipient: '0x0000000000000000000000000000000000000000',
      })
      .build().info;

    const order = new DutchLimitOrder(
      info,
      chainId,
      permitPost.address
    );

    const { domain, types, values } = order.permitData();
    const signature = await wallet._signTypedData(domain, types, values);

    expect(await validator.validate({ order, signature })).to.equal(
      OrderValidation.OK
    );
    await hre.network.provider.send("evm_increaseTime", [3600])
    await hre.network.provider.send("evm_mine") // this one will have 02:00 PM as its timestamp
    expect(await validator.validate({ order, signature })).to.equal(
      OrderValidation.Expired
    );
    expect(await validator.validate({ order, signature })).to.equal(
      OrderValidation.Expired
    );
    expect(await validator.validate({ order, signature })).to.equal(
      OrderValidation.Expired
    );
    expect(await validator.validate({ order, signature })).to.equal(
      OrderValidation.Expired
    );
  });

  it('validates an invalid dutch decay', async () => {
    const deadline = Math.floor(new Date().getTime() / 1000) + 1;
    const info = builder
      .deadline(deadline)
      .endTime(deadline)
      .startTime(deadline)
      .nonce(BigNumber.from(100))
      .input({
        token: tokenIn.address,
        amount: BigNumber.from('1000000'),
      })
      .output({
        token: tokenOut.address,
        startAmount: BigNumber.from('1000000000000000000'),
        endAmount: BigNumber.from('900000000000000000'),
        recipient: '0x0000000000000000000000000000000000000000',
      })
      .build().info;
    const order = new DutchLimitOrder(
      Object.assign(info, { endTime: deadline - 100 }),
      chainId,
      permitPost.address
    );

    const { domain, types, values } = order.permitData();
    const signature = await wallet._signTypedData(domain, types, values);

    expect(await validator.validate({ order, signature })).to.equal(
      OrderValidation.InvalidOrderFields
    );
  });

  it('validates a canceled order', async () => {
    const deadline = Math.floor(new Date().getTime() / 1000) + 1;
    const info = builder
      .deadline(deadline)
      .endTime(deadline)
      .startTime(deadline - 1000)
      .nonce(BigNumber.from(7))
      .input({
        token: tokenIn.address,
        amount: BigNumber.from('1000000'),
      })
      .output({
        token: tokenOut.address,
        startAmount: BigNumber.from('1000000000000000000'),
        endAmount: BigNumber.from('900000000000000000'),
        recipient: '0x0000000000000000000000000000000000000000',
      })
      .build().info;
    const order = new DutchLimitOrder(
      info,
      chainId,
      permitPost.address
    );

    const { domain, types, values } = order.permitData();
    const signature = await wallet._signTypedData(domain, types, values);
    const { word, mask } = getCancelSingleParams(BigNumber.from(7));
    await permitPost.connect(wallet).invalidateUnorderedNonces(word, mask);

    expect(await validator.validate({ order, signature })).to.equal(
      OrderValidation.Cancelled
    );
  });
});
