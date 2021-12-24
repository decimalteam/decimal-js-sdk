import { Bech32String, Bytes } from '@tendermint/types';

export declare class Account {
  address: Bech32String;
  privateKey: Bytes;
  publicKey: Bytes;
}

export declare class Wallet {
  constructor(mnemonic?: string);

  mnemonic: string;
  validatorAddress: string;
  wallet: Account;
  depth: number;
  id: number;
  wallets: Array<Account>;
  address: string;
  privateKey: string;
  publicKey: string;
  availableProposalSubmit: boolean;

  getPrivateKeyString(): string;
  getPublicKeyString(): string;
  switchAccount(id: number): void;
  generateAccount(): void;
  generateAndSwitchAccount(depth: number, id: number): void
}

export interface DecimalMeta {
  account_number: string;
  chain_id: string;
  sequence: string;
}

export interface Coin {
  symbol: string;
  title: string;
  volume: string;
  reserve: string;
  crr: number;
  limitVolume: string;
  creator: string;
  txHash: null | string;
  blockId: null | number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tx {
  hash: string;
  timestamp: string;
  status: string;
  type: string;
  fee: object; //TODO: describe interface
  data: object; //TODO: describe interface
  nonce: number;
  code: number;
  message: string;
  blockId: number;
  from: string;
  to: null | string;
  createdAt: string;
  updatedAt: string;
}
export interface Balance {
  [x: string]: string;
}
export interface GetAddressResponseAddress {
  address: string;
  type: string;
  balance: Balance;
  nonce: number;
  createdAt: string;
  updatedAt: string;
  totalStake: string | null;
  txs: Tx[];
}
export interface GetAddressResponse {
  address: GetAddressResponseAddress;
  coins: Coin[];
}
export interface DecimalOptions {
  wallet: Wallet;
  meta?: DecimalMeta;
  baseURL: string;
}

export interface DecimalError {
  errorCode: number;
  errorMessage: string;
}

export interface DecimalResponse {
  hash: string;
  success: boolean;
  error: DecimalError | null;
}

export interface TxOptions {
  feeCoin?: string;
  message?: string;
  gasLimit?: string;
}

export interface SendCoinsData {
  to: string;
  coin: string;
  amount: string
}

export interface BuyCoinsData {
  buyCoin: string;
  amount: string;
  spendCoin: string;
  maxSpendLimit?: string
}

export interface SellCoinsData {
  sellCoin: string;
  amount: string;
  getCoin: string;
  minBuyLimit?: string;
}

export interface SellAllCoinsData {
  sellCoin: string;
  getCoin: string;
  minBuyLimit?: string;
}

export declare class Decimal{
  constructor(options: DecimalOptions)

  sendCoins(data: SendCoinsData, options?: TxOptions): Promise<DecimalResponse>;
  buyCoins(data: BuyCoinsData, options?: TxOptions): Promise<DecimalResponse>;
  sellCoins(data: SellCoinsData, options?: TxOptions): Promise<DecimalResponse>;
  sellAllCoins(data: SellAllCoinsData, options?: TxOptions): Promise<DecimalResponse>;

  getAddress(address: string): Promise<GetAddressResponse>
}
