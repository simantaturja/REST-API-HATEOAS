const storyController = (Story) => {
  async function getStory(req, res) {
    try {
      const stories = await Story.find({});
      const refStories = stories.map((story) => {
        const refStory = story.toJSON();
        refStory.links = {};
        refStory.links.self = `http://localhost:3000/${story._id}`;
        return refStory;
      });
      res.status(200);
      return res.send(refStories);
    } catch (error) {
      res.status(500);
      return res.send('Internal Server Error');
    }
  }
  async function getStoryById(req, res) {
    try {
      const story = await Story.findById(req.params.id);
      if (story) {
        res.status(200);
        return res.send(story);
      }
      res.status(404);
      return res.send('Story Not Found');
    } catch (error) {
      res.status(404);
      return res.send('Story Not Found');
    }
  }
  async function postStory(req, res) {
    try {
      const createStory = await Story.create({
        title: req.body.title,
        body: req.body.body,
      });
      if (createStory) {
        res.status(201);
        return res.send(createStory);
      }
      res.status(500);
      return res.send('Internal Server Error');
    } catch (error) {
      res.status(400);
      return res.send('title and body must be included!!');
    }
  }
  return { getStory, getStoryById, postStory };
};

module.exports = storyController;
