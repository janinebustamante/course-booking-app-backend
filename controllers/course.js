const Course = require('../models/course')
const { param } = require('../routes/course')



module.exports.getAll = (isAdmin) => { 
	if (isAdmin == true) {
		return Course.find({}).then(courses => courses)
	} else {
		return Course.find({ isActive: true }).then(courses => courses)
	}
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
	const updates = {}
	if (params.name){
		updates.name = params.name
	}
	if (params.description) {
		updates.description = params.description
	}
	if (params.price) {
		updates.price = params.price
	}
	// console.log(params.isActive)
	if (params.isActive !== undefined) {
		updates.isActive = params.isActive
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