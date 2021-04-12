const express = require('express');

const router = express.Router();

const Story = require('../models/Story');

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (story) {
      res.statusCode = 200;
      return res.send(story);
    }
    res.statusCode = 404;
    return res.send('Story Not Found');
  } catch (error) {
    res.statusCode = 404;
    return res.send('Story Not Found');
  }
});

router.post('/', async (req, res) => {
  const createStory = await Story.create({
    title: req.body.title,
    body: req.body.body,
  });
  if (createStory) {
    res.statusCode = 201;
    return res.send(createStory);
  }
  res.statusCode = 500;
  return res.send('title and body must be included!!');
});

module.exports = router;
