import { Provider } from './lib/react-redux';
import Test from './pages/Test';
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <Test />
        </Provider>
    );
}

export default App;
