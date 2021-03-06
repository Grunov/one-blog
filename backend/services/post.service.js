const PostModel = require('../models/post.model');
const PostDto   = require('../dtos/post.dto');
const ApiError      = require('../exeptions/api.error');

class PostService {
    async createPost(data) {  
        const post = await PostModel.create({
          authorId: data.authorId, 
          authorName: data.authorName, 
          title: data.title, 
          image: data.image, 
          text: data.text, 
          date: Date.now()
        });
        return post;
    }

    async getPost(id) {
        const post = await PostModel.findById(id);
        if(!post) {
            throw ApiError.BadRequest(`Post with id '${id}' not exist`);
        }
        return new PostDto(post);
    }

    async updatePost(data) {
        const post = await PostModel.findById(data.id, function (err, doc) {
            if (err) throw new Error(err);
            doc.text = data.text;
            doc.save();
        });
        return new PostDto(post);
    }

    async deletePost(id) {
        const postWithRequestId =  await PostModel.find({_id: id});
        if(!postWithRequestId) {
            throw ApiError.BadRequest('Something wrong. This post is not defined');
        }
        const resData = await PostModel.deleteOne({_id: id});

        return {...resData, id: id};
    }


    async getAllPosts(page, limit) {
        let posts = await PostModel.find().sort([['date', 'desc']]).limit(limit).skip((page-1)*limit);
        let totalCount = await PostModel.countDocuments();
        posts = posts.map(post => {
          return new PostDto(post);
        });

        return {
          posts,
          totalCount
        };
    }

    async getAllPostsByUserId(userId, page, limit) { 
      let posts = await PostModel.find({authorId: userId}).sort([['date', 'desc']]).limit(limit).skip((page-1)*limit);
        let totalCount = await PostModel.countDocuments();
        posts = posts.map(post => {
          return new PostDto(post);
        });

        return {
          posts,
          totalCount
        };
  }
}

module.exports = new PostService;