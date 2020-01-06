import React from 'react';
import ReactDOM from 'react-dom';
import useList from './hooks/useList'

function App(){
	const {list, setList} = useList()
	return (
		<div>
			<h1>List</h1>
			{
				list ? (
					<ol>
						{
							list.map(item => {
								return <li key={item.id}>{item.name}</li>
							})
						}
					</ol>
				):(
					'加载中...'
				)
			}
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));
