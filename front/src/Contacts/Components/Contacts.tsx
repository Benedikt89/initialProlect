import React, {useEffect, useState} from "react";
import ContactForm from "./ContactForm";
import "../../App.css";
import MapComponent from "./MapComponent";
import {connect} from "react-redux";
import {getLatLng} from "../reducer/requests";
import {I_contact, I_formContact} from "../contacts-types";
import {deleteContact, getContacts, addContact, editContact} from "../reducer/actions";
import {AppStateType} from "../../redux/store";
import Contact from "./Contact";
import {RouteComponentProps} from "react-router";
import {Button, Modal, Table} from "antd";

interface I_connectedProps {
    contacts: Array<I_contact> | []
}

interface I_dispatchedProps {
    deleteContact: (id: string) => void,
    getContacts: () => void,
    addContact: (contact: I_formContact) => void,
    editContact: (contact: I_contact) => void
}

interface I_ContactsProps extends I_connectedProps, I_dispatchedProps, RouteComponentProps<{}> {
}

const ContactsPage: React.FC<I_ContactsProps> = ({contacts, getContacts, deleteContact, addContact, editContact}) => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openMapModal, setOpenMapModal] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [loc, setLoc] = useState({
        lat: 0,
        lng: 0,
    });
    const [selectedContact, setSelectedContact] = useState<I_contact | null>(null);

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
    const editModeContact = (contact: I_contact) => {
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
    const deleteSelectedContact = (id: string) => {
        deleteContact(id);
    };

    const openMap = async (contact: I_contact) => {
        try {
            const address = `${contact.city}, ${contact.country}`;
            const response = await getLatLng(address);
            const loc = response.data.results[0].geometry.location;
            setLoc(loc);
            setOpenMapModal(true);
        } catch (ex) {
            console.log(ex);
        }
    };
    let getRandom = () => Math.floor(Math.random() * 105);
    let randomData = {
        firstName: `string${getRandom()}`,
        lastName: `string${getRandom()}`,
        address: `Minsk`,
        city: `Minsk`,
        region: `Minsk`,
        country: `Belarus`,
        postalCode: `220000`,
        phone: `${getRandom()}`,
        email: `string${getRandom()}@tut.by`,
        age: 22
    };
    const addRandom = () => {
        addContact(randomData);
    };

    useEffect(() => {
        if (!initialized) {
            getData();
        }
    });

    // @ts-ignore
    let dispayedContacts = contacts.length ? contacts.map((c: I_contact) => <Contact
        key={c.id + 'cont'}
        contact={c}
        openMap={openMap}
        editContact={editModeContact}
        deleteSelectedContact={deleteSelectedContact}
    />) : <h2>NoContacts</h2>;

    return (
        <div className="home-page">
            <h1>Contacts</h1>
            <Modal visible={openAddModal} afterClose={closeModal} okText="Add Contact">
                <ContactForm
                    edit={false}
                    onSave={closeModal}
                    onCancel={cancelAddModal}
                    addContact={(c) => {
                        addContact(c)
                    }}
                />
            </Modal>
            <Modal visible={openEditModal} afterClose={closeModal} okText="Edit Contact">
                <ContactForm
                    edit={true}
                    onSave={closeModal}
                    contact={selectedContact}
                    addContact={(c) => {
                        editContact({...c, id: selectedContact?.id || ''})
                    }}
                    onCancel={cancelEditModal}
                />
            </Modal>
            <Modal visible={openMapModal} okText="Map" afterClose={closeModal}>
                <MapComponent
                    lat={loc.lat}
                    lng={loc.lng}
                />
            </Modal>
            <Button onClick={openModal}>Add Contact</Button>
            <br/>
            <Table bordered>
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
                {dispayedContacts}
                </tbody>
            </Table>
            <Button onClick={addRandom}>addRandom</Button>
        </div>
    );
};

const mapStateToProps = (state: AppStateType) => {
    return {
        contacts: state.contacts.constacts
    };
};


let ComposedComponent = connect(
    mapStateToProps,
    {getContacts, deleteContact, addContact, editContact}
)(ContactsPage);

export default ComposedComponent;