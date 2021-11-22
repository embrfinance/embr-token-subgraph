import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export const NULL_CALL_RESULT_VALUE =
  "0x0000000000000000000000000000000000000000000000000000000000000001";

export const ADDRESS_ZERO = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const BIG_DECIMAL_1E6 = BigDecimal.fromString("1e6");

export const BIG_DECIMAL_1E12 = BigDecimal.fromString("1e12");

export const BIG_DECIMAL_1E18 = BigDecimal.fromString("1e18");

export const BIG_DECIMAL_ZERO = BigDecimal.fromString("0");

export const BIG_DECIMAL_ONE = BigDecimal.fromString("1");

export const BIG_INT_ONE = BigInt.fromI32(1);

export const BIG_INT_TWO = BigInt.fromI32(2);

export const BIG_INT_ONE_HUNDRED = BigInt.fromI32(100);

export const BIG_INT_ONE_DAY_SECONDS = BigInt.fromI32(86400);

export const BIG_INT_ZERO = BigInt.fromI32(0);

export const LOCKUP_POOL_NUMBER = BigInt.fromI32(29);

export const LOCKUP_BLOCK_NUMBER = BigInt.fromI32(10959148);

export const MASTER_CHEF_START_BLOCK = BigInt.fromI32(10750000);

export const UNISWAP_SUSHI_ETH_PAIR_FIRST_LIQUDITY_BLOCK =
  BigInt.fromI32(10750005);

export const ACC_BEETX_PRECISION = BigInt.fromString("1000000000000");

export const MASTER_CHEF_INITIAL_EMBR_PER_BLOCK = BigInt.fromString("5050000000000000000");

export const BENTOBOX_DEPOSIT = "deposit";

export const BENTOBOX_TRANSFER = "transfer";

export const BENTOBOX_WITHDRAW = "withdraw";

export const KASHI_PAIR_MEDIUM_RISK_TYPE = "medium";

export const PAIR_ADD_COLLATERAL = "addCollateral";

export const PAIR_REMOVE_COLLATERAL = "removeCollateral";

export const PAIR_ADD_ASSET = "addAsset";

export const PAIR_REMOVE_ASSET = "removeAsset";

export const PAIR_BORROW = "borrow";

export const PAIR_REPAY = "repay";

export const FACTORY_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000000");

export const MASTER_CHEF_ADDRESS = Address.fromString(
  "0x42BaFb14a27295A6e9Ff2c806B8F367E273BD2e4" 
);

export const MASTER_CHEF_V2_ADDRESS = Address.fromString(
  "0xB6a3C0Ddc88C69F3A4a28A1AE1FE2430f0aBCE54"
);

export const SUSHI_BAR_ADDRESS = Address.fromString("0xb9D8Cb0E48acfa05550a8dA7788e51Ac85e03F62");

export const SUSHI_MAKER_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const SUSHI_TOKEN_ADDRESS = Address.fromString(
  "0x292b51c504E014022d9C3e2482C4B4Cf7fcDa950"
);

export const SUSHI_USDT_PAIR_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const XSUSHI_USDC_PAIR_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const XSUSHI_WETH_PAIR_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const SUSHI_DISTRIBUTOR_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const USDC_WETH_PAIR = "0x0000000000000000000000000000000000000000";

export const DAI_WETH_PAIR = "0x0000000000000000000000000000000000000000";

export const USDT_WETH_PAIR = "0x0000000000000000000000000000000000000000";

export const SUSHI_USDT_PAIR = "0x0000000000000000000000000000000000000000";

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString(
  "3000"
);

// minimum liquidity for price to get tracked
export const MINIMUM_LIQUIDITY_THRESHOLD_ETH = BigDecimal.fromString(
  "1000"
);

export const WETH_ADDRESS = Address.fromString("0xfBD49f16d9fc6566aE41C20026DDCf3bADb6ba9F");

export const SUSHISWAP_WETH_USDT_PAIR_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const USDT_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000000");

export const UNISWAP_FACTORY_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const UNISWAP_WETH_USDT_PAIR_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const UNISWAP_SUSHI_ETH_PAIR_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const UNISWAP_SUSHI_USDT_PAIR_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

// Bentobox constants
export const BENTOBOX_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000000");

export const KASHI_PAIR_MEDIUM_RISK_MASTER_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

// MiniChef
export const MINI_CHEF_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000000");

export const COMPLEX_REWARDER = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const CONVEX_REWARDERS: Array<Address> = [Address.fromString('0x9e01aac4b3e8781a85b21d9d9f848e72af77b362'), Address.fromString('0x1fd97b5e5a257b0b9b9a42a96bb8870cbdd1eb79')]

export const ALCX_REWARDER = Address.fromString('0x7519c93fc5073e15d89131fd38118d73a72370f8')

export const NATIVE = Address.fromString("0xd00ae08403B9bbb9124bB305C09058E32C39A48c");

export const USDC = "0x0a35823b2C0a025D97e4002aec5038b96087942D";

export const USDT = "0x0000000000000000000000000000000000000000";

export const DAI = "0x510CD68b4Bdd8cd2fd6e93afe368F0F4e17791F8";

export const WHITELIST: string[] = "0xd00ae08403B9bbb9124bB305C09058E32C39A48c,0x0a35823b2C0a025D97e4002aec5038b96087942D,0x510CD68b4Bdd8cd2fd6e93afe368F0F4e17791F8,0x9d78950bc4C531D32C3F874120F0B96213D81DFC".split(",");

// export const WHITELIST: string[] = [
//   "0xcf664087a5bb0237a0bad6742852ec6c8d69a27a", 
//   "0x6983d1e6def3690c4d616b13597a09e6193ea013", 
//   "0x3095c7557bcb296ccc6e363de01b760ba031f2d9", 
//   "0x985458e523db3d53125813ed68c274899e9dfab4", 
//   "0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f", 
//   "0xe176ebe47d621b984a73036b9da5d834411ef734",
// ]

// export const WHITELIST: string[] = [
//   "0x471ece3750da237f93b8e339c536989b8978a438",
//   "0xd629eb00deced2a080b7ec630ef6ac117e614f1b",
//   "0x765de816845861e75a25fca122bb6898b8b1282a",
//   "0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73"
// ];

const CUSTOM_BASES = new Map<string,string>();