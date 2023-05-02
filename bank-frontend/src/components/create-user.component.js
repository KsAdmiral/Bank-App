import React, { useState } from "react";
import axios from "axios";
import UserForm from "./UserForm";

const CreateUser = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    amount: "",
  });

  const onSubmit = userObject => {
    axios
      .post("/users/create-user", userObject)
      .then(res => {
        if (res.status === 200) {
          alert("User added Successfully");
          window.location = "/";
        } else return Promise.reject();
      })
      .catch(err => alert(err));
  };

  return (
    <UserForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
      {" "}
      Create User
    </UserForm>
  );
};

export default CreateUser;
