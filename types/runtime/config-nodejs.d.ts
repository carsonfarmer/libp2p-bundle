declare function _exports(): {
    Addresses: {
        Swarm: string[];
        API: string;
        Gateway: string;
        Delegates: string[];
    };
    Discovery: {
        MDNS: {
            Enabled: boolean;
            Interval: number;
        };
        webRTCStar: {
            Enabled: boolean;
        };
    };
    Bootstrap: string[];
    Pubsub: {
        Router: string;
        Enabled: boolean;
    };
    Swarm: {
        ConnMgr: {
            LowWater: number;
            HighWater: number;
        };
    };
    Routing: {
        Type: string;
    };
};
export = _exports;
//# sourceMappingURL=config-nodejs.d.ts.map