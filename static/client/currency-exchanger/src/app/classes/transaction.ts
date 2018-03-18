import { Wallet } from './wallet'

export class Transaction {
  id: number;
  amount: number;
  origin: Wallet;
  destination: Wallet;
}