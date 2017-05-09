const seneca = require('senecajs')
const Joi = require('seneca-joi')
seneca.use(HemeraJoi)

seneca.ready(() => {
    seneca.add(
      {{ escapeJs pattern }}
    }, (req, cb) => {
    )
})

