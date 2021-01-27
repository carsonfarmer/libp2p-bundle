//@ts-check

"use strict";

const PeerId = require("peer-id");
const libp2p = require("./components/libp2p");
const defaultConfig = require("./runtime/config-nodejs");

/**
 * @typedef {Object} Repo
 * @property {import('interface-datastore').Datastore} [datastore]
 * @property {import('interface-datastore').Datastore} [keys]
 */

/**
 * @typedef {Object} Options
 * @property {any} [options]
 * @property {import('peer-id')} [peerId]
 * @property {string[]} [multiaddrs]
 * @property {Repo} [repo]
 * @property {{ pass?: string }} [keychainConfig]
 * @property {import('libp2p').Libp2pConfig} [config]
 */

/**
 * @param {Options} options
 * @returns {Promise<import('libp2p')>}
 */
module.exports = async ({
  options = defaultConfig(),
  peerId,
  multiaddrs = [],
  repo,
  keychainConfig = {},
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
    // @ts-ignore
    repo,
    keychainConfig,
  });
};
