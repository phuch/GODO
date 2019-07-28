import React from 'react';
import RootNavigator from './navigators/RootNavigator';
import configureStore from './configure-store';
import { Provider } from 'react-redux';

const store = configureStore();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RootNavigator />
            </Provider>
        );
    }
}


