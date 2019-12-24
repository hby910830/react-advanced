import React from 'react';
import ReactDOM from 'react-dom';

function App(){
	const nRef = React.useRef(0); //{current: 0}
	const log = () => setTimeout(() => console.log(`n: ${nRef.current}`), 1000);
	// const [n, setN] = React.useState(null)  简化如下
	// const setN = React.useState(null)[1]    换个有意义的变量名如下
	const update = React.useState(null)[1]  //自己手动更新渲染App的关键代码
	return (
		<div className="App">
			<p>{nRef.current} 这里并不能实时更新</p>
			<p>
				{/*
				* 1.nRef.current并不会重新渲染App，因为React是函数式编程思想，不会帮你更新，我们只能自己手动更新
				* 2.自己造出一个update(nRef.current)
				*/
				}
				<button onClick={() => {nRef.current += 1; update(nRef.current)}}>+1</button>
				<button onClick={log}>log</button>
			</p>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'))
