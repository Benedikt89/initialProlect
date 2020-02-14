import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ContactForm from "./ContactForm";
import "./HomePage.css";
import MapComponent from "./MapComponent";
import {connect} from "react-redux";
import {deleteContact, getLatLng} from "../reducer/requests";
import {I_contact, I_formContact} from "../contacts-types";
import {getContacts} from "../reducer/actions";
import {AppStateType} from "../../redux/store";
import Contact from "./Contact";

const ContactsPage:React.FC = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openMapModal, setOpenMapModal] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [loc, setLoc] = useState({
        lat: 0,
        lng: 0,
    });
    const [selectedContact, setSelectedContact] = useState();
    const [contacts, setContacts] = useState([]);
    const openModal = () => {
        setOpenAddModal(true);
    };
    const closeModal = () => {
        setOpenAddModal(false);
        setOpenEditModal(false);
        setOpenMapModal(false);
        getData();
    };
    const cancelAddModal = () => {
        setOpenAddModal(false);
    };
    const editContact = (contact: I_contact) => {
        setSelectedContact(contact);
        setOpenEditModal(true);
    };
    const cancelEditModal = () => {
        setOpenEditModal(false);
    };
    const getData = () => {
        getContacts();
        setInitialized(true);
    };
    const deleteSelectedContact = async (id: string) => {
        await deleteContact(id);
        getData();
    };
    const openMap = async (contact: I_contact) => {
        try {
            const address = `${contact.address}, ${contact.city}, ${contact.country}`;
            const response = await getLatLng(address);
            const loc = response.data.results[0].geometry.location;
            setLoc(loc);
            setOpenMapModal(true);
        } catch (ex) {
            console.log(ex);
        }
    };
    useEffect(() => {
        if (!initialized) {
            getData();
        }
    });
    return (
        <div className="home-page">
            <h1>Contacts</h1>
            <Modal show={openAddModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContactForm
                        edit={false}
                        onSave={closeModal}
                        onCancel={cancelAddModal}
                        addContact={(c) => {console.log(c)}}
                    />
                </Modal.Body>
            </Modal>
            <Modal show={openEditModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContactForm
                        edit={true}
                        onSave={closeModal}
                        contact={selectedContact}
                        addContact={(c) => {console.log(c)}}
                        onCancel={cancelEditModal}
                    />
                </Modal.Body>
            </Modal>
            <Modal show={openMapModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Map</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MapComponent
                        lat={loc.lat}
                        lng={loc.lng}
                    />
                </Modal.Body>
            </Modal>
            <ButtonToolbar onClick={openModal}>
                <Button variant="outline-primary">Add Contact</Button>
            </ButtonToolbar>
            <br />
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Postal Code</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Map</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {contacts && contacts.map((c, i) => <Contact
                    key={i+'cont'}
                    contact={c}
                    openMap={openMap}
                    editContact={editContact}
                    deleteSelectedContact={deleteSelectedContact}
                />)}
                </tbody>
            </Table>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        contacts: state.contacts
    };
};
export default connect(
    mapStateToProps,
    { getContacts }
)(ContactsPage);