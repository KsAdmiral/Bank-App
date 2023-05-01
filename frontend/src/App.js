import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateUser from "./components/create-user.component";
import userList from "./components/user-list.component";
import transactionList from "./components/transaction-list.component";
import HomePage from "./components/Home";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header sicky-nav">
          <NavBar />
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/create-user" component={CreateUser} />
                  <Route path="/user-list" component={userList} />
                  <Route
                    path="/transaction-history"
                    component={transactionList}
                  />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
