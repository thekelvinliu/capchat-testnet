# capchat-testnet
a private testnet for prototyping capchat

## usage
### create genesis block
```bash
$ ./index.js
```

### initialize the blockchain
```bash
$ geth --datadir path/to/chain init genesis.json
```

### start the node
```bash
$ geth \
  --datadir path/to/chain \
  --networkid <genesis.config.chainId> \
  --mine --minerthreads 1 --etherbase <genesis.alloc.some-account> \
  --nodiscover \
  --shh \
  --rpc --rpcaddr 0.0.0.0 --rpcport 8888 --rpccorsdomain "*" --rpcapi eth,web3,net,shh
```

## about
capchat is my computer science capstone/senior project.
it is meant to be a secure and usable messaging platform.
this repository contains a tools to generate a genesis block and start a private testnet.

kelvin liu, nyu shanghai class of 2017.
