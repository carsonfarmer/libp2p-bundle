const create = require("../src/index");

const run = async () => {
  const node = await create({
    multiaddrs: ["/ip4/0.0.0.0/tcp/4007", "/ip4/0.0.0.0/tcp/4008/ws"],
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
