import $api from "@/http";

export default class postService {
    static fetchPosts(page, limit) {
        return $api.get(`/post?page=${page}&limit=${limit}`);
    }
    static fetchPostsByUserId(userId) {
      return $api.get(`/post/user/${userId}`);
  }
    static fetchPost(id) {
        return $api.get(`/post/${id}`);
    }
    static createPost(postData) {
        console.log(postData);
        return $api.post('/post/create', postData)
    }
    static updatePost(post) {
        return $api.patch('/post/update', post)
    }
    static deletePost(id) {
        return $api.delete('/post/delete', {
            data: {
                id: id
            }
            
        })
    } 
}