import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        background: '#9ae7d9'
    },
    typography: {
        fontFamily: 'tradeGothicNextLTPro-Bd',
        caption: {
            fontFamily: "tradeGothicNextLTPro-Bd"
        },
        title: {
            fontFamily: "tradeGothicNextLTPro-Bd",
            color: 'var(--main-text-color)',
            fontSize: "1.2em"
        },
        subheading: {
            fontFamily: "tradeGothicNextLTPro-Lt",
            color: 'var(--main-text-color)',
        }
    },
});


const AppWrapper = () => (
    < MuiThemeProvider theme={ theme } >
        <App/>
    </ MuiThemeProvider >
);

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
registerServiceWorker();
