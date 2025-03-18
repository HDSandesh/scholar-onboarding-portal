import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Card, Button, Input, Select, Option } from "@ui5/webcomponents-react";
import "./Table.css";

const Table = ({ data }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const buddyOptions = ["Alice", "Bob", "Charlie", "David"];
  const [tableData, setTableData] = useState(data);
  const handleBuddyChange = (rowIndex, newBuddy) => {
    const updatedData = [...tableData];
    updatedData[rowIndex].buddy = newBuddy;
    setTableData(updatedData);
  };
  const columns = useMemo(
    () => [
      {
        header: () => <span className="table-header-text">ID</span>,
        accessorKey: "id",
      },
      {
        header: () => <span className="table-header-text">Full Name</span>,
        accessorKey: "fullName",
      },
      {
        header: () => <span className="table-header-text">Email</span>,
        accessorKey: "email",
      },
      {
        header: () => <span className="table-header-text">Buddy</span>,
        accessorKey: "buddy",
        cell: ({ row, getValue }) => (
          <Select
            value={getValue()}
            onChange={(e) => handleBuddyChange(row.index, e.target.value)}
            className="buddy-dropdown"
          >
            {buddyOptions.map((buddy) => (
              <Option key={buddy} value={buddy}>
                {buddy}
              </Option>
            ))}
          </Select>
        ),
      },
      {
        header: () => <span className="table-header-text">Status</span>,
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue();
          return (
            <Button
              design={status === "Active" ? "Positive" : "Negative"}
              className="status-button"
            >
              {status}
            </Button>
          );
        },
      },
      {
        header: () => <span className="table-header-text">Batch</span>,
        accessorKey: "batch",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
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
