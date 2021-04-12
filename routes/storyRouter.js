const express = require('express');

const Story = require('../models/Story');

const storyController = require('../controllers/storyController')(Story);

const router = express.Router();

router.get('/', storyController.getStory);

router.get('/:id', storyController.getStoryById);

router.post('/', storyController.postStory);

module.exports = router;
