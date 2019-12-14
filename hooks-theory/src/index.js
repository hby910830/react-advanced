import React from 'react';
import ReactDOM from 'react-dom';

let _state = [] //全局_state用来存储state的值，避免重新渲染的时候被myUseState重置为初始值
let index = 0   //重要声明
const myUseState = initialValue => {
	const currentIndex = index   //重要声明
	_state[currentIndex] = _state[currentIndex] === undefined ? initialValue : _state[currentIndex]
	const setState = newValue => {
		_state[currentIndex] = newValue
		render()
	}
	index += 1
	return [_state[currentIndex], setState]
}

const render = () => {
	index = 0   //重要的重置
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

function App(){
	console.log('app运行了')  //说明点击按钮setN会再次调用app()，重新渲染组建
	const [n, setN] = React.useState(0)
	let m, setM
	if(n % 2 === 1){
		/* error:
			* React Hook "React.useState" is called conditionally.
			* React Hooks must be called in the exact same order in every component render
			*原因： 因为useState内部原理是把state声明成一个数组，需要顺序一一对应，如App1
		 */
		[m, setM] = React.useState(0)
	}
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
ReactDOM.render(<App />, document.getElementById('root'))
