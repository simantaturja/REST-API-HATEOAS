const sinon = require('sinon');

const should = require('should');

const storyController = require('../controllers/storyController');

describe('Story Controller Unit Tests: ', () => {
  describe('Post', () => {
    it('should not allow without title and body', () => {
      const Story = () => { this.create = () => { } };
      const req = {
        body: {
          body: 'This is a test story',
        },
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
      };
      const controller = storyController(Story);
      controller.postStory(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('title and body must be included!!').should.equal(true);
    });
  });
});
