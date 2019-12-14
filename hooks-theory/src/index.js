import React from 'react';
import ReactDOM from 'react-dom';

let _state = [] //全局_state用来存储state的值，避免重新渲染的时候被myUseState重置为初始值
let index = 0
const myUseState = initialValue => {
	const currentIndex = index
	_state[currentIndex] = _state[currentIndex] === undefined ? initialValue : _state[currentIndex]
	const setState = newValue => {
		_state[currentIndex] = newValue
		render()
	}
	index += 1
	return [_state[currentIndex], setState]
}

const render = () => {
	index = 0
	ReactDOM.render(<App1 />, document.getElementById('root'))
}

function App1(){
	const [n, setN] = myUseState(0)
	const [m, setM] = myUseState(0)
	return (
		<div className='App'>
			<p>{n}</p>
			<p>
				<button onClick={() => setN(n + 1)}>+1</button>
			</p>
			<p>{m}</p>
			<p>
				<button onClick={() => setM(m + 1)}>+1</button>
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
