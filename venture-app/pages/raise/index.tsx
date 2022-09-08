import type { NextPage } from "next";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';



const Raise: NextPage = () => {
    return (
        <div>
           <h3> Raise A Project</h3>
            <Form className="custom-form-style" onSubmit={e => e.preventDefault()}>
            <h3> Raise A Project</h3>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Project Title:</Form.Label>
                    <Form.Control type="text" placeholder="Enter an interesting title here!" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows={5} />
                </Form.Group>
                <Form.Label>Targetted Raise Amount:</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control aria-label="Amount (to the nearest dollar)" />
                    <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
                    <Form.Label htmlFor="basic-url">Your Project URL:</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3"> https:// </InputGroup.Text>
                    <Form.Control id="basic-url" aria-describedby="basic-addon3" />
                 </InputGroup>


                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control type="file" />
                </Form.Group> 
                <Button variant="primary" type="submit">Submit </Button>
               
            </Form>
        </div>
    )
}


export default Raise