# libp2p-bundle

[![standard-readme](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Basic libp2p bundle with settings that match js-ipfs.

This package provides a zero-config setup to make it easy to include a fully-
configured libp2p host in any application. It is almost directly copied from
js-ipfs, so you can be confident the settings are compatible. It also allows
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

## Functions

<dl>
<dt><a href="#create">create(options)</a> ⇒ <code><a href="#Libp2p">Promise.&lt;Libp2p&gt;</a></code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Repo">Repo</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Libp2pConfig">Libp2pConfig</a> : <code>module:libp2p~Libp2pConfig</code></dt>
<dd></dd>
<dt><a href="#Libp2p">Libp2p</a> : <code>module:libp2p</code></dt>
<dd></dd>
<dt><a href="#Options">Options</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="create"></a>

## create(options) ⇒ [<code>Promise.&lt;Libp2p&gt;</code>](#Libp2p)
**Kind**: global function  
**Returns**: [<code>Promise.&lt;Libp2p&gt;</code>](#Libp2p) - <p>A properly configured libp2p host.</p>  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>options</td><td><code><a href="#Options">Options</a></code></td><td><p>The set of options to control bundle creation.</p></td>
    </tr>  </tbody>
</table>

<a name="Repo"></a>

## Repo : <code>object</code>
**Kind**: global typedef  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[datastore]</td><td><code>module:interface-datastore~Datastore</code></td><td><p>Input datastore.</p></td>
    </tr><tr>
    <td>[keys]</td><td><code>module:interface-datastore~Datastore</code></td><td><p>Input keystore</p></td>
    </tr>  </tbody>
</table>

<a name="Libp2pConfig"></a>

## Libp2pConfig : <code>module:libp2p~Libp2pConfig</code>
**Kind**: global typedef  
<a name="Libp2p"></a>

## Libp2p : <code>module:libp2p</code>
**Kind**: global typedef  
<a name="Options"></a>

## Options : <code>object</code>
**Kind**: global typedef  
**Properties**

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[options]</td><td><code>any</code></td><td><p>IPFS options.</p></td>
    </tr><tr>
    <td>[peerId]</td><td><code>PeerId</code></td><td><p>Input PeerID object.</p></td>
    </tr><tr>
    <td>[multiaddrs]</td><td><code>Array.&lt;string&gt;</code></td><td><p>Set of multiaddrs to listen on.</p></td>
    </tr><tr>
    <td>[repo]</td><td><code><a href="#Repo">Repo</a></code></td><td><p>Input repo config.</p></td>
    </tr><tr>
    <td>[keychainConfig]</td><td><code>Object</code></td><td><p>Input keychain config.</p></td>
    </tr><tr>
    <td>[config]</td><td><code><a href="#Libp2pConfig">Libp2pConfig</a></code></td><td><p>Libp2p options.</p></td>
    </tr>  </tbody>
</table>


## Maintainers

[@carsonfarmer](https://github.com/carsonfarmer)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2021 Carson Farmer