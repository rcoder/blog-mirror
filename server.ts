import fastify from 'fastify';

const sse = require('fastify-sse');

declare module 'fastify' {
  interface FastifyReply<HttpResponse> {
    sse: (_:any) => any;
  }
}

const server = fastify();
server.register(sse);

const ttl = 600;

const online = new Map<string, Date>();
setTimeout(() => {

}, 1000);

server.route({
  method: 'GET',
  url: '/presence',
  handler: (req, reply) => {
    reply.sse(Array(online));
  }
});

server.route({
  method: 'POST',
  url: '/presence',
  handler: (req, reply) => {
    const alias = req.body.alias;
    online.set(alias, new Date());
  }
});