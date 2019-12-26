import React from 'react';
import ReactDOM from 'react-dom';

// function App(){
// 	const [user, setUser] = React.useState({name: 'Jack', age: 18})
// 	const onClick = () =>{
// 		//setUser不可以局部更新，如果只改变其中一个，那么整个数据都会被覆盖
// 		// setUser({
// 		// 	name: 'Frank'
// 		// })
// 		setUser({
// 			...user, //拷贝之前的所有属性
// 			name: 'Frank' //这里的name覆盖之前的name
// 		})
// 	}
// 	return (
// 		<div className='App'>
// 			<h1>{user.name}</h1>
// 			<h2>{user.age}</h2>
// 			<button onClick={onClick}>Click</button>
// 		</div>
// 	)
// }

function App(){
	/*useState可以传对象，但是JS引擎会解析这个对象，计算9+9，造成多余的运算*/
	// const [user, setUser] = React.useState({name: 'Jack', age: 9 + 9})

	/* useState可以传一个函数，函数并不会执行，
	* 这样写的好处是JS只会在初始值的时候执行一次函数，
	* 之后就不会再看这个函数了
	* */
	const [user, setUser] = React.useState(() => ({name: 'Jack', age: 18}))
	const onClick = () =>{
		//setUser不可以局部更新，如果只改变其中一个，那么整个数据都会被覆盖
		// setUser({
		// 	name: 'Frank'
		// })
		setUser({
			...user, //拷贝之前的所有属性
			name: 'Frank' //这里的name覆盖之前的name
		})
	}
	return (
		<div className='App'>
			<h1>{user.name}</h1>
			<h2>{user.age}</h2>
			<button onClick={onClick}>Click</button>
		</div>
	)
}
ReactDOM.render(<App />, document.getElementById('root'));
