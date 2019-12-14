import React from 'react';
import ReactDOM from 'react-dom';

let _state //全局_state用来存储state的值，避免重新渲染的时候被myUseState重置为初始值
const myUseState = initialValue => {
	_state = _state === undefined ? initialValue : _state
	const setState = (newValue) => {
		_state = newValue
		render()
	}
	return [_state, setState]
}

const render = () => {
	ReactDOM.render(<App1 />, document.getElementById('root'))
}

function App1(){
	const [n, setN] = myUseState(0)
	return (
		<div className='App'>
			<p>{n}</p>
			<p>
				<button onClick={() => setN(n + 1)}>+1</button>
			</p>
		</div>
	)
}

// function App(){
// 	console.log('app运行了')  //说明点击按钮setN会再次调用app()，重新渲染组建
// 	const [n, setN] = React.useState(0)
// 	return (
// 		<div className='App'>
// 			<p>{n}</p>
// 			<p>
// 				<button onClick={() => setN(n + 1)}>+1</button>
// 			</p>
// 		</div>
// 	)
// }
ReactDOM.render(<App1 />, document.getElementById('root'))
