import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, Paper, InputBase, List, ListItem, ListItemText, Card, CardContent, CardMedia, Button, Divider } from "@mui/material";
import Header from "../../components/Header/Header";
const genres = ["All", "Technology", "Health", "Travel", "Food", "Finance", "Lifestyle"];

const continueReading = [
  {
    id: 101,
    title: "How to Save Money",
    author: "Bob Lee",
  },
  {
    id: 102,
    title: "Best Coding Practices",
    author: "Sara Kim",
  },
];

const Feed: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/blogs/listall");
        const data = await response.json();
        setBlogs(data.blogs || []);
      } catch (err) {
        setBlogs([]);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  // Filter blogs by genre and search
  const filteredBlogs = blogs.filter(
    (blog) =>
      (selectedGenre === "All" || blog.genre === selectedGenre) &&
      (blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.content.toLowerCase().includes(search.toLowerCase()))
  );
return (
  <>
    <Header />
    <Box sx={{ p: 3 }}>
      {/* Genres Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={selectedGenre}
          onChange={(_, val) => setSelectedGenre(val)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {genres.map((genre) => (
            <Tab key={genre} label={genre} value={genre} />
          ))}
        </Tabs>
      </Box>
      {/* Layout without Grid */}
      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
        {/* Left Sidebar */}
        <Box sx={{ width: { xs: "100%", md: 300 }, flexShrink: 0 }}>
          {/* Search Bar */}
          <Paper sx={{ p: 1, mb: 3, display: "flex", alignItems: "center" }}>
            <InputBase
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />
          </Paper>
          {/* Continue Reading */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Continue Reading
            </Typography>
            <List>
              {continueReading.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.title}
                    secondary={`by ${item.author}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
        
        {/* Blog Feed */}
        <Box sx={{ flex: 1}}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {loading && <Typography>Loading blogs...</Typography>}
            {!loading && filteredBlogs.length === 0 && (
              <Typography>No blogs found.</Typography>
            )}
            {filteredBlogs.map((blog) => (
              <Card key={blog.length} sx={{ width: 320, mb: 2 }}>
                {blog.coverImage && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={blog.coverImage}
                    alt={blog.title}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {blog.content?.slice(0, 100)}...
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {blog.author || "Unknown"} | {blog.genre}
                  </Typography>
                </CardContent>
                <Divider />
                <Button size="small">Read More</Button>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  </>
);
  
};

export default Feed;