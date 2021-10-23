const {Schema, model, Types} = require('mongoose');

const PostSchema = new Schema({
    authorId: {type: Types.ObjectId, ref: 'User', required: true },
    authorName: {type: String, required: true },
    text: {type: String, required: true},
    title: {type: String, required: true},
    image: {type: String, required: false},
    date: {type: Date, required: true}
})

module.exports = model('Post', PostSchema);
