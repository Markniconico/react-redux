import { Route } from '../react-router-dom';
import { Switch } from '../react-router';

export default function SwitchTest() {
    return (
        <Switch>
            {/**只会显示第一个匹配的元素 */}
            <Route path="/switch" render={() => <h1>Switch A</h1>} />
            <Route path="/switch">
                <h1>Switch B</h1>
            </Route>
            <Route path="/switch" render={() => <h1>Switch C</h1>} />
        </Switch>
    );
}
