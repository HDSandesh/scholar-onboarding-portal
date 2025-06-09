const formService = require("../services/formService");

const createForm = async (req, res) => {
  try {
    const form = await formService.createForm(req.body);
    res.status(201).json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getForms = async (req, res) => {
  try {
    const forms = await formService.getAllForms();
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFormsByUserAndStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.query; // "filled" or "unfilled"

  try {
    let forms;

    if (status === "filled") {
      forms = await formService.getFilledForms(userId);
    } else if (status === "unfilled") {
      forms = await formService.getUnfilledForms(userId);
    } else {
      return res.status(400).json({ message: "Invalid or missing status. Use 'filled' or 'unfilled'." });
    }

    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ message: "Error fetching forms", error: err.message });
  }
};

const submitFormResponse = async (req, res) => {
  const { id: formId } = req.params;
  const userId = req.user.id;
  const { responses } = req.body;

  try {
    const response = await formService.submitFormResponse(formId, userId, responses);
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error submitting form response:", error);
    return res.status(500).json({ message: "Failed to submit form response" });
  }
};

const getForm = async (req, res) => {
  try {
    const form = await formService.getFormById(req.params.id);
    if (!form) return res.status(404).json({ error: "Form not found" });
    res.status(200).json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateForm = async (req, res) => {
  try {
    const updatedForm = await formService.updateForm(req.params.id, req.body);
    res.status(200).json(updatedForm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteForm = async (req, res) => {
  try {
    await formService.deleteForm(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleFormActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedForm = await formService.toggleActiveStatus(id);

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({
      message: `Form ${updatedForm.isActive ? "activated" : "deactivated"}`,
      form: updatedForm,
    });
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFormSummary = async (req, res) => {
  try {
    const formId = req.params.id;
    const summary = await formService.getFormSummary(formId);
    res.status(200).json(summary);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to get form summary" });
  }
};

const getFormResponses = async (req, res) => {
  try {
    const formId = req.params.id;
    const responses = await formService.getFormResponses(formId);
    res.status(200).json(responses);
  } catch (err) {
    res.status(500).json({ error: "Failed to get form responses" });
  }
};


module.exports = {
  createForm,
  getForms,
  getForm,
  updateForm,
  deleteForm,
  toggleFormActiveStatus,
  getFormSummary,
  getFormResponses,
  getFormsByUserAndStatus,
  submitFormResponse
};
