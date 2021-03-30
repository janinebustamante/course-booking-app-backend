const jwt = require('jsonwebtoken')
const secret = 'CourseBookingAPI'

module.exports.createAccessToken = (user) => {
	const data = { //payload
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {})
}

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization
	// console.log(token)

	if (typeof token !== 'undefined') {
		token = token.slice(7, token.length) //removing Bearer(space)
		// console.log(token)

		return jwt.verify(token, secret, (err, data) => {
			return (err) ? res.send({ auth: 'failed' }) : next()
		})
	} else {
		return res.send({ auth: 'failed' })
	}
}

module.exports.decode = (token) => {
	if (typeof token !== 'undefined') {
		token = token.slice(7, token.length)

		return jwt.verify(token, secret, (err, data) => {
			return (err) ? null : jwt.decode(token, { complete: true }).payload
		})
	} else {
		return null
	}
}

module.exports.verifyAdmin = (req, res, next) => {
	let token = req.headers.authorization
	// console.log(token)

	if (typeof token !== 'undefined') {
		let payload = module.exports.decode(token);
		
		if (payload.isAdmin == false) {
			return res.send({ auth: 'failed' })
		}
		
		token = token.slice(7, token.length) //removing Bearer(space)
		// console.log(token)

		return jwt.verify(token, secret, (err, data) => {
			return (err) ? res.send({ auth: 'failed' }) : next()
		})
	} else {
		return res.send({ auth: 'failed' })
	}
}