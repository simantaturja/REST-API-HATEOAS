const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

const Story = require('../models/Story');

router.get('/', async (req, res, next) => {
  const stories = await Story.find({});
  const refStories = stories.map((story) => {
    const refStory = story.toJSON();
    refStory.links = {};
    refStory.links.self = `http://localhost:3000/${story._id}`;
    return refStory;
  });
  res.statusCode = 200;
  res.send(refStories);
});

router.get('/:id', async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    if (story) {
      res.statusCode = 200;
      res.send(story);
    } else {
      res.statusCode = 404;
      res.send('Story Not Found');
    }
  } catch (error) {
    res.statusCode = 404;
    res.send('Story Not Found');
  }
});

router.post('/', async (req, res, next) => {
  const createStory = await Story.create({
    title: req.body.title,
    body: req.body.body,
  });
  if (createStory) {
    res.statusCode = 201;
    res.send(createStory);
  } else {
    res.statusCode = 500;
    res.send('title and body must be included!!');
  }
});

module.exports = router;
