export enum CHOICE {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
  NONE = "NONE",
}

export interface GAME {
  value: string;
  expireTime: number;
  id: number;
  creator: string;
  complete:boolean
}

export const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"
