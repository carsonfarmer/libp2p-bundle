/* eslint-env mocha */
"use strict";

const expect = require("./utils/expect");
const MemoryStore = require("interface-datastore").MemoryDatastore;
const create = require("../src/index");

const createRepo = () => {
  return {
    datastore: new MemoryStore(),
    keys: new MemoryStore(),
  };
};

describe("libp2p discovery", function () {
  // Provide some extra time for ci since we're starting libp2p nodes in each test
  this.timeout(25 * 1000);

  let nodes = [];

  before(async () => {
    nodes.push(
      ...(await Promise.all([
        create({ repo: createRepo() }),
        create({
          repo: createRepo(),
          multiaddrs: ["/ip4/0.0.0.0/tcp/4004", "/ip4/0.0.0.0/tcp/4005/ws"],
        }),
      ]))
    );
  });

  afterEach(async () => {
    if (nodes.length) {
      for (const node of nodes) {
        await node.stop();
      }
    }
  });

  it("should connect to default bootstrap nodes", async () => {
    const libp2p = nodes[0];
    const p = new Promise((resolve) => {
      let count = 0;
      libp2p.on("peer:discovery", () => {
        count++;
        if (count > 10) {
          resolve(count);
        }
      });
    });

    await libp2p.start();
    const count = await p;
    expect(count).to.be.greaterThan(10);
    await libp2p.stop();
  });

  it("should connect to a local peer via mdns", async () => {
    const [node1, node2] = nodes;

    // Race to see which finds the other first, then call done
    const p1 = new Promise((resolve) => {
      node1.on("peer:discovery", (peerId) => {
        if (peerId.equals(node2.peerId)) resolve(true);
      });
    });

    const p2 = new Promise((resolve) => {
      node2.on("peer:discovery", (peerId) => {
        if (peerId.equals(node1.peerId)) resolve(true);
      });
    });

    if (!node1.isStarted()) node1.start();
    if (!node2.isStarted()) node2.start();

    const resolved = await Promise.all([p1, p2]);
    expect(resolved.every((val) => val)).to.be.true();
  });
});
