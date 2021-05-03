//@ts-check

"use strict";

const PeerId = require("peer-id");
const libp2p = require("./components/libp2p");
const defaultConfig = require("./runtime/config-nodejs");

/**
 * @typedef {object} Repo
 * @property {import("interface-datastore").Datastore} [datastore] Input datastore.
 * @property {import("interface-datastore").Datastore} [keys] Input keystore
 */

/**
 * @typedef {import("libp2p").Libp2pConfig} Libp2pConfig
 */

/**
 * @typedef {import("libp2p")} Libp2p
 */

/**
 * @typedef {object} Options
 * @property {any} [options] IPFS options.
 * @property {PeerId} [peerId] Input PeerID object.
 * @property {string[]} [multiaddrs] Set of multiaddrs to listen on.
 * @property {Repo} [repo] Input repo config.
 * @property {{pass: string}} [keychainConfig] Input keychain config.
 * @property {Libp2pConfig} [config] Libp2p options.
 */

/**
 * @param {Options} options The set of options to control bundle creation.
 * @returns {Promise<Libp2p>} A properly configured libp2p host.
 */
const create = async ({
  options = defaultConfig(),
  peerId,
  multiaddrs = [],
  repo = {},
  keychainConfig,
  config = {},
} = {}) => {
  if (peerId === undefined) {
    peerId = await PeerId.create();
  }
  options.config = options.config || options;
  if (multiaddrs.length === 0 && options.config) {
    multiaddrs = options.config.Addresses ? options.config.Addresses.Swarm : [];
  }
  return libp2p({
    options,
    peerId,
    multiaddrs,
    config,
    repo,
    keychainConfig,
  });
};

module.exports = create;
