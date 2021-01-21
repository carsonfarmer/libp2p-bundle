# libp2p-bundle

[![standard-readme](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Basic libp2p bundle with settings that match js-ipfs.

This package provides a zero-config setup to make it easy to include a fully-
configured libp2p host in any application. It is almost directly copied from
js-ipfs, so you can be confident the settings are compatible. It alow allows
more nuanced access to the underlying libp2p settings.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

```bash
npm i @nullify/libp2p-bundle
```

## Usage

```javascript
import create from "@nullify/libp2p-bundle";

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
```

## API

### `create(config): Promise<import('libp2p')>`

```javascript
/**
 * @typedef {Object} Repo
 * @property {import('interface-datastore').Datastore} [datastore]
 * @property {import('interface-datastore').Datastore} [keys]
 */

/**
 * @param {Object} config
 * @param {{ config?: any}} [config.options]
 * @param {import('peer-id')} [config.peerId]
 * @param {string[]} [config.multiaddrs]
 * @param {Repo} [config.repo]
 * @param {{ pass?: string }} [config.keychainConfig]
 * @param {import('libp2p').Libp2pConfig} [config.config]
 * @returns {Promise<import('libp2p')>}
 */
const create = async ({
  options,
  peerId,
  multiaddrs,
  repo,
  keychainConfig,
  config,
}) => {
  ...
}
```

The config has defaults for all named options. Usually, you'll only need to
follow the usage pattern outlined above. Another common usage pattern is to
specify a peerId directly.

```javascript
import PeerId from "peer-id";
import create from "@nullify/libp2p-bundle";

PeerId.create().then((peerId) => {
  create({
    peerId,
  }).then((node) => {
    node.start().then(() => console.log("node started"));
  });
});
```

## Maintainers

[@carsonfarmer](https://github.com/carsonfarmer)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2021 Carson Farmer
