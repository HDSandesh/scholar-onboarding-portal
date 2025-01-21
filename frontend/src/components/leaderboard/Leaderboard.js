import { Card, CardHeader, Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow } from "@ui5/webcomponents-react";
import React from "react";
import "./Leaderboard.css"
const Leaderboard = () => {
  return (
    <Card>
      <h3 className="leaderboard">Leaderboard</h3>
      <Table
        headerRow={
          <TableHeaderRow sticky>
            <TableHeaderCell>
              <span>Rank</span>
            </TableHeaderCell>
            <TableHeaderCell>
              <span>Name</span>
            </TableHeaderCell>
            <TableHeaderCell>
              <span>Points</span>
            </TableHeaderCell>
          </TableHeaderRow>
        }
        onMove={function Ki() {}}
        onMoveOver={function Ki() {}}
        onRowClick={function Ki() {}}
      >
        <TableRow>
          <TableCell>
            <span>#1</span>
          </TableCell>
          <TableCell>
            <span>Nisha Pandey</span>
          </TableCell>
          <TableCell>
            <span>20069</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>#2</span>
          </TableCell>
          <TableCell>
            <span>Nisha Pandey</span>
          </TableCell>
          <TableCell>
            <span>20069</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>#3</span>
          </TableCell>
          <TableCell>
            <span>Nisha Pandey</span>
          </TableCell>
          <TableCell>
            <span>20069</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>#4</span>
          </TableCell>
          <TableCell>
            <span>Nisha Pandey</span>
          </TableCell>
          <TableCell>
            <span>20069</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>#5</span>
          </TableCell>
          <TableCell>
            <span>Nisha Pandey</span>
          </TableCell>
          <TableCell>
            <span>20069</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>#6</span>
          </TableCell>
          <TableCell>
            <span>Nisha Pandey</span>
          </TableCell>
          <TableCell>
            <span>20069</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>#7</span>
          </TableCell>
          <TableCell>
            <span>Nisha Pandey</span>
          </TableCell>
          <TableCell>
            <span>20069</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>#8</span>
          </TableCell>
          <TableCell>
            <span>Nisha Pandey</span>
          </TableCell>
          <TableCell>
            <span>20069</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <span>#9</span>
          </TableCell>
          <TableCell>
            <span>Nisha Pandey</span>
          </TableCell>
          <TableCell>
            <span>20069</span>
          </TableCell>
        </TableRow>
        <TableRow style={{background:'#4DB1FF'}}>
          <TableCell>
            <span>#22</span>
          </TableCell>
          <TableCell>
            <span>Sandesh H D</span>
          </TableCell>
          <TableCell>
            <span>19969</span>
          </TableCell>
        </TableRow>
      </Table>
    </Card>
  );
};

export default Leaderboard;
