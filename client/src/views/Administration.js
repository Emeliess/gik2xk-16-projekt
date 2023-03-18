import Button from "react-bootstrap/esm/Button";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";

function Administration() {
  return <>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Lägg till produkt</Accordion.Header>
        <Accordion.Body>
            <Form>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Titel</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Beskrivning</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Pris</Form.Label>
                    <Form.Control type="number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="imageUrl">
                    <Form.Label>Bild-URL</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
            </Form>
            <Button variant="primary">Lägg till produkt</Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </>;
}

export default Administration;

