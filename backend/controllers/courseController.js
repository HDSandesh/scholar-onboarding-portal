const courseService = require("../services/courseService");

const create = async (req, res) => {
  try {
    const { title, instructorName, description, duration, tags, link } =
      req.body;

    let tagsArray = [];
    if (tags && typeof tags === "string") {
      tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
    }

    tagsArray = [...new Set(tagsArray)];
    const thumbnail = req.file?.filename;
    const courseData = {
      title,
      instructorName,
      description,
      duration,
      tags:tagsArray,
      link,
      thumbnail,
    };

    const course = await courseService.createCourse(courseData);
    res.status(201).json(course);
  } catch (error) {
    console.error("Course creation failed:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
    try {
        const { title, instructorName, description, duration, tags, link } =
          req.body;
    
        let tagsArray = [];
        if (tags && typeof tags === "string") {
          tagsArray = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag);
        }
    
        tagsArray = [...new Set(tagsArray)];
        const thumbnail = req.file?.filename;
        const courseData = {
          title,
          instructorName,
          description,
          duration,
          tags:tagsArray,
          link
        };
        if(thumbnail)
            courseData.thumbnail = thumbnail
    
        const course = await courseService.updateCourse(req.params.id,courseData);
        res.status(201).json(course);
      } catch (error) {
        console.error("Course updation failed:", error);
        res.status(500).json({ error: error.message });
      }
};

const remove = async (req, res) => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const markCompleted = async (req, res) => {
  try {
    const { userId } = req.body;
    const { courseId } = req.params;
    const completed = await courseService.markCourseAsCompleted(
      userId,
      courseId
    );
    res.status(200).json(completed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  markCompleted,
};
