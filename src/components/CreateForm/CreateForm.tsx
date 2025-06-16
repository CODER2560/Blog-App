import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CodeIcon from "@mui/icons-material/Code";
import LinkIcon from "@mui/icons-material/Link";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import SaveIcon from "@mui/icons-material/Save";
import PublishIcon from "@mui/icons-material/Publish";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../../components/Header/Header"; // Assuming you have a Header component

const genres = [
  "Technology",
  "Health",
  "Travel",
  "Food",
  "Finance",
  "Lifestyle",
  "Education",
  "Science",
  "Business",
];

const WriteBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  // Handle cover image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setCoverImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  console.log("user", userData);
  // Handle tag addition
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Handle tag removal
  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  // Basic rich text formatting (for demo, not a full editor)
  const format = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  // Save draft (simulate)
  const handleSaveDraft = () => {
    alert("Draft saved!");
  };

const handlePublish = async () => {
  if (!title || !contentRef.current?.innerHTML || !selectedGenre) {
    alert("Please fill in the title, content, and genre.");
    return;
  }
  try {
    const response = await fetch("http://localhost:8000/api/blogs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      title,
      content: contentRef.current.innerHTML,
      genre: selectedGenre,
      tags,
      coverImage,
      author: userData?.user.data.firstName,
      isPublished: false,
      isFeatured: false,
      }),
    });
    if (!response.ok) throw new Error("Failed to publish blog");
    const data = await response.json();
  } catch (err) {
    alert("Failed to publish blog.");
  }
};


  return (
    <>
    <Header />
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3, display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Write a New Blog
      </Typography>

      {/* Title */}
      <TextField
        placeholder="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2, fontWeight: 600, fontSize: 32 }}
        inputProps={{ style: { fontSize: 28, fontWeight: 600 } }}
      />

      {/* Genre */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" mb={1}>
          Genre
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {genres.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              color={selectedGenre === genre ? "primary" : "default"}
              onClick={() => setSelectedGenre(genre)}
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </Box>

      {/* Cover Image */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" mb={1}>
          Cover Image
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<AddPhotoAlternateIcon />}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>
          {coverImage && (
            <Box sx={{ position: "relative" }}>
              <img
                src={coverImage}
                alt="cover"
                style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8 }}
              />
              <IconButton
                size="small"
                sx={{ position: "absolute", top: 0, right: 0, bgcolor: "#fff" }}
                onClick={() => setCoverImage(null)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Stack>
      </Box>

      {/* Tags */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" mb={1}>
          Tags
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              color="secondary"
            />
          ))}
          <InputBase
            placeholder="Add tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            sx={{ minWidth: 120 }}
          />
        </Stack>
      </Box>

      {/* Rich Text Toolbar */}
      <Paper sx={{ p: 1, mb: 1, display: "flex", gap: 1, alignItems: "center" }}>
        <Tooltip title="Bold">
          <IconButton onClick={() => format("bold")}>
            <FormatBoldIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton onClick={() => format("italic")}>
            <FormatItalicIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Underline">
          <IconButton onClick={() => format("underline")}>
            <FormatUnderlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Quote">
          <IconButton onClick={() => format("formatBlock", "blockquote")}>
            <FormatQuoteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bulleted List">
          <IconButton onClick={() => format("insertUnorderedList")}>
            <FormatListBulletedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Numbered List">
          <IconButton onClick={() => format("insertOrderedList")}>
            <FormatListNumberedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Code Block">
          <IconButton onClick={() => format("formatBlock", "pre")}>
            <CodeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Insert Link">
          <IconButton onClick={() => {
            const url = prompt("Enter URL:");
            if (url) format("createLink", url);
          }}>
            <LinkIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Undo">
          <IconButton onClick={() => format("undo")}>
            <UndoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo">
          <IconButton onClick={() => format("redo")}>
            <RedoIcon />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Content Editor */}
      <Paper
        sx={{
          minHeight: 240,
          p: 2,
          mb: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          background: "#fafafa",
        }}
        elevation={0}
        onClick={() => contentRef.current?.focus()}
      >
        <div
          ref={contentRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            minHeight: 200,
            outline: "none",
            fontSize: 18,
            fontFamily: "inherit",
            position: "relative",
          }}
          onInput={e => setContent((e.target as HTMLDivElement).innerHTML)}
        >
          {(!content || content === "<br>") && (
            <span
              style={{
                position: "absolute",
                color: "#aaa",
                pointerEvents: "none",
                userSelect: "none",
                fontSize: 18,
                fontFamily: "inherit",
              }}
            >
              Write your story...
            </span>
          )}
        </div>
      </Paper>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          onClick={handleSaveDraft}
        >
          Save Draft
        </Button>
        <Button
          variant="contained"
          endIcon={<PublishIcon />}
          onClick={handlePublish}
        >
          Publish
        </Button>
      </Stack>
    </Box>
    </>
  );
};

export default WriteBlog;