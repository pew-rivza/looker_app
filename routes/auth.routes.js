const {Router} = require('express');
const router = Router();

router.post('/add', async (req, res) => {
    try {
        const { email, password } = req.body;
    } catch (e) {
        res.status(500).json({message : "Упс! Что-то пошло не так..."})
    }
});

module.exports = router;