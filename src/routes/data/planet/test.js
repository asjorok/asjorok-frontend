import { Client } from 'redis-request-broker';

const channel = 'planet.list';
const c = new Client(channel);
c.connect();
export async function get(req, res) {

    const response = await c.request('give me data please');
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(response));

}