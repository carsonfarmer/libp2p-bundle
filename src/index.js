//@ts-check

"use strict";

const PeerId = require("peer-id");
const libp2p = require("./components/libp2p");
const defaultConfig = require("./runtime/config-nodejs");
const createRepo = require("./runtime/repo-nodejs");

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
module.exports = async ({
  options = {
    config: defaultConfig(),
  },
  peerId,
  multiaddrs = options.config.Addresses.Swarm || [],
  repo,
  keychainConfig = {},
  config = {},
} = {}) => {
  if (peerId === undefined) {
    peerId = await PeerId.create();
  }
  if (!repo) {
    repo = createRepo(".libp2p");
  }
  return libp2p({ options, peerId, multiaddrs, config, repo, keychainConfig });
};
