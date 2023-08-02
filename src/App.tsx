import { useState } from "react";

import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-auto">
      <Row>
        <Form>
          <FormGroup className="d-flex flex-column align-items-center justify-content-center">
            <Label for="cityName">City</Label>
          </FormGroup>
          <FormGroup className="d-flex justify-content-center gap-3">
            <Input
              id="cityName"
              name="city"
              placeholder="Ex:Maputo"
              maxLength={60}
              className="w-25"
              type="text"
            />
            <Button>Search</Button>
          </FormGroup>
        </Form>
      </Row>
      <Row>
        <Col className="bg-dark text-center text-white">
          Designed By Osv aldo Cuambe
        </Col>
      </Row>
    </div>
  );
}

export default App;
