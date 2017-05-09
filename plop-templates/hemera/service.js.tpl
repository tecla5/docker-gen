const Hemera = require('nats-hemera')
const HemeraJoi = require('hemera-joi')

const nats = require('nats').connect({
  'url': process.env.NATS_URL,
  'user': process.env.NATS_USER,
  'pass': process.env.NATS_PW
})

const hemera = new Hemera(nats, {
  logLevel: process.env.HEMERA_LOG_LEVEL || "info"
})

hemera.use(HemeraJoi)

hemera.ready(() => {
    let Joi = hemera.exposition['hemera-joi'].joi

    hemera.add(
      {{{ pattern }}}
    , (req, cb) => {
      {{{ function }}}
    })
})

