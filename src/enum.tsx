export enum CHOICE {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
  NONE = "NONE",
}

export interface GAME {
  value: number;
  expireTime: number;
}
