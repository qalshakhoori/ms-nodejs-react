const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;

  res.send(commentsByPostId[id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const { id } = req.params;

  const comments = commentsByPostId[id] || [];
  const commentToAdd = {
    id: commentId,
    content,
    status: 'pending',
  };

  comments.push(commentToAdd);

  commentsByPostId[id] = comments;

  axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      postId: id,
      ...commentToAdd,
    },
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('Received Event', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        postId,
        id,
        status,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('listening on port 4001');
});
