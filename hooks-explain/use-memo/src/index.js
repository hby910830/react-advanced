import React from "react";
import ReactDOM from "react-dom";

function App() {
	const [n, setN] = React.useState(0);
	const [m, setM] = React.useState(0);
	const onClick = () => {
		setN(n + 1);
	};

	return (
		<div className="App">
			<div>
				{/*点击button会重新执行Child组件*/}
				<button onClick={onClick}>update n {n}</button>
			</div>
			<Child data={m}/>
		</div>
	);
}

const Child = React.memo(props => {
		console.log("child 执行了");
		console.log('假设这里有大量代码')
		return <div>child: {props.data}</div>;
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
