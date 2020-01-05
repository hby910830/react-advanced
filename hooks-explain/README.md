# React Hooks 详解
![image.png](https://upload-images.jianshu.io/upload_images/1181204-9839ed98980d16e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# useState
- 使用状态
```
const [n, setN] = React.useState(0)
const [user, setUser] = React.useState({name: 'Jack', age: 18})
```
- 注意事项1: 不可局部更新
> 如果state是一个对象，能否部分setState？
>
> 答案是不行，因为setState不会帮我们合并属性
>
> 那么useReducer会合并属性吗？也不会！
>
> 因为React认为这应该是你自己要做的事情

```
function App(){
	const [user, setUser] = React.useState({name: 'Jack', age: 18})
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
```
- 注意事项2: 地址要变
> setState(obj) 如果obj地址不变，那么React就认为数据没有变化，不会更新视图

# useState (续)
- useState接受函数
> const [state, setState] = useState(() => {return initialState})
>
> 该函数返回初始state，且只执行一次

![image.png](https://upload-images.jianshu.io/upload_images/1181204-847c88e97b248f75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- setState接受函数
> setN(i => i + 1)
>
> 如果你能接受这种形式，应该优先使用这种形式

![image.png](https://upload-images.jianshu.io/upload_images/1181204-84c1120b032902ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# useReducer
- 用来践行Flux/Redux思想
> 看代码，分四步走
>
> 一、创建初始值 initialState
>
> 二、创建所有操作 reducer(state, action);
>
> 三、传给 userReducer，得到读和写 API
>
> 四、调用写({type: '操作类型'})
>
> 总的来说，useReducer 是 useState 的复杂版

![image.png](https://upload-images.jianshu.io/upload_images/1181204-04fcd86511ef9b18.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 如何代替 Redux
- 步骤
> 一、将数据集中在一个 store 对象
> 
> 二、将所有操作集中在 reducer
> 
> 三、创建一个 Context
> 
> 四、创建对数据的读取 API
> 
> 五、将第四步的内容放到第三步的 Context
> 
> 六、用 Context.Provider 将 Context 提供给所有组件
> 
> 七、各个组件用 useContext 获取读写API

```
import React, { useReducer, useContext, useEffect } from "react";
import ReactDOM from "react-dom";

const store = {
	user: null,
	books: null,
	movies: null
};

function reducer(state, action) {
	switch (action.type) {
		case "setUser":
			return { ...state, user: action.user };
		case "setBooks":
			return { ...state, books: action.books };
		case "setMovies":
			return { ...state, movies: action.movies };
		default:
			throw new Error();
	}
}

const Context = React.createContext(null);

function App() {
	const [state, dispatch] = useReducer(reducer, store);

	const api = { state, dispatch };
	return (
		<Context.Provider value={api}>
			<User />
			<hr />
			<Books />
			<Movies />
		</Context.Provider>
	);
}

function User() {
	const { state, dispatch } = useContext(Context);
	useEffect(() => {
		ajax("/user").then(user => {
			dispatch({ type: "setUser", user: user });
		});
	}, []);
	return (
		<div>
			<h1>个人信息</h1>
			<div>name: {state.user ? state.user.name : ""}</div>
		</div>
	);
}

function Books() {
	const { state, dispatch } = useContext(Context);
	useEffect(() => {
		ajax("/books").then(books => {
			dispatch({ type: "setBooks", books: books });
		});
	}, []);
	return (
		<div>
			<h1>我的书籍</h1>
			<ol>
				{state.books ? state.books.map(book => <li key={book.id}>{book.name}</li>) : "加载中"}
			</ol>
		</div>
	);
}

function Movies() {
	const { state, dispatch } = useContext(Context);
	useEffect(() => {
		ajax("/movies").then(movies => {
			dispatch({ type: "setMovies", movies: movies });
		});
	}, []);
	return (
		<div>
			<h1>我的电影</h1>
			<ol>
				{state.movies
					? state.movies.map(movie => <li key={movie.id}>{movie.name}</li>)
					: "加载中"}
			</ol>
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// 帮助函数

// 假 ajax
// 两秒钟后，根据 path 返回一个对象，必定成功不会失败
function ajax(path) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (path === "/user") {
				resolve({
					id: 1,
					name: "Frank"
				});
			} else if (path === "/books") {
				resolve([
					{
						id: 1,
						name: "JavaScript 高级程序设计"
					},
					{
						id: 2,
						name: "JavaScript 精粹"
					}
				]);
			} else if (path === "/movies") {
				resolve([
					{
						id: 1,
						name: "爱在黎明破晓前"
					},
					{
						id: 2,
						name: "恋恋笔记本"
					}
				]);
			}
		}, 2000);
	});
}
```

# useContext
- 上下文
```
全局变量是全局的上下文
上下文是局部的全局变量
```
- 使用方法
> 一、使用 C = createContext(initial) 创建上下文
> 
> 二、使用 <C.Provider> 圈定作用域
> 
> 三、在作用域内使用 useContext(C)来使用上下文

![image.png](https://upload-images.jianshu.io/upload_images/1181204-9f80bc95febe2374.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# useEffect
- 副作用 (API 名字叫得不好)
> 对环境的改变即为副作用，如修改 document.title
> 
> 但我们不一定非要把副作用放在 useEffect 里面
> 
> 实际上叫做 afterRender 更好，每次render后执行

- 用途
> 一、作为 componentDidMount 使用，[ ] 作第二个参数  
> 
> 二、作为 componentDidUpdate 使用，可指定依赖
> 
> 三、作为 componentWillUnmount 使用，通过 return
>
> 四、以上三种用途可同时存在

![image.png](https://upload-images.jianshu.io/upload_images/1181204-c7f2534c71d2f2ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 特点
> 如果同时存在多个 useEffect， 会按照出现次序执行

# useLayoutEffect
- 布局副作用
> useEffect 在浏览器渲染完成后执行
>
> useLayoutEffect 在浏览器渲染前执行

```
function App1() {
	const [n, setN] = useState(0)
	const time = useRef(null)
	const onClick = () => {
		setN(i => i + 1)
		time.current = performance.now()
	}
	useLayoutEffect(() => {
		if (time.current) {
			console.log(performance.now() - time.current) //大概是0.7ms
		}
	})
	useEffect(() => {
		if (time.current) {
			console.log(performance.now() - time.current) //大概是2.7ms
		}
	})
	return (
		<div className="App">
			<h1>n: {n}</h1>
			<button onClick={onClick}>Click</button>
		</div>
	);
}
```
![image.png](https://upload-images.jianshu.io/upload_images/1181204-00e766551f35e156.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 特点
> useLayoutEffect 总比 useEffect 先执行
> 
> useLayoutEffect 里的任务最好影响了 Layout

```
/* useLayoutEffect比useEffect先执行 */
function App2() {
	const [n, setN] = useState(0)
	const onClick = () => {
		setN(i => i + 1)
	}
	//执行顺序打印出 2、3、1
	useEffect(() => {
		console.log(1)
	})
	useLayoutEffect(() => {
		console.log(2)
	})
	useLayoutEffect(() => {
		console.log(3)
	})
	return (
		<div className="App">
			<h1>n: {n}</h1>
			<button onClick={onClick}>Click</button>
		</div>
	);
}
```

- 经验
> 为了用户体验，优先使用 useEffect (优先渲染)

# useMemo
- 要理解 React.useMemo
> 需要先讲 React.memo
> 
> React默认有多余的render

```
function App() {
	const [n, setN] = React.useState(0);
	const [m, setM] = React.useState(0);
	const onClick = () => {
		setN(n + 1);
	};

	return (
		<div className="App">
			<div>
				{/*点击button会重新执行Child组件*/}
				<button onClick={onClick}>update n {n}</button>
			</div>
			<Child data={m}/>
			{/* <Child2 data={m}/> */}
		</div>
	);
}

function Child(props) {
	console.log("child 执行了");
	console.log('假设这里有大量代码')
	return <div>child: {props.data}</div>;
}

const Child2 = React.memo(Child);
```
- 但是
> 这玩意有一个bug
>
> 添加了监听函数之后，一秒破功因为 App 运行时，会再次执行 onClickChild，生成新的函数
>
> 新旧函数虽然功能一样，但是地址引用不一样！
```
function App() {
	const [n, setN] = React.useState(0);
	const [m, setM] = React.useState(0);
	const onClick = () => {
		setN(n + 1);
	};
	const onClickChild = () => {}
	return (
		<div className="App">
			<div>
				{/*点击button会重新执行Child组件*/}
				<button onClick={onClick}>update n {n}</button>
			</div>
			{/*但是如果传了一个引用，则React.memo无效。因为引用是不相等的*/}
			<Child data={m} onClick={onClickChild}/>
		</div>
	);
}

//使用React.memo可以解决重新执行Child组件的问题
const Child = React.memo(props => {
		console.log("child 执行了");
		console.log('假设这里有大量代码')
		return <div onClick={props.onClick}>child: {props.data}</div>;
});
```
> 怎么办？ 用useMemo：