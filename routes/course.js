const express = require('express')
const router = express.Router()
const auth = require('../auth')
const CourseController = require('../controllers/course')

router.get('/', (req, res) => {
    CourseController.getAll().then(courses => res.send(courses))
})

router.get('/:courseId', (req, res) => {
	const courseId = req.params.courseId
    CourseController.get({ courseId }).then(course => res.send(course)) 
})

router.post('/', auth.verify, (req, res) => {
    CourseController.add(req.body).then(result => res.send(result))
})

router.put('/', auth.verify, (req, res) => {
    CourseController.update(req.body).then(result => res.send(result))
})

router.delete('/:courseId', auth.verify, (req, res) => {
	const courseId = req.params.courseId
    CourseController.archive({ courseId }).then(result => res.send(result))
})

//JANINE

//addcourse

module.exports = router