const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
  response.json(users.map(user => user.toJSON())) 
})

userRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.password){
    return response.status(400).json({ error: "no password provided" })
  } else if(body.password.length < 3){
    return response.status(400).json({ error: "password has to be atleast 3 characters" })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User ({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try{
    const savedUser = await user.save()
    response.json(savedUser)
  } catch(exception) {
    response.status(400).json({error: exception.message})
  }
})

module.exports = userRouter