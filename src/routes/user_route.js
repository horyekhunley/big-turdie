const express = require("express")
const { login, register } = require("../controllers/user_controller");

const router = express.Router()

router.post('/login', async (req, res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/LoginModel" }
    } */
    await login(req.body, res);
});

router.post('/register', async (req, res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/RegisterModel" }
    } */

    await register(req.body, "user", res);
});
router.get('/logout', async(req, res) => {
  await logout(req.body, res)
})

module.exports = router;