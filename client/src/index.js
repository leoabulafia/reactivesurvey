import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import App from './components/App';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

//General styles
require('./index.css');

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#003d82'
		},
		secondary: {
			main: '#e53935'
		}
	}
});

const store = createStore(reducers, {}, applyMiddleware(logger, reduxThunk));

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);
