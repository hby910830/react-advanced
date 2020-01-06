import React, {forwardRef, useRef} from 'react';
import ReactDOM from 'react-dom';

function App(){
	const buttonRef = useRef(null)
	return (
		<div>
			{/*<Button ref={buttonRef}>按钮</Button>*/}
			{/* 控制台报错:
					Warning: Function components cannot be given refs.
				  Attempts to access this ref will fail.
				  Did you mean to use React.forwardRef()?
			  */}
			<Button2 ref={buttonRef}>按钮</Button2>
		</div>
	)
}

// const Button = (props) => {
// 	console.log(props) // {ref: undefined, children: "按钮"}
// 	return <button {...props} />
// }

const Button2 = forwardRef((props, ref) => {
	console.log(ref)  //可以拿到ref对button的引用，forwardRef仅限于函数组件，class 组件是默认可以使用 ref 的
	return <button ref={ref} {...props} />;
})

ReactDOM.render(<App />, document.getElementById('root'));
