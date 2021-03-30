const express = require('express')
const router = express.Router()
const auth = require('../auth')
const UserController = require('../controllers/user')

// [SECTION] Primary Routes

router.post('/email-exists', (req, res) => {
    UserController.emailExists(req.body).then(result => res.send(result))
})

router.post('/', (req, res) => {
    UserController.register(req.body).then(result => res.send(result))
})

router.post('/login', (req, res) => {
    UserController.login(req.body).then(result => res.send(result))
})

router.get('/details', auth.verify, (req, res) => {
	const user = auth.decode(req.headers.authorization)
    UserController.get({ userId: user.id }).then(user => res.send(user))
})

//get other users' details (admin only)
router.get('/:userId', auth.verifyAdmin, (req, res) => {
    const userId = req.params.userId;
    UserController.get({ userId }).then(user => res.send(user))
})

router.post('/enroll', auth.verify, (req, res) => {
	const params = {
		userId: auth.decode(req.headers.authorization).id,
		courseId: req.body.courseId
	}
    UserController.enroll(params).then(result => res.send(result))
})

// [SECTION] Secondary Routes

router.put('/details', (req, res) => {
    UserController.updateDetails()
})

router.put('/change-password', (req, res) => {
    UserController.changePassword()
})

// [SECTION] Integration Routes

router.post('/verify-google-id-token', (req, res) => {
    UserController.verifyGoogleTokenId()
})

module.exports = router