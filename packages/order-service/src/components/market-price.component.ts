import { BaseApplication, BaseComponent, SocketIOKeys, SocketIOServerHelper } from '@lb/infra';
import { CoreBindings, inject } from '@loopback/core';

export class MarketPriceComponent extends BaseComponent {
    constructor(
        @inject(CoreBindings.APPLICATION_INSTANCE) private application: BaseApplication,
    ) {
        super({ scope: MarketPriceComponent.name });
        let volume1 = 10000
        let volume2 = 13003
        let volume3 = 20223000
        let volume4 = 600
        setInterval(() => {
            const socketServer = this.application.getSync<SocketIOServerHelper>(SocketIOKeys.SOCKET_IO_INSTANCE);

            if (!socketServer) {
                return;
            }

            socketServer.send({
                destination: 'market-price',
                payload: {
                    topic: 'market-price',
                    data: [{
                        symbol: "VN30F2306",
                        ceil: 1139.8,
                        floor: 990.8,
                        reference: 1065.3,
                        volume: volume1 += 52,
                        price: +((Math.random() * (1139.8 - 990.8 + 1)) + 990.8).toFixed(2),
                        percent: (Math.round(Math.random() * 10) % 2 === 0 ? '-' : '') + (Math.random() * 10).toFixed(2),
                    }, {
                        symbol: "VN30F2307",
                        ceil: 1136.6,
                        floor: 988,
                        reference: 1062.3,
                        volume: volume2 += 102,
                        price: +((Math.random() * (1136.6 - 988 + 1)) + 988).toFixed(2),
                        percent: (Math.round(Math.random() * 10) % 2 === 0 ? '-' : '') + (Math.random() * 10).toFixed(2),
                    }, {
                        symbol: "VN30F2309",
                        ceil: 1134.4,
                        floor: 986.2,
                        reference: 1060.4,
                        volume: volume3 += 265,
                        price: +((Math.random() * (1134.4 - 986.2 + 1)) + 986.2).toFixed(2),
                        percent: (Math.round(Math.random() * 10) % 2 === 0 ? '-' : '') + (Math.random() * 10).toFixed(2),
                    }, {
                        symbol: "VN30F2312",
                        ceil: 1132,
                        floor: 984,
                        reference: 1058,
                        volume: volume4 += 12,
                        price: +((Math.random() * (1132 - 984 + 1)) + 984).toFixed(2),
                        percent: (Math.round(Math.random() * 10) % 2 === 0 ? '-' : '') + (Math.random() * 10).toFixed(2),
                    }]
                }
            })
        }, 2000)
    }
}
