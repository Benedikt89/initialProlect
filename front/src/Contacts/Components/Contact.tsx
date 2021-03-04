import React from "react";
import {I_contact} from "../contacts-types";
import {Button} from "antd";

interface I_props {
    contact: I_contact,
    openMap: (contact: I_contact) => void,
    editContact: (contact: I_contact) => void,
    deleteSelectedContact: (id: string) => void,
}
const Contact: React.FC<I_props> = ({contact, openMap, editContact, deleteSelectedContact}) => {

    return (
        <tr key={contact.id}>
            <td>{contact.firstName}</td>
            <td>{contact.lastName}</td>
            <td>{contact.address}</td>
            <td>{contact.city}</td>
            <td>{contact.country}</td>
            <td>{contact.postalCode}</td>
            <td>{contact.phone}</td>
            <td>{contact.email}</td>
            <td>{contact.age}</td>
            <td>
                <Button
                    type="primary"
                    onClick={ () => {openMap(contact)} }
                >
                    Map
                </Button>
            </td>
            <td>
                <Button
                    type="primary"
                    onClick={ () => {editContact(contact)} }
                >
                    Edit
                </Button>
            </td>
            <td>
                <Button
                    type="primary"
                    onClick={ () => {deleteSelectedContact(contact.id)} }
                >
                    Delete
                </Button>
            </td>
        </tr>
    )
};

export default Contact;