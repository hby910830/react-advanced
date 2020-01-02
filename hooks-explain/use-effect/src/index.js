import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

function App(){
	const [n, setN] = React.useState(0)
	const onClick = ()=>{
		setN(i=>i+1)
	}
	/*副作用：对环境的改变叫做副作用*/
	useEffect(() => {
		console.log('第一次渲染执行这句话')
	}, [])  // [] 里面的变量变化时执行 => 不会执行
	useEffect(() => {
		console.log('n变化时执行这句话')
	}, [n]) // n 变化时执行
	useEffect(() => {
		console.log('任何一个state变化时都会执行')
	})
	//组件消灭时 return 一个函数，函数里面写 componentWillUnmount 的操作
	// useEffect(() => {
	// 	const id = setInterval(() => {
	// 		console.log('hi')
	// 	}, 1000)
	// 	return () => {
	// 		setTimeout(() => {
	// 			window.clearInterval(id)
	// 		}, 10000)
	// 	}
	// })
	return (
		<div className="App">
			<h1>n: {n}</h1>
			<button onClick={onClick}>+1</button>
		</div>
	);
}
ReactDOM.render(<App />, document.getElementById('root'));
