import React, { useContext, useEffect, useState } from "react";
import Course from "../../../components/course/Course";
import "./Courses.css";
import {
  Button,
  Dialog,
  FileUploader,
  FlexBox,
  Icon,
  Input,
  Label,
  MultiInput,
  TextArea,
  Token,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/status-completed.js";
import "@ui5/webcomponents-icons/dist/pending.js";
import MessageContext from "../../../contexts/MessageContext";
import UserContext from "../../../contexts/UserContext";
import axios from "../../../api/axios";
const Courses = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [currentInput, setCurrentInput] = useState("");
  const [tokens, setTokens] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [duration, setDuration] = useState();
  const [link, setLink] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [pendingCourses, setPendingCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const showAlert = useContext(MessageContext);
  const userInfo = useContext(UserContext);
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

  const editCourse = (course) => {
    setUpdateId(course.id)
    setDialogOpen(true)
    setTitle(course.title)
    setAuthor(course.instructorName)
    setDescription(course.description)
    setDuration(course.duration)
    setLink(course.link)
    setTokens(course.tags)
    // console.log(id)
  }

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/courses`);
      const pendingCourses = [];
      const completedCourses = [];
      res?.data.forEach((course) => {
        if (course.isCompleted) completedCourses.push(course);
        else pendingCourses.push(course);
      });
      setPendingCourses(pendingCourses);
      setCompletedCourses(completedCourses);
    } catch (err) {
      showAlert("Failed to load courses. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (isUpdate) => {
    if (!title.trim() || !author.trim() || !description.trim()) {
      showAlert("Please fill in all required fields.", "Negative");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("instructorName", author);
    formData.append("description", description);
    if (duration) formData.append("duration", duration);
    if (tokens) formData.append("tags", tokens);
    if (link) formData.append("link", link);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    console.log(isUpdate)
    try {
      if(isUpdate){
        await axios.put("/courses/"+updateId, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }else{
        await axios.post("/courses", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setDialogOpen(false);
      if(isUpdate){
        showAlert("Course updated successfully!", "Positive");
      }else{
        showAlert("Course created successfully!", "Positive");
      }
      fetchCourses(); // Reload list if needed
      
      // Clear form state
      setTitle("");
      setAuthor("");
      setDescription("");
      setDuration("");
      setTokens([]);
      setLink("");
      setUpdateId(null)
      setThumbnail(null);
    } catch (error) {
      showAlert("Failed to create course.", "Negative");
      console.error("Course creation error:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const deleteCourse = async (id) =>{
    try {
      setLoading(true);
      await axios.delete(`/courses/${id}`);
      fetchCourses()
      showAlert("Course deleted Successfully", "Positive" );
    } catch (err) {
      showAlert("Failed to load courses. Please try again!","Negative");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="courses">
      <Dialog
        stretch
        style={{ maxWidth: "600px", height: "fit-content" }}
        open={dialogOpen}
        footer={
          <FlexBox
            fitContainer
            justifyContent="End"
            style={{ paddingBlock: "0.25rem" }}
          >
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
            &nbsp;&nbsp;
            {updateId?<Button design="Emphasized" onClick={()=> handleSubmit(true)}>
              Update
            </Button>:<Button design="Emphasized" onClick={()=> handleSubmit(false)}>
              Save
            </Button>}
          </FlexBox>
        }
        headerText="Create Course"
        onClose={() => setDialogOpen(false)}
      >
        <div className="course-form">
          <div className="form-group">
            <Label required>Course Title</Label>
            <Input
              className="form-input"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              type="Text"
              valueState="None"
            />
          </div>
          <div className="form-group">
            <Label required>Instructor Name</Label>
            <Input
              required
              className="form-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="Text"
              valueState="None"
            />
          </div>
          <div className="form-group">
            <Label required>Course Description</Label>
            <TextArea
              required
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Label>Duration (in hours)</Label>
            <Input
              className="form-input"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
              type="Number"
              valueState="None"
            />
          </div>
          <div className="form-group">
            <Label required>Resource Link</Label>
            <Input
              required
              className="form-input"
              onChange={(e) => setLink(e.target.value)}
              type="Text"
              value={link}
            />
          </div>
          <div className="form-group">
            <Label>Tags</Label>
            <MultiInput
              className="form-input"
              value={currentInput}
              onInput={handleTokenInput}
              onTokenDelete={handleTokenDelete}
              tokens={tokens.map((token, index) => (
                <Token key={index} text={token} />
              ))}
              placeholder="Type a tag and press space"
              type="Text"
              valueState="None"
            />
          </div>
          <div className="form-group">
            <Label>Thumbnail</Label>
            <FileUploader
              className="form-input"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </Dialog>
      <div className="tab-container">
        <div className="tab-strip">
          <div className="tabs">
            <div
              className={
                activeTab === 0 ? "tab-heading active-tab" : "tab-heading"
              }
              onClick={() => setActiveTab(0)}
            >
              {userInfo?.role === "Scholar" && (
                <Icon
                  name={"pending"}
                  design={activeTab == 0 ? "Information" : ""}
                />
              )}
              <span>
                {userInfo?.role === "Scholar" ? "Pending" : "Courses"} ({pendingCourses.length})
              </span>
            </div>
            {userInfo?.role === "Scholar" && (
              <div
                className={
                  activeTab === 1 ? "tab-heading active-tab" : "tab-heading"
                }
                onClick={() => setActiveTab(1)}
              >
                <Icon
                  name="status-completed"
                  design={activeTab == 1 ? "Information" : ""}
                />
                <span>Completed ({completedCourses.length})</span>
              </div>
            )}
          </div>
          <Button design="Emphasized" onClick={() => setDialogOpen(true)}>
            Create Course
          </Button>
        </div>
        <div className="tab-body">
          {activeTab === 0 && (
            <div className="tab">
              <div className="course-list">
                {pendingCourses.map((course, index) => (
                  <Course key={index} course={course} editCourse={()=>editCourse(course)} deleteCourse = {()=>deleteCourse(course.id)}/>
                ))}
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="tab">
              <div className="course-list">
                {completedCourses.map((course, index) => (
                  <Course key={index} course={course} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
