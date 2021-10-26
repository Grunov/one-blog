const uuid = require('uuid')
const path = require('path')
const postService =  require('../services/post.service');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api.error');

class PostController {
    async createPost(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const {image} = req.files;
            let fileName = uuid.v4() + '.jpg'
            image.mv(path.resolve(__dirname, '..', 'static', fileName))

            const postData = await postService.createPost({...req.body, image: fileName});
            return res.json(postData);
        }
        catch(error) {
            next(error);
        }
    }

    async getPost(req, res, next) {
        try {
            const {id} = req.params;
            const postData = await postService.getPost(id);
            return res.json(postData);
        }
        catch(error) {
            next(error);
        }
    }

    async updatePost(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const postData = await postService.updatePost(req.body);
            return res.json(postData);
        }
        catch(error) {
            next(error);
        }
    }

    async deletePost(req, res, next) {
        try {
            const {id} = req.body;
            const resData = await postService.deletePost(id);
            return res.json(resData);
        }
        catch(error) {
            next(error);
        }
    }

    async getAllPosts(req, res, next) {
        try {
            const {page, limit} = req.query;
            const posts = await postService.getAllPosts(parseInt(page), parseInt(limit));
            return res.json(posts);
        }
        catch (error) {
            next(error);
        }
    }

    async getAllPostsByUserId(req, res, next) {
      try {
          const {id} = req.params; 
          const {page, limit} = req.query;
          const posts = await postService.getAllPostsByUserId(id, parseInt(page), parseInt(limit));
          return res.json(posts);
      }
      catch (error) {
          next(error);
      }
  }
}

module.exports = new PostController();