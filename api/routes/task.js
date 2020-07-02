const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer({ dest: 'uploads' });
const dailyTaskCtrl = require('./../controllers/task.controller');
const middleWare = require('../middleware/auth.middleware');

router.get('/', middleWare.authMiddle, dailyTaskCtrl.getAllDailyTasks);
router.get('/:id', middleWare.authMiddle, dailyTaskCtrl.getSingleDailyTask);
router.post('/', middleWare.authMiddle, dailyTaskCtrl.postDailyTask);
router.put('/:id', middleWare.authMiddle, dailyTaskCtrl.putDailyTask);
router.delete('/:id', middleWare.authMiddle, dailyTaskCtrl.deleteDailyTask);

module.exports = router;
