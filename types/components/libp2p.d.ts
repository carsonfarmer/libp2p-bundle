declare function _exports({ options, peerId, multiaddrs, repo, keychainConfig, config, }: {
    repo: Object;
    options?: Partial<import("libp2p").Libp2pOptions> | undefined;
    peerId?: import("peer-id") | undefined;
    multiaddrs?: string[] | undefined;
    keychainConfig?: {
        pass?: string | undefined;
    } | undefined;
    config?: import("libp2p").Libp2pConfig | undefined;
}): import('libp2p');
export = _exports;
//# sourceMappingURL=libp2p.d.ts.map