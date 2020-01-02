import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

function App() {
	const [value, setValue] = React.useState(0)
	// useEffect(() => {
	// 	// 页面会闪一下，会快速把 value: 0 变成 value: 1000
	// 	document.getElementById('x').innerText = 'value: 1000'
	// }, [value])
	useLayoutEffect(() => {
		// 页面不会闪，直接变成 value: 1000
		document.getElementById('x').innerText = 'value: 1000'
	}, [value])
	return (
		<div id='x' onClick={() => setValue(0)}>value: {value}</div>
	);
}

function App1() {
	const [n, setN] = useState(0)
	const time = useRef(null)
	const onClick = () => {
		setN(i => i + 1)
		time.current = performance.now()
	}
	useLayoutEffect(() => {
		if (time.current) {
			console.log(performance.now() - time.current) //大概是0.7ms
		}
	})
	useEffect(() => {
		if (time.current) {
			console.log(performance.now() - time.current) //大概是2.7ms
		}
	})
	return (
		<div className="App">
			<h1>n: {n}</h1>
			<button onClick={onClick}>Click</button>
		</div>
	);
}

/* useLayoutEffect比useEffect先执行 */
function App2() {
	const [n, setN] = useState(0)
	const onClick = () => {
		setN(i => i + 1)
	}
	//执行顺序打印出 2、3、1
	useEffect(() => {
		console.log(1)
	})
	useLayoutEffect(() => {
		console.log(2)
	})
	useLayoutEffect(() => {
		console.log(3)
	})
	return (
		<div className="App">
			<h1>n: {n}</h1>
			<button onClick={onClick}>Click</button>
		</div>
	);
}

ReactDOM.render(<App2/>, document.getElementById('root'));
