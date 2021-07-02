const address = process.env.REACT_APP_LOCAL_ARCHIMEDES_ADDR
const abi     = [
  {
    'inputs': [
      {
        'internalType': 'contract PiToken',
        'name': '_pi',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': '_startBlock',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': '_devAddress',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': '_feeAddress',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': '_vaultAddress',
        'type': 'address'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'pid',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'Deposit',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'pid',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'EmergencyWithdraw',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'previousOwner',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'OwnershipTransferred',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'referrer',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'commissionAmount',
        'type': 'uint256'
      }
    ],
    'name': 'ReferralCommissionPaid',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'newAddress',
        'type': 'address'
      }
    ],
    'name': 'SetDevAddress',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'newAddress',
        'type': 'address'
      }
    ],
    'name': 'SetFeeAddress',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'contract IReferral',
        'name': 'newAddress',
        'type': 'address'
      }
    ],
    'name': 'SetReferralAddress',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'newAddress',
        'type': 'address'
      }
    ],
    'name': 'SetVaultAddress',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'piPerBlock',
        'type': 'uint256'
      }
    ],
    'name': 'UpdateEmissionRate',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'pid',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'Withdraw',
    'type': 'event'
  },
  {
    'inputs': [],
    'name': 'MAXIMUM_REFERRAL_COMMISSION_RATE',
    'outputs': [
      {
        'internalType': 'uint16',
        'name': '',
        'type': 'uint16'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_allocPoint',
        'type': 'uint256'
      },
      {
        'internalType': 'contract IERC20',
        'name': '_lpToken',
        'type': 'address'
      },
      {
        'internalType': 'uint16',
        'name': '_depositFeeBP',
        'type': 'uint16'
      }
    ],
    'name': 'add',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_pid',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': '_amount',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': '_referrer',
        'type': 'address'
      }
    ],
    'name': 'deposit',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'devAddress',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_pid',
        'type': 'uint256'
      }
    ],
    'name': 'emergencyWithdraw',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'feeAddress',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_from',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': '_to',
        'type': 'uint256'
      }
    ],
    'name': 'getMultiplier',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'pure',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'massUpdatePools',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_pid',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': '_user',
        'type': 'address'
      }
    ],
    'name': 'pendingFish',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'pi',
    'outputs': [
      {
        'internalType': 'contract PiToken',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'piPerBlock',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'contract IERC20',
        'name': '',
        'type': 'address'
      }
    ],
    'name': 'poolExistence',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'name': 'poolInfo',
    'outputs': [
      {
        'internalType': 'contract IERC20',
        'name': 'lpToken',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'allocPoint',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'lastRewardBlock',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'accPiPerShare',
        'type': 'uint256'
      },
      {
        'internalType': 'uint16',
        'name': 'depositFeeBP',
        'type': 'uint16'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'poolLength',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'referral',
    'outputs': [
      {
        'internalType': 'contract IReferral',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'referralCommissionRate',
    'outputs': [
      {
        'internalType': 'uint16',
        'name': '',
        'type': 'uint16'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_pid',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': '_allocPoint',
        'type': 'uint256'
      },
      {
        'internalType': 'uint16',
        'name': '_depositFeeBP',
        'type': 'uint16'
      }
    ],
    'name': 'set',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_devAddress',
        'type': 'address'
      }
    ],
    'name': 'setDevAddress',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_feeAddress',
        'type': 'address'
      }
    ],
    'name': 'setFeeAddress',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'contract IReferral',
        'name': '_referral',
        'type': 'address'
      }
    ],
    'name': 'setReferralAddress',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint16',
        'name': '_referralCommissionRate',
        'type': 'uint16'
      }
    ],
    'name': 'setReferralCommissionRate',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '_vaultAddress',
        'type': 'address'
      }
    ],
    'name': 'setVaultAddress',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'startBlock',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'totalAllocPoint',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_piPerBlock',
        'type': 'uint256'
      }
    ],
    'name': 'updateEmissionRate',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_pid',
        'type': 'uint256'
      }
    ],
    'name': 'updatePool',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_startBlock',
        'type': 'uint256'
      }
    ],
    'name': 'updateStartBlock',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'name': 'userInfo',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'amount',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'rewardDebt',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'vaultAddress',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_pid',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': '_amount',
        'type': 'uint256'
      }
    ],
    'name': 'withdraw',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
]

const aToken = {
  address: '0xc9276ECa6798A14f64eC33a526b547DAd50bDa2F',
}

const debtToken = {
  address: '0xc156967272b7177DcE40E3b3E7c4269f750F3160'
}

const vault = { abi, address, aToken, debtToken }

export default vault