import React from 'react';
import { Router, Route, Link } from "react-router-dom";
import Contacts from './Contacts';
import { createBrowserHistory as createHistory } from 'history'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

const history = createHistory();

function ContactsPage() {
    return (
        <div className="App">
            <Router history={history}>
                <Navbar bg="primary" expand="lg" variant="dark" >
                    <Navbar.Brand href="#home">Address Book App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Route path="/contacts" exact component={Contacts} />
            </Router>
        </div>
    );
}
export default ContactsPage;