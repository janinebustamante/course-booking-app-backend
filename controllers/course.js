const Course = require('../models/course')

module.exports.getAll = (isAdmin) => {
	// if (isAdmin) {
	// 	return Course.find({}).then(courses => courses)
	// } else {
		return Course.find({ isActive: true }).then(courses => courses)
	// }
}

module.exports.add = (params) => {
	let course = new Course({
		name: params.name,
		description: params.description,
		price: params.price
	})

	return course.save().then((course, err) => {
		return (err) ? false : true
	})
}

module.exports.get = (params) => {
	return Course.findById(params.courseId).then(course => course)
}

module.exports.update = (courseId, params) => { //no courseId
	const updates = {
		name: params.name,
		description: params.description,
		price: params.price
	}

	return Course.findByIdAndUpdate(courseId, updates).then((doc, err) => {
		return (err) ? false : true
	})
}

module.exports.archive = (params) => {
	const updates = { isActive: false }

	return Course.findByIdAndUpdate(params.courseId, updates).then((doc, err) => {
		return (err) ? false : true
	})
}