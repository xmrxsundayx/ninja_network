const PostController = require('../controllers/post.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/post/create',authenticate, PostController.createPost);
    app.get('/api/posts/all',authenticate, PostController.getAllPosts);
    app.get('/api/post/:id',authenticate, PostController.getOnePost);
    app.get('/api/posts/user/:id',authenticate, PostController.getUserPosts);
    app.put('/api/post/update/:id',authenticate, PostController.updatePost);
    app.delete('/api/post/delete/:id',authenticate, PostController.deletePost);
}