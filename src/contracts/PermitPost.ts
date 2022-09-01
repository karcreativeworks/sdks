/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export type TokenDetailsStruct = {
  tokenType: PromiseOrValue<BigNumberish>;
  token: PromiseOrValue<string>;
  maxAmount: PromiseOrValue<BigNumberish>;
  id: PromiseOrValue<BigNumberish>;
};

export type TokenDetailsStructOutput = [
  number,
  string,
  BigNumber,
  BigNumber
] & { tokenType: number; token: string; maxAmount: BigNumber; id: BigNumber };

export type PermitStruct = {
  tokens: TokenDetailsStruct[];
  spender: PromiseOrValue<string>;
  deadline: PromiseOrValue<BigNumberish>;
  witness: PromiseOrValue<BytesLike>;
};

export type PermitStructOutput = [
  TokenDetailsStructOutput[],
  string,
  BigNumber,
  string
] & {
  tokens: TokenDetailsStructOutput[];
  spender: string;
  deadline: BigNumber;
  witness: string;
};

export type SignatureStruct = {
  v: PromiseOrValue<BigNumberish>;
  r: PromiseOrValue<BytesLike>;
  s: PromiseOrValue<BytesLike>;
};

export type SignatureStructOutput = [number, string, string] & {
  v: number;
  r: string;
  s: string;
};

export interface PermitPostInterface extends utils.Interface {
  functions: {
    "_PERMIT_TYPEHASH()": FunctionFragment;
    "_TOKEN_DETAILS_TYPEHASH()": FunctionFragment;
    "nonceTransferFrom(((uint8,address,uint256,uint256)[],address,uint256,bytes32),address,address[],uint256[],uint256[],(uint8,bytes32,bytes32))": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "saltTransferFrom(((uint8,address,uint256,uint256)[],address,uint256,bytes32),address,address[],uint256[],uint256[],bytes32,(uint8,bytes32,bytes32))": FunctionFragment;
    "usedSalt(address,bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_PERMIT_TYPEHASH"
      | "_TOKEN_DETAILS_TYPEHASH"
      | "nonceTransferFrom"
      | "nonces"
      | "saltTransferFrom"
      | "usedSalt"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_PERMIT_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_TOKEN_DETAILS_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nonceTransferFrom",
    values: [
      PermitStruct,
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      SignatureStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "nonces",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "saltTransferFrom",
    values: [
      PermitStruct,
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>,
      SignatureStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "usedSalt",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "_PERMIT_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_TOKEN_DETAILS_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nonceTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "saltTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "usedSalt", data: BytesLike): Result;

  events: {};
}

export interface PermitPost extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PermitPostInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    _TOKEN_DETAILS_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    nonceTransferFrom(
      permit: PermitStruct,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      sig: SignatureStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nonces(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    saltTransferFrom(
      permit: PermitStruct,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      salt: PromiseOrValue<BytesLike>,
      sig: SignatureStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    usedSalt(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  _PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  _TOKEN_DETAILS_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  nonceTransferFrom(
    permit: PermitStruct,
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>[],
    ids: PromiseOrValue<BigNumberish>[],
    amounts: PromiseOrValue<BigNumberish>[],
    sig: SignatureStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nonces(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  saltTransferFrom(
    permit: PermitStruct,
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>[],
    ids: PromiseOrValue<BigNumberish>[],
    amounts: PromiseOrValue<BigNumberish>[],
    salt: PromiseOrValue<BytesLike>,
    sig: SignatureStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  usedSalt(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    _PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    _TOKEN_DETAILS_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    nonceTransferFrom(
      permit: PermitStruct,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      sig: SignatureStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    nonces(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    saltTransferFrom(
      permit: PermitStruct,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      salt: PromiseOrValue<BytesLike>,
      sig: SignatureStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    usedSalt(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    _PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    _TOKEN_DETAILS_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    nonceTransferFrom(
      permit: PermitStruct,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      sig: SignatureStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nonces(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    saltTransferFrom(
      permit: PermitStruct,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      salt: PromiseOrValue<BytesLike>,
      sig: SignatureStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    usedSalt(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _TOKEN_DETAILS_TYPEHASH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nonceTransferFrom(
      permit: PermitStruct,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      sig: SignatureStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nonces(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    saltTransferFrom(
      permit: PermitStruct,
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>[],
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      salt: PromiseOrValue<BytesLike>,
      sig: SignatureStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    usedSalt(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
