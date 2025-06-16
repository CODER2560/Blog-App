import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  IconButton,
  Divider,
  Chip,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArchiveIcon from "@mui/icons-material/Archive";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { blue, grey } from "@mui/material/colors";
import Header from "../../components/Header/Header";
// Dummy user and blog data for demonstration
const user = {
  name: "Jane Doe",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  email: "jane.doe@email.com",
};

const dummyBlogs = [
  {
    _id: "1",
    title: "The Future of AI",
    genre: "Technology",
    createdAt: "2024-06-15T10:00:00.000Z",
    updatedAt: "2024-06-16T10:00:00.000Z",
    isArchived: false,
    likeCount: 42,
    viewCount: 120,
    isPublished: true,
  },
  {
    _id: "2",
    title: "Healthy Habits for 2025",
    genre: "Health",
    createdAt: "2024-06-10T09:00:00.000Z",
    updatedAt: "2024-06-12T09:00:00.000Z",
    isArchived: false,
    likeCount: 18,
    viewCount: 60,
    isPublished: false,
  },
  {
    _id: "3",
    title: "Archived Blog Example",
    genre: "Travel",
    createdAt: "2024-05-10T09:00:00.000Z",
    updatedAt: "2024-05-12T09:00:00.000Z",
    isArchived: true,
    likeCount: 5,
    viewCount: 20,
    isPublished: false,
  },
];

const Dashboard: React.FC = () => {
  const [blogs, setBlogs] = useState(dummyBlogs);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editGenre, setEditGenre] = useState("");

  // Analytics
  const totalPosts = blogs.length;
  const totalLikes = blogs.reduce((sum, b) => sum + b.likeCount, 0);
  const totalViews = blogs.reduce((sum, b) => sum + b.viewCount, 0);
  const publishedPosts = blogs.filter((b) => b.isPublished && !b.isArchived).length;
  const archivedPosts = blogs.filter((b) => b.isArchived).length;

  // Handlers
  const handleEdit = (blog: any) => {
    setSelectedBlog(blog);
    setEditTitle(blog.title);
    setEditGenre(blog.genre);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    setBlogs((prev) =>
      prev.map((b) =>
        b._id === selectedBlog._id
          ? { ...b, title: editTitle, genre: editGenre, updatedAt: new Date().toISOString() }
          : b
      )
    );
    setEditDialogOpen(false);
    setSelectedBlog(null);
  };

  const handleArchive = (blogId: string) => {
    setBlogs((prev) =>
      prev.map((b) => (b._id === blogId ? { ...b, isArchived: true } : b))
    );
  };

  const handleRestore = (blogId: string) => {
    setBlogs((prev) =>
      prev.map((b) => (b._id === blogId ? { ...b, isArchived: false } : b))
    );
  };

  const handleDelete = (blogId: string) => {
    setBlogs((prev) => prev.filter((b) => b._id !== blogId));
  };

  return (
    <>
    <Header />
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      {/* User Info */}
      <Paper sx={{ p: 3, mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src={user.avatar} sx={{ width: 64, height: 64 }} />
        <Box>
          <Typography variant="h5">{user.name}</Typography>
          <Typography color="text.secondary">{user.email}</Typography>
        </Box>
      </Paper>

      {/* Analytics */}
      <Paper sx={{ p: 2, mb: 3, display: "flex", gap: 4, justifyContent: "space-between", flexWrap: "wrap" }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Total Posts
          </Typography>
          <Typography variant="h6">{totalPosts}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Published
          </Typography>
          <Typography variant="h6">{publishedPosts}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Archived
          </Typography>
          <Typography variant="h6">{archivedPosts}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Total Likes
          </Typography>
          <Typography variant="h6">
            <FavoriteIcon sx={{ color: "red", verticalAlign: "middle", mr: 0.5 }} fontSize="small" />
            {totalLikes}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Total Views
          </Typography>
          <Typography variant="h6">
            <VisibilityIcon sx={{ color: blue[500], verticalAlign: "middle", mr: 0.5 }} fontSize="small" />
            {totalViews}
          </Typography>
        </Box>
      </Paper>

      {/* Blog List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>
          Your Blogs
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2}>
          {blogs.map((blog) => (
            <Paper
              key={blog._id}
              sx={{
                p: 2,
                bgcolor: blog.isArchived ? grey[100] : "#fff",
                opacity: blog.isArchived ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
              variant="outlined"
            >
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Chip label={blog.genre} size="small" color="primary" />
                  {blog.isPublished && <Chip label="Published" size="small" color="success" />}
                  {blog.isArchived && <Chip label="Archived" size="small" color="default" />}
                </Stack>
                <Typography variant="subtitle1" fontWeight={600}>
                  {blog.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(blog.createdAt).toLocaleDateString()} | Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                </Typography>
                <Stack direction="row" spacing={2} mt={1}>
                  <Tooltip title="Likes">
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <FavoriteIcon fontSize="small" sx={{ color: "red" }} />
                      <Typography variant="body2">{blog.likeCount}</Typography>
                    </Stack>
                  </Tooltip>
                  <Tooltip title="Views">
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <VisibilityIcon fontSize="small" sx={{ color: blue[500] }} />
                      <Typography variant="body2">{blog.viewCount}</Typography>
                    </Stack>
                  </Tooltip>
                </Stack>
              </Box>
              <Stack direction="row" spacing={1}>
                {!blog.isArchived && (
                  <>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(blog)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Archive">
                      <IconButton onClick={() => handleArchive(blog._id)}>
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
                {blog.isArchived && (
                  <Tooltip title="Restore">
                    <IconButton onClick={() => handleRestore(blog._id)}>
                      <RestoreFromTrashIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(blog._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Analytics">
                  <IconButton>
                    <BarChartIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>

      {/* Edit Blog Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Blog</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Genre"
            fullWidth
            value={editGenre}
            onChange={(e) => setEditGenre(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </>
  );
};

export default Dashboard;