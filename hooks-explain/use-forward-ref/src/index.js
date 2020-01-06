import React, {useRef} from 'react';
import ReactDOM from 'react-dom';

function App(){
	const buttonRef = useRef(null)
	return (
		<div>
			<Button ref={buttonRef}>按钮</Button>
			{/* 控制台报错:
					Warning: Function components cannot be given refs.
				  Attempts to access this ref will fail.
				  Did you mean to use React.forwardRef()?
			  */}
		</div>
	)
}

const Button = (props) => {
	console.log(props) // {ref: undefined, children: "按钮"}
	return <button {...props} />
}

ReactDOM.render(<App />, document.getElementById('root'));
