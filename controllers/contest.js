const problemModel = require('../model/problem')

async function addTask (req, res, next) {
  if (!('idTask' in req.body)) {
    console.log('ERROR: Message body without idTask')
    res.status(400).send()
    return
  }

  if (!('idContest' in req.body)) {
    console.log('ERROR: Message body without idContest')
    res.status(400).send()
    return
  }

  const problem = new problemModel.Problem(
    req.body.idTask,
    req.body.idContest
  )

  console.log('idTask: ' + problem.idTask)
  console.log('idContest: ' + problem.idContest)

  try {
    await problemModel.register(problem)
    res.status(200).send({ msg: 'Task added sucessfully' })
  } catch (error) {
    console.log(error)
    res.status(400).send({ msg: 'Error in processing task' })
  }
}

module.exports = {
  addTask: addTask
}
