declare function _exports({ options, peerId, multiaddrs, repo, keychainConfig, config, }?: Options): Promise<import('libp2p')>;
export = _exports;
export type Repo = {
    datastore?: import("interface-datastore/dist/src/types").Datastore | undefined;
    keys?: import("interface-datastore/dist/src/types").Datastore | undefined;
};
export type Options = {
    options?: any;
    peerId?: PeerId | undefined;
    multiaddrs?: string[] | undefined;
    repo?: Repo | undefined;
    keychainConfig?: {
        pass?: string | undefined;
    } | undefined;
    config?: import("libp2p").Libp2pConfig | undefined;
};
import PeerId = require("peer-id");
//# sourceMappingURL=index.d.ts.map