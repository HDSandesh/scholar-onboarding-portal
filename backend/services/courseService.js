const db = require("../models");
const Course = db.Course;

const createCourse = async (courseData) => {
  return await Course.create(courseData);
};

const getAllCourses = async () => {
  return await Course.findAll({order: [['updatedAt', 'DESC']],});
};

const getCourseById = async (id) => {
  return await Course.findByPk(id);
};

const updateCourse = async (id, updateData) => {
  const course = await Course.findByPk(id);
  if (!course) throw new Error("Course not found");
  return await course.update(updateData);
};

const deleteCourse = async (id) => {
  const course = await Course.findByPk(id);
  if (!course) throw new Error("Course not found");
  return await course.destroy();
};

// Dummy model for completion, replace with your actual UserCourse or similar
const markCourseAsCompleted = async (userId, courseId) => {
  return await db.UserCourse.create({ userId, courseId, completed: true });
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  markCourseAsCompleted,
};
