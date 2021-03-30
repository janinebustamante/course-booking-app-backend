const express = require('express')
const router = express.Router()
const auth = require('../auth')
const CourseController = require('../controllers/course')


// List all posts - GET /posts
// Get one post - GET /posts/:postId
// Delete post - DELETE /posts/:postId
// Update post - PUT /posts/:postId
// Create post - POST /posts

router.get('/', (req, res) => { //auth.verify
    // const isAdmin = true // some logic here to identify if request is coming from admin
    CourseController.getAll().then(courses => res.send(courses)) //isAdmin
})

router.get('/:courseId', auth.verify, (req, res) => { //gave authorization to access course details
    let token = req.headers.authorization;
    let payload = auth.decode(token)
    console.log(payload);

	const courseId = req.params.courseId
    CourseController.get({ courseId }).then(course => res.send(course)) 
})

router.post('/', auth.verify, (req, res) => {
    CourseController.add(req.body).then(result => res.send(result))
})

router.put('/:courseId', auth.verify, (req, res) => { //no :courseId
    const courseId = req.params.courseId //no courseId
    CourseController.update(courseId, req.body).then(result => res.send(result)) //no courseId
})

router.delete('/:courseId', auth.verify, (req, res) => {
	const courseId = req.params.courseId
    CourseController.archive({ courseId }).then(result => res.send(result))
})


module.exports = router