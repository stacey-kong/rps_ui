export const rpsAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "dealer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "result",
        type: "uint8",
      },
    ],
    name: "CloseGame",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "dealer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CreateGame",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "JoinGame",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "choice",
        type: "uint8",
      },
    ],
    name: "Reveal",
    type: "event",
  },
  {
    inputs: [],
    name: "DEALERWIN",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DRAW",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NONE",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAPER",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PLAYERWIN",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ROCK",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SCISSORS",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "choice",
        type: "uint8",
      },
    ],
    name: "checkChoice",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameid",
        type: "uint256",
      },
    ],
    name: "close",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "dealerHash",
        type: "bytes32",
      },
      {
        internalType: "address payable",
        name: "player",
        type: "address",
      },
    ],
    name: "createGame",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "expireTimeLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gameidsOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "games",
    outputs: [
      {
        internalType: "uint256",
        name: "expireTime",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "dealer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "dealerValue",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "dealerHash",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "dealerChoice",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "playerChoice",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "playerValue",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "result",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "closed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "choice",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "randomSecret",
        type: "bytes32",
      },
    ],
    name: "getProof",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameid",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "choice",
        type: "uint8",
      },
    ],
    name: "joinGame",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxgame",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "payoff",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameid",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "choice",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "randomSecret",
        type: "bytes32",
      },
    ],
    name: "reveal",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
