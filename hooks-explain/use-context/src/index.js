import React, {createContext, useContext, useState} from "react";
import ReactDOM from "react-dom";

const C = createContext(null)

function App(){
	const [n, setN] = useState(0)
	return (
		<C.Provider value={{n, setN}}>
			<div className='App'>
				<Baba />
			</div>
		</C.Provider>
	)
}

function Baba(){
	const {n} = useContext(C)
	return (
		<div>我是爸爸 n: {n} <Child/></div>
	)
}

function Child(){
	const {n, setN} = useContext(C)
	const onClick = () => {
		setN( i => i + 1)
	}
	return (
		<div>
			我是儿子 我得到 n: {n}
			<button onClick={onClick}>+1</button>
		</div>
	)
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
