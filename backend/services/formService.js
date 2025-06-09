const { Sequelize, sequelize } = require("../models");
const Form = require("../models/form");
const FormResponse = require("../models/formResponse");

const createForm = async (formData) => {
  return await Form.create(formData);
};

const getAllForms = async () => {
  const forms = await Form.findAll({
    attributes: {
      exclude: ['fields'],
      include: [
        [
          Sequelize.fn('COUNT', Sequelize.col('FormResponses.id')),
          'responseCount'
        ]
      ]
    },
    include: [
      {
        model: FormResponse,
        attributes: [] // Don’t include full FormResponse details
      }
    ],
    group: ['Form.id'],
    order: [['createdAt', 'DESC']]
  });

  return forms;
};

const getFilledForms = async (userId) => {
  const responses = await FormResponse.findAll({ where: { userId }, include: [Form] });
  return responses.map((response) => response.Form); // Return the form objects
};

const getUnfilledForms = async (userId) => {
  const unfilledForms = await sequelize.query(
    `
    SELECT * FROM "Forms" f
    WHERE f."isActive" = true
      AND NOT EXISTS (
        SELECT 1 FROM "FormResponses" fr
        WHERE fr."formId" = f."id" AND fr."userId" = :userId
      )
    `,
    {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  return unfilledForms;
};

const submitFormResponse = async (formId, userId, responses) => {
  // Optional: validate if form exists and is active
  const form = await Form.findByPk(formId);
  if (!form || !form.isActive) {
    throw new Error("Form not found or is not active");
  }

  // Optional: check if the user has already submitted the form
  const alreadySubmitted = await FormResponse.findOne({
    where: { formId, userId },
  });
  if (alreadySubmitted) {
    throw new Error("You have already submitted this form");
  }

  // Save the form response
  const response = await FormResponse.create({
    formId,
    userId,
    responses,
  });

  return response;
};

const getFormById = async (id) => {
  const form = await Form.findByPk(id);
  if (!form) return null;

  const responseCount = await FormResponse.count({
    where: { formId: id },
  });

  return {
    ...form.toJSON(),
    responseCount,
  };
};

const updateForm = async (id, updatedData) => {
  const form = await Form.findByPk(id);
  if (!form) throw new Error("Form not found");
  return await form.update(updatedData);
};

const toggleActiveStatus = async (formId) => {
  const form = await Form.findByPk(formId);
  if (!form) return null;

  form.isActive = !form.isActive;
  await form.save();

  return form;
};

const deleteForm = async (id) => {
  const form = await Form.findByPk(id);
  if (!form) throw new Error("Form not found");
  return await form.destroy();
};

const getFormResponses = async (formId) => {
  const responses = await FormResponse.findAll({
    where: { formId },
    attributes: ["id", "userId", "responses", "createdAt"],
    order: [["createdAt", "DESC"]],
  });
  return responses;
};

const getFormSummary = async (formId) => {
  // Step 1: Fetch form and fields
  const form = await Form.findByPk(formId);
  if (!form?.fields) return {};

  // Step 2: Build question metadata map
  const questionMeta = form.fields.reduce((map, field) => {
    map[field.id] = {
      questionText: field.text || field.question || "Untitled",
      type: field.type || "unknown",
    };
    return map;
  }, {});

  // Step 3: Fetch all responses
  const responseRecords = await FormResponse.findAll({
    where: { formId },
    attributes: ["responses"],
    raw: true,
  });

  const summaryMap = {};

  // Step 4: Aggregate answers
  for (const record of responseRecords) {
    const responses = record.responses;
    if (!responses || typeof responses !== "object") continue;

    for (const [questionId, answer] of Object.entries(responses)) {
      if (!summaryMap[questionId]) {
        summaryMap[questionId] = {
          questionText: questionMeta[questionId]?.questionText || "Unknown",
          type: questionMeta[questionId]?.type || "unknown",
          count: 0,
          answersMap: {}, // internal only
        };
      }

      summaryMap[questionId].count++;

      const answers = Array.isArray(answer) ? answer : [answer];
      answers.forEach((ans) => {
        summaryMap[questionId].answersMap[ans] =
          (summaryMap[questionId].answersMap[ans] || 0) + 1;
      });
    }
  }

  // Step 5: Transform answersMap into array
  const finalSummary = {};
  for (const [questionId, data] of Object.entries(summaryMap)) {
    const { answersMap, ...rest } = data;
    finalSummary[questionId] = {
      ...rest,
      answers: Object.entries(answersMap).map(([answer, count]) => ({
        answer,
        count,
      })),
    };
  }

  return finalSummary;
};


module.exports = {
  createForm,
  getAllForms,
  getFormById,
  updateForm,
  toggleActiveStatus,
  deleteForm,
  getFormSummary,
  getFormResponses,
  getUnfilledForms,
  getFilledForms,
  submitFormResponse
};
