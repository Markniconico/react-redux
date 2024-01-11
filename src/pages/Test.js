import { connect } from '../lib/react-redux';
// import connect from '../lib/react-redux/connect-hook';

function mapStateTpProps(state) {
    return {
        count: state.count,
    };
}

/**
 * 方式1
 * mapDispatchToProp为函数
 */
// function mapDispatchToProps(dispatch) {
//     return {
//         onIncrease: function () {
//             dispatch({
//                 type: 'increase',
//             });
//         },
//     };
// }

const addCreator = function (num) {
    return {
        type: 'add',
        payload: num,
    };
};
/**
 * 方式2
 * mapDispatchToProps为对象
 */

const mapDispatchToProps = {
    onIncrease: function () {
        return { type: 'increase' };
    },
    addCreator,
    test: addCreator,
};

function Test(props) {
    return (
        <>
            <h1>计数：{props.count}</h1>
            <button onClick={() => props.onIncrease()}>+1</button>
            <button onClick={() => props.addCreator(5)}>+5</button>
        </>
    );
}

export default connect(mapStateTpProps, mapDispatchToProps)(Test);
