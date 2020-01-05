import React from "react";
import ReactDOM from "react-dom";

function App() {
	const [n, setN] = React.useState(0);
	const [m, setM] = React.useState(0);
	const onClick = () => {
		setN(n + 1);
	};
	const onClickChild = () => {}
	return (
		<div className="App">
			<div>
				{/*点击button会重新执行Child组件*/}
				<button onClick={onClick}>update n {n}</button>
			</div>
			{/*但是如果传了一个引用，则React.memo无效。因为引用是不相等的*/}
			<Child data={m} onClick={onClickChild}/>
		</div>
	);
}

//使用React.memo可以解决重新执行Child组件的问题
const Child = React.memo(props => {
		console.log("child 执行了");
		console.log('假设这里有大量代码')
		return <div onClick={props.onClick}>child: {props.data}</div>;
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
