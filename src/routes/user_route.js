const express = require("express")
const { register, login } = require("../controllers/user_controller")

const router = express.Router()

router.post('/register', async (req, res) => {
  await register(req.body, "user", res)
})

router.post('/login', async (req, res) => {
    await login(req.body, res)
})

module.exports = router