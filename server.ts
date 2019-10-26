import fastify from 'fastify'
import cors from 'fastify-cors'
import nedb from 'nedb-promises'

import path from 'path'

const server = fastify({
  logger: {
    level: 'debug'
  }
})

server.register(cors, { origin: '*' })

const PRESENCE_TTL = 600
const PAGE_ACTIVITY_TTL = 3600 * 72

function openDb(name: string) {
  return nedb.create({
    filename: path.join(__dirname, 'data', `${name}.db`),
    autoload: true,
    timestampData: true
  })
}

function cleanPath(path: string) {
  return decodeURIComponent(path).replace(/^\/+|\/+$/g, '')
}

const comments = openDb('comments')

const presence = openDb('presence')
presence.ensureIndex({
  fieldName: 'updatedAt',
  expireAfterSeconds: PRESENCE_TTL
} as any)

const pages = openDb('activity')
pages.ensureIndex({
  fieldName: 'updatedAt',
  expireAfterSeconds: PAGE_ACTIVITY_TTL
} as any)

server.get('/comments/:path', async (req, reply) => {
    let path = cleanPath(req.params.path)
    let results = await comments
      .find({path})
      .sort({createdAt: -1})
      .limit(50)
      .exec()
    
    reply.send(results)
  }
})

server.route({
  method: 'POST',
  url: '/comments/:path',
  handler: async (req, reply) => {
    let path = cleanPath(req.params.path)

    await pages.update({path}, {lastCommentAt: new Date()}, {upsert: true})
    await comments.insert({
      path: path,
      ...req.body
    })
    reply.send(await comments.find({path}))
  }
})

server.route({
  method: 'GET',
  url: '/presence',
  handler: async (req, reply) => {
    reply.send(await presence.find({}))
  }
})

server.route({
  method: 'POST',
  url: '/presence',
  handler: async (req, reply) => {
    let updated = await presence.update(
      {
        alias: req.body.alias,
        path: req.body.path
      },
      req.body,
      {
        upsert: true
    })
    reply.send(updated)
  }
})

server.listen(process.env.PORT ? parseInt(process.env.PORT) : 8081)