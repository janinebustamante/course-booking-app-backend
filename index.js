const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))
mongoose.connect('mongodb+srv://admin:iamadmin123@wdc028-course-booking.0fn8t.mongodb.net/course_booking_app?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoutes = require('./routes/user')
const courseRoutes = require('./routes/course')

app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)

app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
})