import React, { useState } from 'react';
import './NavBar.css'
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Logout from '../Logout/Logout';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';



const NavBar = () => {

    const history = useHistory()
    const userId = useSelector(state => state.auth.id)
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const toggleTrueFalse = () => {
        setShowModal(handleShow)
    }

    const routeChangeProfile = () => {
        history.push(`my/profile/${userId}`)
    }

    const routeChangeHome = () => {
        history.push('/')
    }

    const routeChangeExplore = () => {
        history.push('/explore')
    }

    const routeChangeUpload = () => {
    }

    const UploadModal = (props) => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>testing modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    this is the modal body
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )

    }

    return (
        <div className='navbar'>
            <div className='navbar__name'>
                Hitstagram
            </div>
            <div className='navbar__buttons'>
                <div className='navbar__homeBtn'>
                    <HomeIcon className='homeIcon' onClick={routeChangeHome} />
                </div>
                <div className='navbar__exploreBtn'>
                    <ExploreIcon className='exploreIcon' onClick={routeChangeExplore} />
                </div>
                <div className='navbar__uploadBtn'>
                    <AddAPhotoIcon className='photoIcon' onClick={toggleTrueFalse} />
                </div>
                <div className='navbar__profileBtn'>
                    <AccountCircleIcon className='accountIcon' onClick={routeChangeProfile} />
                </div>
                <div className='navbar__logoutBtn'>
                    <Logout />
                </div>
            </div>
        </div>
    )
}

export default NavBar;
