const express = require('express');
const router = express.Router();

const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

router.get('/listall', getAllBlogs);
router.post('/create', createBlog);
router.get('/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);


module.exports = router;