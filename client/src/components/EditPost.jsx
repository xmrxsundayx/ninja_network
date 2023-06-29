import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function EditPost({ postList, setPostList, postId }) {
    const [show, setShow] = useState(false);
    const [post, setPost] = useState(null);
    const [file, setFile] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        if (postId) {
            // Fetch the specific post by ID using Axios
            axios.get(`/api/post/${postList._id}`, { withCredentials: true })
                .then(response => {
                    setPost(response.data);
                    setFile(response.data.file);
                    setText(response.data.text);
                    console.log("this is the post", response.data);
                })
                .catch(error => {
                    console.error('Error fetching post:', error);
                });
        }
    }, [postId]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = () => {
        // Update the post data using Axios
        axios.patch(`/api/posts/update/${postList._id}`, postList, { withCredentials: true })
            .then(response => {
                console.log('Post updated successfully:', response.data);
                // Perform any necessary actions after successful update
                // For example, you can fetch the updated post list or display a success message
                handleClose();
            })
            .catch(error => {
                console.error('Error updating post:', error);
            });
    };

    return (
        <>
            <Button
                type='button'
                className='btn-outline me-2'
                onClick={handleShow}
            >
                <i className='fas fa-edit'></i>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group id="editPost" controlId="formFileMultiple" className="mb-3">
                        <Form.Label>File</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            value={file}
                            onChange={e => setFile(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditPost;