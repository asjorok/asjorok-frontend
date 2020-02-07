import * as nsq from 'nsqjs';

const channel = 'planet.list';
const responseId = 'TEST'
const responseChannel = `${channel}.res.${responseId}`;

const r = new nsq.Reader(responseChannel, 'handle', {
    lookupdHTTPAddresses: '127.0.0.1:4161'
});
const w = new nsq.Writer('127.0.0.1', 4150);

export function get(req, res) {
    r.connect();
    w.connect();

    let hasReplied = false;

    // Register handler for data
    r.on('message', (message) => {
        try {

            hasReplied = true;
            console.log('GOT MQ MESSAGE');
            console.log(message.body.toString());
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(message.body);

        }
        catch (error) {
            console.log('ERROR while handling mq response');
        }
        finally {
            message.finish();
        }
    });

    // Request data
    w.publish(channel, {
        request: 'give me data please',
        responseChannel
    }, (err) => {
        if (!err) return;
        console.log(`NSQ ERROR ${err}`);
    });

    setTimeout(() => {
        if (hasReplied) return;
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Timeout" }));
    }, 1000);

}