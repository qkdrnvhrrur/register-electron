import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const Input = () => {
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");
  const [numbers, setNum] = useState("");

  const handleOnChangeID = (e) => {
    setID(e.target.value);
  };
  const handleOnChangePW = (e) => {
    setPW(e.target.value);
  };
  const handleOnChangeNum = (e) => {
    setNum(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    window.ipcRenderer.send("start_register", { id, pw, numbers });
  };

  return (
    <Card.Body>
      <Container>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group controlId="formID">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="ID"
              name="id"
              onChange={handleOnChangeID}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="pw"
              onChange={handleOnChangePW}
            />
          </Form.Group>

          <Form.Group controlId="formTextArea">
            <Form.Label>학수번호</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="ex)12345678 87654321 ...&#13;&#10;*공백(SpaceBar 한 번)으로 구분!!!"
              name="numbers"
              onChange={handleOnChangeNum}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="float-right">
            Submit
          </Button>
        </Form>
      </Container>
    </Card.Body>
  );
};

export default Input;
