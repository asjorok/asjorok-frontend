import * as nsq from 'nsqjs';

const channel = 'planet.list';
const responseId = 'TEST'
const responseChannel = `${channel}#${responseId}`;

const r = new nsq.Reader(responseChannel, 'handle', {
    lookupdHTTPAddresses: '127.0.0.1:4161'
});
const w = new nsq.Writer('127.0.0.1', 4150);

export function get(req, res) {
    r.connect();
    w.connect();

    // Register handler for data
    r.on('message', (message) => {
        console.log('GOT MQ MESSAGE');
        console.log(message);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(message);
    });

    // Request data
    w.publish(channel, {
        request: 'give me data please',
        responseChannel
    }, console.log);

    setTimeout(() => {
        res.writeHead(500);
        res.end('timeout');
    }, 1000);

}