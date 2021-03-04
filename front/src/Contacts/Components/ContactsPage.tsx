import React from 'react';
import { Router, Route, Link } from "react-router-dom";
import Contacts from './Contacts';
import {Menu} from "antd";
import SubMenu from "antd/lib/menu/SubMenu";


function ContactsPage({history}: any) {
    return (
        <div className="App">
            <Router history={history}>
                <Menu >
                    <Menu.Item>Address Book App</Menu.Item>
                    <Menu.Item aria-controls="basic-navbar-nav" />
                    <SubMenu key="sub1">
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4"><Link to={"/"}>Home</Link></Menu.Item>
                    </SubMenu>
                </Menu>
                <Route path="/contacts" exact component={Contacts} />
            </Router>
        </div>
    );
}
export default ContactsPage;