'use strict'
const contestModel = require('../model/contest')

async function register (req, res, next) {
  const contest = new contestModel.Contest(
    0,
    req.body.begin,
    req.body.duration,
    req.body.name,
    req.body.description,
    0,
    0,
    0
  )
  try {
    const contestId = await contestModel.register(contest)
    const participant = new contestModel.Participant(
      req.userData.id,
      contestId,
      'admin'
    )
    await contestModel.registerParticipant(participant)
    res.status(201).send()
  } catch (error) {
    // console.debug(error)
    console.log('ERROR: %s', error.message)
    res.status(400).send()
  }
}

module.exports = {
  register: register
}
