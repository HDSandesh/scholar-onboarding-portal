import React, { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Card,
  Button,
  Input,
  Select,
  Option,
  ObjectStatus,
  Avatar,
} from "@ui5/webcomponents-react";
import ActionSheetComponent from "./ActionSheetComponent";
import "./Table.css";

const Table = ({ data, userType, buddies, handleBuddyChange, editUser, deleteUser, sendResetPasswordMail, handleLockUnlockUser, viewProfile }) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const getInitials = (name) => {
    const [firstName = '', lastName = ''] = name.trim().split(' ');
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Dynamically generate columns based on userType
  const columns = useMemo(() => {
    const baseColumns = [
      {
        header: () => <span className="table-header-text">Profile</span>,
        accessorKey: "profilePicture",
        cell: ({row})=>{
          const rowData = row.original; // full row data
          const { firstName, lastName, profilePicture } = rowData; 
          return profilePicture? <img
            className="display-picture"
            src={profilePicture}
            alt="profile"
          />:<Avatar initials={getInitials(firstName + " " + lastName)}/>

        }
      },
      {
        header: () => <span className="table-header-text">Full Name</span>,
        accessorKey: "firstName",
        cell: ({row}) => {
          const rowData = row.original; // full row data
          const { firstName, lastName } = rowData;
          return firstName + " " + lastName
        }
      },
      {
        header: () => <span className="table-header-text">Email</span>,
        accessorKey: "email",
      },
    ];

    // Add Buddy column only for specific user types (e.g., Buddy, Admin)
    if (userType === "Scholar") {
      baseColumns.push({
        header: () => <span className="table-header-text">Buddy</span>,
        accessorKey: "buddy",
        cell: ({ row, getValue }) => {
          const {id, buddyId}  = row.original
          return <Select
            value={getValue()}
            onChange={(e) => handleBuddyChange(id, e.target.value)}
            className="buddy-dropdown"
          >
            <Option value="null">Please Select a Buddy</Option>
            {buddies?.map((buddy,index) => (
              <Option key={index} value={buddy.id} selected={buddy.id === buddyId }>
                {buddy.firstName}
              </Option>
            ))}
          </Select>
        },
      });
    }
    // Add Batch column for all user types
    if (userType === "Scholar") {
      baseColumns.push({
        header: () => <span className="table-header-text">Batch</span>,
        accessorKey: "batch",
      });
    }

    baseColumns.push({
      header: () => <span className="table-header-text">Status</span>,
      accessorKey: "isActive",
      cell: ({ getValue }) => {
        const status = getValue();
        return (
          <ObjectStatus
            style={{ fontWeight: "bold" }}
            onClick={function Xs() {}}
            state={status ? "Indication04" : "Indication03"}
          >
            {status?'Active':'Inactive'}
          </ObjectStatus>
        );
      },
    });

    baseColumns.push({
      header: () => <span className="table-header-text">Actions</span>,
      accessorKey: "actions",
      cell: ({ row }) => {
        const rowData = row.original; // full row data
        const { id, isActive } = rowData;
    
        return (
          <ActionSheetComponent
            user={rowData}
            isActive={isActive}
            editUser={editUser}
            deleteUser={deleteUser}
            sendResetPasswordMail={sendResetPasswordMail}
            handleLockUnlockUser={handleLockUnlockUser}
            viewProfile={viewProfile}
          />
        );
      }
    });
    return baseColumns;
  }, [userType, buddies]);

  const table = useReactTable({
    data: data.data??[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) =>
      row
        .getValue(columnId)
        .toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase()),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <Card>
      <div className="accounts-table">
        <div className="table-header">
          <div className="table-search">
            <Input
              placeholder="Search..."
              value={globalFilter}
              onInput={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          <div className="table-action-button">
            <Button design="Emphasized">Import</Button>
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="table-header-cell">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="table-cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default Table;