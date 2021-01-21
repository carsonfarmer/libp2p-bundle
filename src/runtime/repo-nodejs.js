"use strict";

const LevelStore = require("datastore-level");

/**
 * Create a set of default repo stores.
 * @param {string} base The base folder/database name.
 */
module.exports = (base) => {
  const { mkdirSync, existsSync } = require("fs");
  const { join } = require("path");
  if (!existsSync(base)) {
    mkdirSync(base);
  }
  return {
    datastore: new LevelStore(join(base, "datastore")),
    keys: new LevelStore(join(base, "keys")),
  };
};
