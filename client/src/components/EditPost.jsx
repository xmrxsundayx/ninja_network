import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EditPost() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    
    return (
        <>
            <button
                type='button'
                className='btn btn-outline me-2'
                onClick={handleShow}>
                <i className='fas fa-edit'></i>
                Edit
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group id="editPost" controlId="formFileMultiple" className="mb-3">
                        <Form.Label>File</Form.Label>
                        <Form.Control type="file" multiple />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button form="editPost" type="submit" onClick={handleClose} className="btn btn-primary">Save Changes</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditPost;