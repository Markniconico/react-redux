import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { bindActionCreator } from '../redux';
import ctx from './ctx';

/**简单浅比较连个对象相等 */
function compare(obj1, obj2) {
    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}

export default function connect(mapStateToProps, mapDispatchToProps) {
    return function (Comp) {
        function Temp(props) {
            const store = useContext(ctx); //从上下文中拿到仓库
            const [state, setState] = useState(
                mapStateToProps && mapStateToProps(store.getState())
            );

            useEffect(() => {
                return store.subscribe(() => {
                    let newState = mapStateToProps && mapStateToProps(store.getState());
                    setState((prevState) => {
                        //优化点，相等设置的还是返回，不会触发重新渲染
                        if (compare(newState, prevState)) {
                            return prevState;
                        } else {
                            return newState;
                        }
                    });
                });
            }, [store]);

            /**
             * 得到需要传递的事件处理props
             */
            function getEventHandlers() {
                if (typeof mapDispatchToProps === 'function') {
                    return mapDispatchToProps(store.dispatch);
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
                    return bindActionCreator(mapDispatchToProps, store.dispatch);
                }
            }

            var handlers = {};
            if (mapDispatchToProps) {
                handlers = getEventHandlers();
            }
            return <Comp {...state} {...handlers} {...props} />;
        }
        Temp.displayName = Comp.displayName || Comp.name; //调试工具内显示组件的名称
        return Temp;
    };
}
