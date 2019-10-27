import fastify from 'fastify'
import cors from 'fastify-cors'
import nedb from 'nedb-promises'
import S from 'fluent-schema'

import path from 'path'

const server = fastify({
  logger: { level: 'debug' }
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

const $comments = openDb('comments')
const $presence = openDb('presence')
const $activity = openDb('activity')

$presence.ensureIndex({
  fieldName: 'updatedAt',
  expireAfterSeconds: PRESENCE_TTL
} as any)

$activity.ensureIndex({
  fieldName: 'updatedAt',
  expireAfterSeconds: PAGE_ACTIVITY_TTL
} as any)

server.get('/comments/:path', async (req, reply) => {
  let path = cleanPath(req.params.path)
  let results = await $comments
    .find({path})
    .sort({createdAt: -1})
    .limit(50)
    .exec()
  
  reply.send(results)
})

server.post('/comments/:path', {
  schema: {
    body: S.object()
      .prop('path', S.string().required().maxLength(150))
      .prop('from', S.string().maxLength(150))
      .prop('key', S.string().maxLength(50))
      .prop('message', S.string().required().maxLength(500))
  },
}, async (req, reply) => {
  let path = cleanPath(req.params.path)

  await $activity.update({path}, {lastCommentAt: new Date()}, {upsert: true})
  await $comments.insert({
    path: path,
    ...req.body
  })
  reply.send(await $comments.find({path}))
})

server.get('/presence', async (req, reply) => {
  reply.send(await $presence.find({}))
})

server.post('/presence', {
  schema: {
    body: S.object()
      .prop('alias', S.string().required().maxLength(150))
      .prop('key', S.string().maxLength(150))
  }
}, async (req, reply) => {
  let updated = await $presence.update(req.body, req.body, { upsert: true })
  reply.send(updated)
})

server.listen(process.env.PORT ? parseInt(process.env.PORT) : 8081)