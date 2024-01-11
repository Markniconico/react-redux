import Link from './Link';
import pathMatch from '../react-router/matchPath';
import { parsePath } from 'history';
import context from '../react-router/RouterContext';

export default function NavLink(props) {
    const {
        className = 'active',
        exact = false,
        strict = false,
        sensitive = false,
        to,
        ...rest
    } = props;

    let loc = to;
    //将字符串转换成location对象
    if (typeof to === 'string') {
        loc = parsePath(to);
    }

    return (
        <context.Consumer>
            {({ location }) => {
                const isMatch = pathMatch(loc.pathname, location.pathname, {
                    exact,
                    strict,
                    sensitive,
                });
                if (isMatch) {
                    return <Link {...rest} to={to} className={className} />;
                } else {
                    return <Link {...rest} to={to} />;
                }
            }}
        </context.Consumer>
    );
}
