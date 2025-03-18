import {React,useState} from 'react'
import "./Accounts.css"
import { Button, Icon } from '@ui5/webcomponents-react'
import Table from '../../../components/table/Table';
import "@ui5/webcomponents-icons/dist/download.js"
import "@ui5/webcomponents-icons/dist/add-employee.js"
const Accounts = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [tableData,setTableData] =useState([
      {
        id: 1,
        fullName: "Sandesh H D",
        email: "sandeshhd16@gmail.com",
        buddy: "Sandesh HD",
        status: "Active",
        batch: "No Batch",
      },
      {
        id: 2,
        fullName: "Aryan Sharma",
        email: "aryan.sharma@example.com",
        buddy: "Ravi Kumar",
        status: "Active",
        batch: "2024-A",
      },
      {
        id: 3,
        fullName: "Neha Verma",
        email: "neha.verma@example.com",
        buddy: "Pooja R",
        status: "Inactive",
        batch: "2023-B",
      },
      {
        id: 4,
        fullName: "Rohan Mehta",
        email: "rohan.mehta@example.com",
        buddy: "Siddharth S",
        status: "Active",
        batch: "2024-B",
      },
      {
        id: 5,
        fullName: "Priya Iyer",
        email: "priya.iyer@example.com",
        buddy: "Divya K",
        status: "Active",
        batch: "2023-C",
      },
      {
        id: 6,
        fullName: "Ankit Yadav",
        email: "ankit.yadav@example.com",
        buddy: "Amit T",
        status: "Inactive",
        batch: "2022-A",
      },
      {
        id: 7,
        fullName: "Shruti Patel",
        email: "shruti.patel@example.com",
        buddy: "Rakesh B",
        status: "Active",
        batch: "2025-A",
      },
      {
        id: 8,
        fullName: "Vikram Singh",
        email: "vikram.singh@example.com",
        buddy: "Manoj P",
        status: "Active",
        batch: "2024-C",
      },
      {
        id: 9,
        fullName: "Kiran Das",
        email: "kiran.das@example.com",
        buddy: "Sameer J",
        status: "Inactive",
        batch: "2022-B",
      },
      {
        id: 10,
        fullName: "Ayesha Khan",
        email: "ayesha.khan@example.com",
        buddy: "Fatima S",
        status: "Active",
        batch: "2025-B",
      },
    ]);
    
  return (
    <div>
      <div className="tab-container">
        <div className="tab-strip">
          <div className="tabs">
            <div
              className={
                activeTab === 0 ? "tab-heading active-tab" : "tab-heading"
              }
              onClick={() => setActiveTab(0)}
            >
              <Icon name="pending" design={activeTab==0?"Information":""}/>
              <span>Scholars (30)</span>
            </div>
            <div
              className={
                activeTab === 1 ? "tab-heading active-tab" : "tab-heading"
              }
              onClick={() => setActiveTab(1)}
            >
              <Icon name="status-completed" design={activeTab==1?"Information":""}/>
              <span>Admin (10)</span>
            </div>
            <div
              className={
                activeTab === 2 ? "tab-heading active-tab" : "tab-heading"
              }
              onClick={() => setActiveTab(2)}
            >
              <Icon name="status-completed" design={activeTab==2?"Information":""}/>
              <span>VT Managers (10)</span>
            </div>
          </div>
          <div className="accounts-action-buttons">
            <Button icon="download">Export</Button>
            <Button design="Emphasized" icon="add-employee">Add User</Button>
          </div>
        </div>
        <div className="tab-body">
          {activeTab === 0 && (
            <div className="tab">
              <Table data={tableData}/>
            </div>
          )}
          {activeTab === 1 && (
            <div className="tab">
              Onboarding Buddies
            </div>
          )}
          {activeTab === 2 && (
            <div className="tab">
              VT Managers
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Accounts
