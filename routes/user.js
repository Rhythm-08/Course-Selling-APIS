const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middlewares/users");
const {User, Course} = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;  

    const isDuplicate = await User.findOne({userName: username, password: password});
    if(isDuplicate){
        res.status(400).send('User Already Exists!');
        return;
    }
    await User.create({userName: username, password: password});
    res.status(200).json({message: 'User created successfully', status:200});
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
});

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.status(200).json({message: 'data fetched successfully', 
        courses: courses,
        status: 200
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const password = req.headers.password;
    const findCourse =await Course.findOne({_id: courseId});
    if(!findCourse){
        res.status(400).json({message: 'No Course Found with this id', status: 400});
        return;
    }
    await User.updateOne({userName: username},{
        "$push": {
            purchasedCourses: courseId
        }
    });
    res.status(200).json({message: "Purchase complete!"});
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        userName: req.headers.username
    })
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })
    res.status(200).json({courses: courses});
});

module.exports = router