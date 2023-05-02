import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const UserForm = props => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string()
      .email("You have entered an invalid email address")
      .required("Required"),
    amount: Yup.number().integer("INVALID AMOUNT").required("Required"),
  });

  return (
    <div className="form-wrapper login">
      <div className="form">
        <h2>Create User</h2>
        <Formik {...props} validationSchema={validationSchema}>
          <Form>
            <FormGroup>
              <label>Name:</label>
              <Field name="name" type="text" className="form-control" />
              <ErrorMessage
                name="name"
                className="d-block invalid-feedback"
                component="span"
              />
            </FormGroup>
            <FormGroup>
              <label>Email:</label>
              <Field name="email" type="text" className="form-control" />
              <ErrorMessage
                name="email"
                className="d-block invalid-feedback"
                component="span"
              />
            </FormGroup>
            <FormGroup>
              <label>Amount:</label>
              <Field name="amount" type="number" className="form-control" />
              <ErrorMessage
                name="amount"
                className="d-block invalid-feedback"
                component="span"
              />
            </FormGroup>
            <Button
              variant="danger"
              size="lg"
              block="block"
              type="submit"
              className="mt-2"
            >
              {" "}
              {props.children}
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default UserForm;
