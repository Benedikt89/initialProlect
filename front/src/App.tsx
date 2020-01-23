import React from 'react';
import store from "./redux/store";
import './App.css';
import Main from "./App/Main";
import {BrowserRouter as Router,} from "react-router-dom";
import {Provider} from "react-redux";

const App: React.FC = () => {
    return (
        <div className="App">
            <Router basename={process.env.PUBLIC_URL}>
                <Provider store={store}>
                    <Main/>
                </Provider>
            </Router>
        </div>
    );
};

export default App;
