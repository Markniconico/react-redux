import React, { PureComponent } from 'react';
import { bindActionCreator } from '../redux';
import ctx from './ctx';

export default function connect(mapStateToProps, mapDispatchToProps) {
    return function (Comp) {
        // 返回一个高阶组件
        class Temp extends PureComponent {
            static contextType = ctx;

            //得到需要传递的事件处理props
            getEventHandlers() {
                if (typeof mapDispatchToProps === 'function') {
                    return mapDispatchToProps(this.store.dispatch);
                } else if (typeof mapDispatchToProps === 'object') {
                    /**
                     * 还可以传递对象，对象的属性值是addCreator
                     * const addCreator = function (num) {
                     *    return {
                     *      type: 'add',
                     *      payload: num,
                     *    };
                     * };
                     *
                     * {
                     *    addCreator,
                     *    test: addCreator,
                     * }
                     */
                    return bindActionCreator(mapDispatchToProps, this.store.dispatch);
                }
            }
            constructor(props, context) {
                super(props, context);
                this.store = this.context;
                if (mapStateToProps) {
                    //状态中的数据，来自于仓库中映射的结果
                    this.state = mapStateToProps(this.store.getState(), this.props);
                    //监听仓库中的数据发生变化，得到一个取消监听的函数
                    this.unListen = this.store.subscribe(() => {
                        this.setState(mapStateToProps(this.store.getState(), this.props));
                    });
                }
                if (mapDispatchToProps) {
                    this.handlers = this.getEventHandlers();
                }
            }
            componentWillUnmount() {
                this.unListen && this.unListen(); //当组件卸载时，取消store监听
            }
            render() {
                return <Comp {...this.state} {...this.handlers} {...this.props} />;
            }
        }
        Temp.displayName = Comp.displayName || Comp.name; //调试工具内显示组件的名称
        return Temp;
    };
}
