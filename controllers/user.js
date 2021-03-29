const User = require('../models/user')
const Course = require('../models/course')
const bcrypt = require('bcryptjs')
const auth = require('../auth')

module.exports.emailExists = (params) => {
	return User.find({ email: params.email }).then(result => {
		return result.length > 0 ? true : false
	})
}

module.exports.register = (params) => {
	let user = new User({
		firstName: params.firstName,
		lastName: params.lastName,
		email: params.email,
		mobileNo: params.mobileNo,
		password: bcrypt.hashSync(params.password, 10)
	})

	return user.save().then((user, err) => {
		return (err) ? false : true
	})
}

module.exports.login = (params) => {
	return User.findOne({ email: params.email }).then(user => {
		if (user === null) { return false }

		const isPasswordMatched = bcrypt.compareSync(params.password, user.password)

		if (isPasswordMatched) {
			return { accessToken: auth.createAccessToken(user.toObject()) }
		} else {
			return false
		}
	})
}

module.exports.get = (params) => {
	return User.findById(params.userId).then(user => {
		user.password = undefined
		return user
	})
}

module.exports.enroll = (params) => {
	return User.findById(params.userId).then(user => {
		user.enrollments.push({ courseId: params.courseId })

		return user.save().then((user, err) => {
			return Course.findById(params.courseId).then(course => {
				course.enrollees.push({ userId: params.userId })

				return course.save().then((course, err) => {
					return (err) ? false : true
				})
			})
		})
	})
}

module.exports.updateDetails = (params) => {
	
}

module.exports.changePassword = (params) => {
	
}

module.exports.verifyGoogleTokenId = (params) => {
	
}