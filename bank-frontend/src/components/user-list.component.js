import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import UserTableRow from "./userTableRow";

const UserList = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(window.location.origin + "/users/")
      .then(({ data }) => {
        setUser(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const DataTable = () => {
    return user.map((res, i) => {
      return <UserTableRow obj={res} key={i} />;
    });
  };
  return (
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};
export default UserList;
