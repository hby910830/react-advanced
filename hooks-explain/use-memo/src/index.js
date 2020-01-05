import React, {useCallback, useMemo} from "react";
import ReactDOM from "react-dom";

function App() {
	const [n, setN] = React.useState(0);
	const [m, setM] = React.useState(0);
	const onClick = () => {
		setN(n + 1);
	};
	const onClick1 = () => {
		setM(m + 1);
	};
	const onClickChild = () => {}

	//这是一个返回函数的函数
	// const onClickChild1 = useMemo(() => {
	// 	return () => {
	// 		console.log(`on click child m: ${m}`)
	// 	}
	// }, [m])

	//可以使用useCallback,这是useMemo的语法糖
	const onClickChild1 = useCallback( () => {
		console.log(`on click child m: ${m}`)
	}, [m])
	return (
		<div className="App">
			<div>
				{/*点击button会重新执行Child组件*/}
				<button onClick={onClick}>update n {n}</button>
				<button onClick={onClick1}>update m {m}</button>
			</div>
			{/*但是如果传了一个引用，则React.memo无效。因为引用是不相等的*/}
			{/*<Child data={m} onClick={onClickChild}/>*/}
			{/*onClickChild1使用useMemo可以消除此bug*/}
			<Child data={m} onClick={onClickChild1}/>
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
