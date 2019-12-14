import React from 'react';
import ReactDOM from 'react-dom';
function App(){
	console.log('app运行了')  //说明点击按钮setN会再次调用app()，重新渲染组建
	const [n, setN] = React.useState(0)
	return (
		<div className='App'>
			<p>{n}</p>
			<p>
				<button onClick={() => setN(n + 1)}>+1</button>
			</p>
		</div>
	)
}
ReactDOM.render(<App />, document.getElementById('root'))
