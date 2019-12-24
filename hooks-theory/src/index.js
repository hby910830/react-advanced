import React from 'react';
import ReactDOM from 'react-dom';

function App(){
	const [n, setN] = React.useState(0)
	const log = () => setTimeout(() => console.log(`n: ${n}`), 3000)
	return (
		<div className='App'>
			<p>{n}</p>
			<p>
				<button onClick={() => setN(n + 1)}>+1</button>
				<button onClick={log}>log</button>
			</p>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
