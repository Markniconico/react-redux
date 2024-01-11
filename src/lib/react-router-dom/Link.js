import { parsePath } from 'history';
import context from '../react-router/RouterContext';

export default function Link(props) {
    const { to, ...rest } = props;
    return (
        <context.Consumer>
            {(value) => {
                let location;
                if (typeof to === 'object') {
                    location = to;
                } else {
                    //字符串
                    //将props.to转换为location对象
                    location = parsePath(to);
                }
                const href = value.history.createHref(location);
                return (
                    <a
                        href={href}
                        {...rest}
                        onClick={(e) => {
                            e.preventDefault();
                            value.history.push(location);
                        }}>
                        {props.children}
                    </a>
                );
            }}
        </context.Consumer>
    );
}
