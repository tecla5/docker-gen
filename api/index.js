const Hapi = require('hapi')
const Hemera = require('nats-hemera')
const Boom = require('boom')

const nats = require('nats').connect({
  'url': process.env.NATS_URL,
  'user': process.env.NATS_USER,
  'pass': process.env.NATS_PW
})

const server = new Hapi.Server()
server.connection({
  port: process.env.API_PORT,
  host: process.env.API_HOST
})

const hemera = new Hemera(nats, {
  logLevel: process.env.HEMERA_LOG_LEVEL
})

hemera.ready(() => {
  server.route({
    method: 'POST',
    path: '/api/graphtoyaml',
    handler: function (request, reply) {
      hemera.act({
          topic: 'graph',
          cmd: 'toyaml',
          graph: request.payload
        },
        (err, result) => {
          if (err) {
            console.log(err)
            return reply(Boom.wrap(err.cause, 400))
          }

          return reply(result)
        })
    }
  })


  server.start((err) => {

    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  })

})
