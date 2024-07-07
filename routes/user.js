const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middlewares/users");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    res.status(400).send('No Route Found')
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router