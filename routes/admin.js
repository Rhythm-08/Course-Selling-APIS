
const { Router } = require("express");
const adminMiddleware = require("../middlewares/admin");
const router = Router();
const {Admin, Course} = require('../db')
// Admin Routes
router.post('/signup',async  (req, res) => {
    // Implement admin signup logic
    const username = req.headers.username;
    const password = req.headers.password;
    const isDuplicate  = await Admin.findOne({userName: username});
    if(isDuplicate){
        res.status(400).json({message: `Admin Already Exists with this ${username}`,status:400});
        return;
    }
    await Admin.create({ userName: username, password: password });
    res.status(200).json({message: 'Admin created successfully', status:200});
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
});

router.post('/courses', adminMiddleware, async (req, res) => {
    
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const isDuplicate = await Course.findOne({title: title});
    console.log(isDuplicate);
    if(isDuplicate){
        res.status(400).json({message: 'Course Already Exists',status:400});
        return;
    }
    const course = await Course.create({ title: title, description: description, imageLink: imageLink, price: price });
    res.status(200).json( { message: 'Course created successfully', courseId: course?._id,status:200 });

    // Implement course creation logic
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    console.log(courses);
    res.status(200).json({message: 'data fetched successfully', 
        courses: courses,
        status: 200
    });
});

module.exports = router;