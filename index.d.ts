export declare class Wallet {
  constructor(mnemonic?: string);

  mnemonic: string;
  address: string;
  privateKey: string;
  publicKey: string;
  validatorAddress: string;

  getPrivateKeyString(): string;
  getPublicKeyString(): string;
}

export interface DecimalMeta {
  account_number: string;
  chain_id: string;
  sequence: string;
}

export interface DecimalOptions {
  wallet: Wallet;
  meta?: DecimalMeta;
  baseUrl: string;
}

export interface DecimalResponse {
  hash: string;
  success: boolean;
  error: string | null;
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
  sellAllCoins(data: SellAllCoinsData, options?: TxOptions): Promise<DecimalResponse>
}
