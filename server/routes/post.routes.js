const PostController = require('../controllers/post.controller');

module.exports = app => {
    app.post('/api/post/create', PostController.createPost);
    app.get('/api/posts/all', PostController.getAllPosts);
    app.get('/api/post/:id', PostController.getOnePost);
    app.get('/api/posts/user/:id', PostController.getUserPosts);
    app.put('/api/post/update/:id', PostController.updatePost);
    app.delete('/api/post/delete/:id', PostController.deletePost);
}