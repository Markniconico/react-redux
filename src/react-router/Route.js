import React, { Component } from 'react';
import context from './RouterContext';
import pathMatch from './matchPath';

export default class Route extends Component {
    /**
    path:路径规则，可以是字符串，可以是字符串数组
    children:无论是否匹配，都应该渲染的子元素
    render:匹配成功后，渲染函数
    component:匹配成功后，渲染的组件

    以下是调用matchPath方法时的配置
    exact
    strict
    sensitive
    */

    //源码不是在这里设置默认值的，是在function matchRoute中设置this.props.path || '/'；
    static defaultProps = {
        path: '/',
    };

    matchRoute = (location) => {
        const { exact = false, strict = false, sensitive = false } = this.props;
        return pathMatch(this.props.path || '/', location.pathname, { exact, strict, sensitive });
    };

    consumerFunc = (value) => {
        const ctxValue = {
            history: value.history,
            location: value.location,
            match: this.matchRoute(value.location),
        };

        return (
            <context.Provider value={ctxValue}>{this.renderChildren(ctxValue)}</context.Provider>
        );
    };

    /**
     * 在上下文提供者内部渲染内容
     */
    renderChildren = (ctx) => {
        //children有值，优先显示children，不管匹配与否
        if (this.props.children !== undefined && this.props.children !== null) {
            if (typeof this.props.children === 'function') {
                return this.props.children(ctx);
            } else {
                return this.props.children;
            }
        }
        //没有匹配，不渲染
        if (!ctx.match) return;
        //render有值，渲染render
        if (typeof this.props.render === 'function') {
            return this.props.render(ctx);
        }
        //component有值，渲染component
        if (this.props.component) {
            const Component = this.props.component;
            return <Component {...ctx} />;
        }
        //都没有值，渲染null
        return null;
    };

    render() {
        return <context.Consumer>{this.consumerFunc}</context.Consumer>;
    }
}
