import React, {useEffect, useLayoutEffect} from 'react';
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

ReactDOM.render(<App/>, document.getElementById('root'));
