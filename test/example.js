// @ts-check
const LevelStore = require("datastore-level");
const { mkdirSync, existsSync } = require("fs");
const { join } = require("path");
const create = require("../src/index");

// Create a persistent on-disk repo for demo
const createRepo = (base) => {
  if (!existsSync(base)) {
    mkdirSync(base);
  }
  return {
    datastore: new LevelStore(join(base, "datastore")),
    keys: new LevelStore(join(base, "keys")),
  };
};

const run = async () => {
  const node = await create({
    multiaddrs: ["/ip4/0.0.0.0/tcp/4007", "/ip4/0.0.0.0/tcp/4008/ws"],
    repo: createRepo("./libp2p"),
  });

  const p = new Promise((resolve) => {
    // Promise resolves on first discovered peer
    node.on("peer:discovery", (peerId) => {
      resolve(peerId);
    });
  });

  await node.start();

  const listenAddrs = node.transportManager.getAddrs();
  console.log("listening on: ", listenAddrs);

  const peerId = await p;
  console.log(`Discovered: ${peerId.toB58String()}`);
  await node.stop();
  process.exit();
};

run();
