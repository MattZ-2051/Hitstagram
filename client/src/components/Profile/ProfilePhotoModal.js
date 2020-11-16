import React from 'react';
import { Button, Row, Col, Form, Container } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import './ProfilePhotoModal.css';

const ProfilePhotoModal = (props) => {

    return (
        <Modal {...props} className='modal' size='sm' aria-labelledby="contained-modal-title-vcenter" autoFocus={true} centered enforceFocues={true}>
            <Modal.Title id="contained-modal-title-vcenter">
                Change Profile Pic
        </Modal.Title>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <Col xs={12} md={12}>
                            <button type='submit'>Upload</button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProfilePhotoModal
