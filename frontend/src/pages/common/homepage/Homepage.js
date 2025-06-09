import React, { useState, useEffect, useRef, useContext } from "react";
import "./Homepage.css";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/locate-me.js";
import "@ui5/webcomponents-icons/dist/people-connected.js";
import "@ui5/webcomponents-icons/dist/education.js";
import "@ui5/webcomponents-icons/dist/survey.js";
import "@ui5/webcomponents-icons/dist/sys-help.js";
import "@ui5/webcomponents-icons/dist/paper-plane.js";
import "@ui5/webcomponents-icons/dist/attachment.js";
import "@ui5/webcomponents-icons/dist/log.js";
import axios from "../../../api/axios";
import Post from "../../../components/post/Post";
import Leaderboard from "../../../components/leaderboard/Leaderboard";
import Events from "../../../components/events/Events";
import {
  Button,
  Card,
  FileUploader,
  MessageStrip,
  MultiInput,
  TextArea,
  Title,
  Token,
} from "@ui5/webcomponents-react";
import Profile from "../../../utils/profile/Profile";
import UserContext from "../../../contexts/UserContext";
import MessageContext from "../../../contexts/MessageContext";

const Homepage = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [postText, setPostText] = useState("");
  const [tokens, setTokens] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const userInfo = useContext(UserContext);
  const showAlert = useContext(MessageContext)
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    // Filter out duplicates (by name + size to avoid re-adding same file)
    const uniqueNewFiles = selectedFiles.filter(
      (newFile) =>
        !files.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size
        )
    );

    const newPreviews = uniqueNewFiles.map((file) => URL.createObjectURL(file));

    setFiles((prev) => [...prev, ...uniqueNewFiles]);
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    const newPreviews = [...previewUrls];

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const handleAction = (id, action) => {
    let updatedPosts;
    switch (action) {
      case "approve":
        updatedPosts = posts.map((post) => {
          if (post.id === id) return { ...post, isApproved: true };
          return post;
        });
        break;
      case "reject":
        updatedPosts = posts.map((post) => {
          if (post.id === id) return { ...post, isApproved: false };
          return post;
        });
        break;
      case "delete":
        updatedPosts = posts.filter((post) => post.id !== id);
        break;
    }
    setPosts(updatedPosts);
  };


  const handlePostSubmit = async () => {
    if (!postText.trim() && files.length === 0) {
      showAlert("Please enter some text or attach files.", "Negative");
      return;
    }

    const formData = new FormData();
    formData.append("content", postText);
    formData.append("tags", tokens);
    files.forEach((file) => formData.append("media", file));

    try {
      const response = await axios.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset on success
      setPostText("");
      setFiles([]);
      setPreviewUrls([]);
      setTokens([]);
      fetchPosts();
      showAlert("Post Uploaded Successfully", "Positive");
    } catch (error) {
      showAlert("Failed to upload post", "Negative");
      console.error("Upload error:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/posts?page=${page}&limit=30`);

      if (page >= res?.data.totalPages) {
        setHasMore(false); // No more posts to load
      }

      setPosts((prev) => {
        const existingIds = new Set(prev.map((post) => post.id));

        // Filter only new posts
        const newPosts = res.data.posts.filter(
          (post) => !existingIds.has(post.id)
        );

        // Merge and sort by updatedAt (descending)
        const merged = [...prev, ...newPosts].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        return merged;
      });
    } catch (err) {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleTokenInput = (e) => {
    const value = e.target.value;
    const lastChar = value.slice(-1);

    if (lastChar === " ") {
      const trimmed = value.trim();
      if (trimmed && !tokens.includes(trimmed)) {
        setTokens([...tokens, trimmed]);
      }
      setCurrentInput(""); // reset input after adding token
    } else {
      setCurrentInput(value);
    }
  };

  const handleTokenDelete = (e) => {
    const deletingToken = e?.detail?.tokens[0]?.text;
    if (deletingToken) {
      setTokens((prev) => prev.filter((token) => token !== deletingToken));
    }
  };

  useEffect(() => {
    const container = document.getElementById("outlet");
    if (!container) return;
    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
      <div className="homepage">
        <section className="post-area">
          <Card>
            <div className="create-post-card">
              <Profile
                name={`${userInfo?.firstName} ${userInfo?.lastName}, What's in your mind today?`}
                description={"Share an update or add pictures"}
                picture={userInfo?.profilePicture}
              />
              <br />
              <TextArea
                maxlength={300}
                showExceededText
                growing
                rows={3}
                value={postText}
                onInput={(e) => setPostText(e.target.value)}
              />
              <label>Tags:</label>
              <MultiInput
                value={currentInput}
                onInput={handleTokenInput}
                onTokenDelete={handleTokenDelete}
                style={{ width: "300px" }}
                tokens={tokens.map((token, index) => (
                  <Token key={index} text={token} />
                ))}
                placeholder="Type a tag and press space"
                type="Text"
                valueState="None"
              />

              {/* Preview Thumbnails with Cancel Buttons */}
              {previewUrls.length > 0 && (
                <div className="image-preview-container">
                  {previewUrls.map((url, index) => (
                    <div className="image-preview-item" key={index}>
                      <img
                        src={url}
                        alt={`preview-${index}`}
                        className="preview-img"
                      />
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div
                className="create-post-actions"
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FileUploader hideInput multiple onChange={handleFileChange}>
                  <Button icon="attachment">Attach</Button>
                </FileUploader>

                <Button
                  icon="paper-plane"
                  design="Emphasized"
                  onClick={handlePostSubmit}
                >
                  Post
                </Button>
              </div>
            </div>
          </Card>
          {loading && <p>Loading posts...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && posts.length === 0 && (
            <p>No posts available.</p>
          )}
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              user={post.User}
              tags={post.tags}
              postedOn={post.updatedAt}
              isApproved={post.isApproved}
              postText={post.content}
              media={post.media}
              handleParentUpdate={(id, action) => handleAction(id, action)}
            />
          ))}
        </section>
        <section className="activities-section">
          <Leaderboard />
          <Events />
        </section>
      </div>
  );
};

export default Homepage;
