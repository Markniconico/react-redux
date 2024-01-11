import context from './RouterContext';

export default function widthRouter(Comp) {
    function RouterWrapper(props) {
        return (
            <context.Consumer>
                {(value) => {
                    return <Comp {...props} {...value} />;
                }}
            </context.Consumer>
        );
    }
    //设置组件在调试工具中显示的名字
    RouterWrapper.displayName = `withRouter(${Comp.displayName || Comp.name})`;
    return RouterWrapper;
}
