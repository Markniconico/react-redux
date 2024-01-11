import { withRouter } from '../react-router';

function Test(props) {
    return (
        <>
            <h1>props text : {props.text}</h1>
            <div>
                <button
                    onClick={() => {
                        props.history.push('/a');
                    }}>
                    我也可以跳转啦
                </button>
            </div>
        </>
    );
}

const TestWrapper = withRouter(Test);

export default function TestWithRouter() {
    return (
        <>
            <h1>withRouter Text</h1>
            <TestWrapper text="给Test传递的内容" />
        </>
    );
}
