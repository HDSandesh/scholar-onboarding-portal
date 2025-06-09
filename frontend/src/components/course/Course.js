import { Button, Card, Icon, Tag } from "@ui5/webcomponents-react";
import React, { useContext } from "react";
import "@ui5/webcomponents-icons/dist/number-sign.js";
import "./Course.css";
import UserContext from "../../contexts/UserContext";
import PlaceholderImage from "../../assets/placeholder-image.png";
const Course = ({ completed, course, editCourse, deleteCourse }) => {
  const userInfo = useContext(UserContext);
  return (
    <div className="course-container">
      <Card>
        <div className="course">
          <div className="course-heading">
            <div className="course-title-image">
              <img
                src={
                  course.thumbnail
                    ? "http://127.0.0.1:3006/uploads/thumbnails/" +
                      course.thumbnail
                    : PlaceholderImage
                }
                className="course-preview"
              />
              <div className="course-title">
                <h3>{course.title}</h3>
                <div className="title-subheading">
                  <span>
                    By:{" "}
                    <span className="title-value">{course.instructorName}</span>
                  </span>
                  <span>
                    Duration:{" "}
                    <span className="title-value">{course.duration} Hrs</span>
                  </span>
                </div>
              </div>
            </div>
            {userInfo?.role !=='Scholar' &&<Button icon="edit" onClick={editCourse} />}
          </div>
          <div className="course-body">
            <p>{course.description}</p>
            <div className="hashtags">
              {course?.tags.map((tag, index) => (
                <Tag
                  key={index}
                  design="Set2"
                  colorScheme="9"
                  icon={<Icon name="number-sign" />}
                  onClick={function Ki() {}}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
          <div className="course-footer">
            <Button
              design="Emphasized"
              onClick={() => window.open(course.link, "_blank")}
            >
              Link
            </Button>
            {userInfo?.role !== 'Scholar' && <Button design="Negative" onClick={deleteCourse}>Delete</Button>}
            {!completed && userInfo?.role === "Scholar" && (
              <Button>Mark as completed</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Course;
