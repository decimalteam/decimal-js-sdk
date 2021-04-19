export const MAINNET = 'mainnet';
export const TESTNET = 'testnet';
export const DEVNET = 'devnet';
export function validateNetwork(network) {
  const availableNetworks = [
    MAINNET,
    TESTNET,
    DEVNET,
  ];
  const defaultNetwork = MAINNET;
  if (!network) {
    return defaultNetwork;
  }
  if (availableNetworks.includes(network)) {
    return network;
  }
  throw new Error('Unsupported network type');
}
