const Blog = require('../models/Blog');
 

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
      total: blogs.length,
    });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blogs' });
    }
}

const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blog' });
    }
}

const createBlog = async (req, res) => {
    const { 
        title,
        genre,
        coverimage,
        tags,
        content,
        author,
        isPublished,
        isFeatured,
     } = req.body;
    try {
        const blog = await Blog.create({ title, genre, coverimage, tags, content, author, isPublished, isFeatured });
        if (!blog) {
            return res.status(400).json({ message: 'Error creating blog' });
        }
        if(blog){
            id = blog._id;
            res.status(201).json({ message: 'Blog created successfully', blogId: id });
            return;
        }   
    } catch (error) {
        console.log("Create Blog Error:", error); 
        res.status(500).json({ message: 'Error creating blog' });
    }
}   

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description, body } = req.body;
    try {
        const blog = await Blog.findByIdAndUpdate(id, { title, description, body });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog' });
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog' });
    }
}     

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
}; 