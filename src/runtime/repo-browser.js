"use strict";

const LevelStore = require("datastore-level");

/**
 * Create a set of default repo stores.
 * @param {string} base The base folder/database name.
 */
module.exports = (base) => {
  return {
    datastore: new LevelStore(`${base}/datastore`),
    keys: new LevelStore(`${base}/keys`),
  };
};
