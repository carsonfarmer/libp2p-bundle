declare function _exports(): {
    dialer: {
        maxParallelDials: number;
        maxDialsPerPeer: number;
        dialTimeout: number;
    };
    modules: {
        transport: any[];
        streamMuxer: any[];
        connEncryption: import("libp2p-noise").Noise[];
        peerDiscovery: any[];
        dht: typeof KadDHT;
        pubsub: typeof GossipSub;
    };
    config: {
        peerDiscovery: {
            [x: number]: {
                enabled: boolean;
            };
            autoDial: boolean;
            bootstrap: {
                enabled: boolean;
            };
        };
        dht: {
            kBucketSize: number;
            enabled: boolean;
            clientMode: boolean;
            randomWalk: {
                enabled: boolean;
            };
            validators: {
                ipns: {
                    func: (key: any, record: any, cb: any) => Promise<void>;
                };
            };
            selectors: {
                ipns: (_k: any, records: any) => 0 | 1;
            };
        };
        pubsub: {
            enabled: boolean;
            emitSelf: boolean;
            signMessages: boolean;
            strictSigning: boolean;
        };
    };
    metrics: {
        enabled: boolean;
    };
    peerStore: {
        persistence: boolean;
    };
};
export = _exports;
import KadDHT = require("libp2p-kad-dht");
import GossipSub = require("libp2p-gossipsub");
//# sourceMappingURL=libp2p-nodejs.d.ts.map