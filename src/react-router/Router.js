import React, { Component } from 'react';
import PropTypes from 'prop-types';
import context from './RouterContext';
import pathMatch from './matchPath';

export default class Router extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
    };

    state = {};

    componentDidMount() {
        this.unListen = this.props.history.listen((location, action) => {
            // this.props.history.action = action;
            this.setState({});
        });
    }

    componentWillUnmount() {
        this.unListen();
    }

    render() {
        console.log('root router render');
        const ctxValue = {
            history: this.props.history,
            location: this.props.history.location,
            match: pathMatch('/', this.props.history.location.pathname),
        };

        return <context.Provider value={ctxValue}>{this.props.children}</context.Provider>;
    }
}
