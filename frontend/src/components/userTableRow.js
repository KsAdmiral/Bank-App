import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const UserTableRow = props => {
  const { _id, name, email, amount } = props.obj;

  const deleteUser = () => {
    axios
      .delete(window.location.origin + "/users/delete-user/" + _id)
      .then(res => {
        if (res.status === 200) {
          alert("User successfully deleted");
          window.location.reload();
        }
      });
  };

  const [user, setUser] = useState([]);
  const [user2, setUser2] = useState([]);
  const [formValues, setFormValues] = useState({
    name1: name,
    name2: "",
    amount: "",
  });
  const [formValues2, setFormValues2] = useState({
    name: "",
    email: "",
    amount: "",
  });
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

  const selectData = event => {
    const index = event.target.selectedIndex;
    const el = event.target.childNodes[index];
    const option = el.getAttribute("id");
    setUser2(option);
    console.log(index, el, option);
    setFormValues(prev => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const selectAmount = event => {
    if (event.target.value > amount) {
      alert("low Balance");
      window.location = "/";
    } else {
      setFormValues(prev => {
        return { ...prev, [event.target.name]: event.target.value };
      });
    }
  };

  const DataTable = () => {
    return user.map(category => {
      console.log(category);
      return <option id={category._id}>{category.name}</option>;
    });
  };

  const onSubmit = () => {
    if (formValues.name2 === "" || formValues.amount === "") {
      if (formValues.amount === "")
        alert("Please enter the amount you want to send");
      if (formValues.name2 === "") alert("Please select receiver's name");
    } else if (formValues.name2 === formValues.name1)
      alert("sender and receiver can't be same");
    else {
      axios
        .post(window.location.origin + "/users/create-transaction", formValues)
        .then(res => {
          if (res.status === 200) {
            alert("Transaction Successfull");
            window.location = "/";
          } else Promise.reject();
        })
        .catch(err => alert(err));
      handleClose();
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{amount}</td>
      <td>
        <Button variant="primary" size="sm" onClick={handleShow}>
          Transfer
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <div className="d-flex justify-content-center">
              <Modal.Title>Transaction Screen</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-2">Transfer to:</div>
            <Form.Select name="name2" onChange={selectData} required>
              <option>--none--</option>
              {DataTable()}
            </Form.Select>

            <form>
              <div className="mt-3 mb-2">
                <label>Amount:</label>
              </div>
              <input
                type="number"
                name="amount"
                className="transaction-amount"
                onChange={selectAmount}
                required
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={onSubmit}>
              Transfer
            </Button>
          </Modal.Footer>
        </Modal>

        <Button
          onClick={deleteUser}
          size="sm"
          variant="danger"
          className="delete-button"
        >
          delete
        </Button>
      </td>
    </tr>
  );
};

export default UserTableRow;
