import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import Store from './store'

import { BrowserRouter as Router } from "react-router-dom"

// Reduceria ei ole tarkoitus kutsua koskaan suoraan sovelluksen koodista. Reducer ainoastaan annetaan parametrina storen luovalle createStore-funktiolle
// Store käyttää nyt reduceria käsitelläkseen actioneja, jotka dispatchataan eli "lähetetään" storelle sen dispatch-metodilla

import Container from '@material-ui/core/Container'

ReactDOM.render(
    <Provider store={Store}>
        <Router>
            <Container>
                <App />
            </Container>
        </Router>
    </Provider>,
    document.getElementById('root')
  )