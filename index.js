#!/usr/bin/env node

// imports
const crypto = require('crypto');
const path = require('path');
const jsonfile = require('jsonfile');
const Wallet = require('ethers').Wallet;

// constants
const NUM_ACCOUNTS = 10;
const ZERO = Buffer.alloc(32);

// output paths
const genesisPath = path.join(__dirname, 'genesis.json');
const walletsPath = path.join(__dirname, 'wallets.json');

// create NUM_ACCOUNTS accounts
const wallets = [...Array(NUM_ACCOUNTS)]
  // random wallets
  .map(() => Wallet.createRandom({}))
  // extract address and mnemonic
  .map(({ address, mnemonic }) => ({ address, mnemonic }));

// write wallets
jsonfile.writeFile(walletsPath, wallets, { spaces: 2 }, err => {
  if (err)
    console.error(err);
  else
    console.log(`wallets saved to ${walletsPath}`);
});

// create parts of the genesis
// allocated ether
const alloc = wallets.reduce((acc, val, ind) => {
  acc[val.address] = {
    balance: '1000000000000000000000000'
  };
  return acc;
}, {});
const config = {
  chainId: parseInt(crypto.randomBytes(2).toString('hex'), 16),
  homesteadBlock: 0,
  eip155Block: 0,
  eip158Block: 0
};

// assemble it all
const genesisBlock = {
  alloc,
  config,
  coinbase: `0x${ZERO.slice(0, 20).toString('hex')}`,
  difficulty: '0x020000',
  extraData: `0x${ZERO.toString('hex')}`,
  gasLimit: '0xFFFFFF',
  nonce: `0x${crypto.randomBytes(8).toString('hex')}`,
  mixhash: `0x${ZERO.toString('hex')}`,
  parentHash: `0x${ZERO.toString('hex')}`,
  timestamp: '0'
};

// write genesisBlock
jsonfile.writeFile(genesisPath, genesisBlock, { spaces: 2 }, err => {
  if (err)
    console.error(err);
  else
    console.log(`genesis block saved to ${genesisPath}`);
});
