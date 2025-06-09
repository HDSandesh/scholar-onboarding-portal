const Event = require("../models/event");

const createEvent = async ({ title, description, date, media }) => {
  return await Event.create({ title, description, date, media });
};

const updateEvent = async (id, data) => {
  const event = await Event.findByPk(id);
  if (!event) throw new Error("Event not found");

  // Update only provided fields
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) event[key] = value;
  });

  await event.save();
  return event;
};

const deleteEvent = async (id) => {
  const event = await Event.findByPk(id);
  if (!event) throw new Error("Event not found");
  await event.destroy();
};

const getAllEvents = async () => {
  return await Event.findAll({ order: [["date", "ASC"]] });
};

const getEventById = async (id) => {
  return await Event.findByPk(id);
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
};
