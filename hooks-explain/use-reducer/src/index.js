import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';

const initial = {n: 0};
const reducer = (state, action) => {
	if (action.type === "add") {
		return {n: state.n + 1};
	} else if (action.type === "multi") {
		return {n: state.n * 2};
	} else {
		throw new Error("unknown type");
	}
};

function App() {
	const [state, dispatch] = useReducer(reducer, initial);
	const {n} = state
	const onClick = () => {
		dispatch({type: "add"});
	};
	return (
		<div className="App">
			<h1>n: {n}</h1>
			<button onClick={onClick}>+1</button>
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);