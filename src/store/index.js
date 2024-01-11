import { createStore, bindActionCreator } from '../lib/redux';

function reducer(state, action) {
    switch (action.type) {
        case 'increase':
            return { ...state, count: state.count + 1 };
        case 'add':
            return { ...state, count: state.count + action.payload };
        default:
            return state;
    }
}

const initState = { count: 1 };
const store = createStore(reducer, initState);

export default store;
