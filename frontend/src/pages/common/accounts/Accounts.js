import { React, useContext, useEffect, useState } from "react";
import "./Accounts.css";
import {
  Button,
  Dialog,
  FlexBox,
  Icon,
  Input,
  Label,
  Select,
  Option,
  RadioButton,
} from "@ui5/webcomponents-react";
import Table from "../../../components/table/Table";
import axios from "../../../api/axios";
import "@ui5/webcomponents-icons/dist/download.js";
import "@ui5/webcomponents-icons/dist/add-employee.js";
import MessageContext from "../../../contexts/MessageContext";
const Accounts = () => {
  const [activeTab, setActiveTab] = useState("Scholar");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [buddies, setBuddies] = useState([]);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState("Scholar");
  const [batch, setBatch] = useState();
  const [updateId, setUpdateId] = useState();
  const [buddyId, setBuddyId] = useState();
  const showAlert = useContext(MessageContext);
  const fetchAccounts = async (page = 1, offset = 20) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/users?role=${activeTab}&page=${page}&limit=10`
      );
      setAccounts(res?.data);
    } catch (err) {
      showAlert("Failed to load accounts. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const fetchBuddies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/users?role=OnboardingBuddy`);
      setBuddies(res?.data?.data);
    } catch (err) {
      showAlert("Failed to load buddies. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      fetchAccounts()
      showAlert("User deleted successfully", "Positive");
    } catch (error) {
      console.error("Delete user failed:", error);
      showAlert("Failed to delete user", "Negative");
    }
  };

  const sendResetPasswordMail = async (id) => {
    console.log("Mail sent")
    try {
      await axios.post("/users/send-email", { id });
      showAlert("Reset password email sent", "Positive");
    } catch (error) {
      console.error("Sending reset password email failed:", error);
      showAlert("Failed to send reset password email", "Negative");
    }
  };

  const handleLockUnlockUser = async (id, action) => {
    try {
      if (action === "unlock") {
        await axios.patch(`/users/activate/${id}`);
        showAlert("User activated successfully", "Positive");
      } else if (action === "lock") {
        await axios.patch(`/users/deactivate/${id}`);
        showAlert("User deactivated successfully", "Positive");
      } else {
        throw new Error("Invalid action");
      }
      fetchAccounts()
    } catch (error) {
      console.error("User activation/deactivation failed:", error);
      showAlert("Failed to update user status", "Negative");
    }
  };

  const viewProfile = (user) => {
    console.log(user);
  };

  const handleSubmit = async (isUpdate) => {
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !role?.trim() ||
      !buddyId?.trim()
    ) {
      showAlert("Please fill in all required fields.", "Negative");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    if (batch) formData.append("batchId", batch);
    formData.append("role", role);
    formData.append("buddyId", buddyId);
    try {
      if (isUpdate) {
        await axios.put("/users/" + updateId, formData);
      } else {
        await axios.post("/users", formData);
      }

      setDialogOpen(false);
      if (isUpdate) {
        showAlert("User updated successfully!", "Positive");
      } else {
        showAlert("User created successfully!", "Positive");
      }
      fetchAccounts(); // Reload list if needed

      // Clear form state
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
      setBatch("");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "An unexpected error occurred.";

      showAlert(`Failed to create user. ${errorMessage}`, "Negative");
      console.error("User creation error:", error);
    }
  };

  const downloadExcel = async () => {
    try {
      const response = await axios.get("/users/export", {
        responseType: "blob", // tells axios to treat it as a file
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the object URL
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  const editUser = (user) => {
    setUpdateId(user.id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setBuddyId(user.buddyId);
    setEmail(user.email);
    setRole(user.role);
    setDialogOpen(true);
  };

  const handleBuddyChange = async (userId, buddyId) => {
    if (buddyId === "null")
      return showAlert("Please select a buddy", "Negative");
    try {
      const response = await axios.put(`/users/${userId}/buddy`, { buddyId });
      showAlert("Buddy updated successfully", "Positive");
    } catch (error) {
      console.error("Failed to update buddy:", error);
      showAlert(
        error.response?.data?.error || "Failed to update buddy",
        "Negative"
      );
    }
  };

  useEffect(() => {
    if (activeTab === "Scholar") fetchBuddies();
    fetchAccounts();
  }, [activeTab]);

  return (
    <div>
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
            {updateId ? (
              <Button design="Emphasized" onClick={() => handleSubmit(true)}>
                Update
              </Button>
            ) : (
              <Button design="Emphasized" onClick={() => handleSubmit(false)}>
                Save
              </Button>
            )}
          </FlexBox>
        }
        headerText="Create User"
        onClose={() => setDialogOpen(false)}
      >
        <div className="course-form">
          <div className="form-group">
            <Label required>First Name</Label>
            <Input
              className="form-input"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
              type="Text"
              valueState="None"
            />
          </div>
          <div className="form-group">
            <Label required>Last Name</Label>
            <Input
              required
              className="form-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="Text"
              valueState="None"
            />
          </div>
          <div className="form-group">
            <Label required>Email Address</Label>
            <Input
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="Text"
              valueState="None"
            />
          </div>
          <div className="form-group">
            <Label required>Role</Label>
            <div className="role-group">
              <RadioButton
                onChange={() => setRole("Scholar")}
                text="Scholar"
                valueState="None"
                name="role"
                checked={role === "Scholar"}
              />
              <RadioButton
                onChange={() => setRole("OnboardingBuddy")}
                text="Onboarding Buddy"
                valueState="None"
                name="role"
                checked={role === "OnboardingBuddy"}
              />
              <RadioButton
                onChange={() => setRole("VTManager")}
                text="VT Manager"
                valueState="None"
                name="role"
                value="VTManager"
                checked={role === "VTManager"}
              />
              <RadioButton
                onChange={() => setRole("Admin")}
                text="Admin"
                valueState="None"
                name="role"
                value="Admin"
                checked={role === "Admin"}
              />
            </div>
          </div>
          {role === "Scholar" && (
            <div className="form-group">
              <Label required>Onboarding Buddy</Label>
              <Select
                onChange={(e) => setBuddyId(e.target.value)}
                valueState="None"
                className="form-input"
                value={buddyId}
              >
                <Option value="null">Please Select a Buddy</Option>
                {buddies.map((buddy, index) => (
                  <Option key={index} value={buddy.id}>
                    {buddy.firstName + buddy.lastName}
                  </Option>
                ))}
              </Select>
            </div>
          )}
          {role === "Scholar" && (
            <div className="form-group">
              <Label>Batch</Label>
              <Select
                onChange={function Xs() {}}
                onClose={function Xs() {}}
                onLiveChange={function Xs() {}}
                onOpen={function Xs() {}}
                valueState="None"
                className="form-input"
              >
                <Option>Option 1</Option>
                <Option>Option 2</Option>
                <Option>Option 3</Option>
                <Option>Option 4</Option>
                <Option>Option 5</Option>
              </Select>
            </div>
          )}
        </div>
      </Dialog>
      <div className="tab-container">
        <div className="tab-strip">
          <div className="tabs">
            <div
              className={
                activeTab === "Scholar"
                  ? "tab-heading active-tab"
                  : "tab-heading"
              }
              onClick={() => setActiveTab("Scholar")}
            >
              <Icon
                name="study-leave"
                design={activeTab == "Scholar" ? "Information" : ""}
              />
              <span>Scholars ({accounts?.roleCounts?.totalScholars})</span>
            </div>
            <div
              className={
                activeTab === "OnboardingBuddy"
                  ? "tab-heading active-tab"
                  : "tab-heading"
              }
              onClick={() => setActiveTab("OnboardingBuddy")}
            >
              <Icon
                name="group"
                design={activeTab == "OnboardingBuddy" ? "Information" : ""}
              />
              <span>
                Buddies ({accounts?.roleCounts?.totalOnboardingBuddies})
              </span>
            </div>
            <div
              className={
                activeTab === "VTManager"
                  ? "tab-heading active-tab"
                  : "tab-heading"
              }
              onClick={() => setActiveTab("VTManager")}
            >
              <Icon
                name="manager"
                design={activeTab == "VTManager" ? "Information" : ""}
              />
              <span>VT Managers ({accounts?.roleCounts?.totalVTManagers})</span>
            </div>
            <div
              className={
                activeTab === "Admin" ? "tab-heading active-tab" : "tab-heading"
              }
              onClick={() => setActiveTab("Admin")}
            >
              <Icon
                name="user-settings"
                design={activeTab == "Admin" ? "Information" : ""}
              />
              <span>Admin ({accounts?.roleCounts?.totalAdmins})</span>
            </div>
          </div>
          <div className="accounts-action-buttons">
            <Button icon="download" onClick={downloadExcel}>Export</Button>
            <Button
              design="Emphasized"
              icon="add-employee"
              onClick={() => setDialogOpen(true)}
            >
              Add User
            </Button>
          </div>
        </div>
        <div className="tab-body">
          <div className="tab">
            <Table
              data={accounts}
              userType={activeTab}
              buddies={buddies}
              handleBuddyChange={(userId, buddyId) =>
                handleBuddyChange(userId, buddyId)
              }
              editUser={(user) => editUser(user)}
              deleteUser={(id)=> deleteUser(id)}
              sendResetPasswordMail={(id)=> sendResetPasswordMail(id)}
              handleLockUnlockUser={(id,action)=> handleLockUnlockUser(id,action)}
              viewProfile={(user)=> viewProfile(user)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
