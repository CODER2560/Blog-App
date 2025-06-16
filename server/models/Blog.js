const mongoose = require('mongoose');

const blogSchema= new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true
    },
    coverimage: {
        type: String,
        default: null,
    },
    tags: {
        type: [String],
        required: [true, 'Tags are required']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true
    },
    author: {
        type: String,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isDraft: {
        type: Boolean,
        default: false      
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    }
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
