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
  complete: boolean;
}

export enum RESULT {
  DRAW = 101,
  PLAYERWIN = 102,
  DEALERWIN = 201,
}

const verifyContractAddress = () => {
  if (process.env.NODE_ENV === "production") {
    return "0xbef444230B8005F255C859E7eea90AD58da74684";
  } else {
    return "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
  }
};

export const contractAddress = verifyContractAddress();
