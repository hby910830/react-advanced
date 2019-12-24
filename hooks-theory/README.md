# useState的基本用法
```
function App(){
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
```
![image.png](https://upload-images.jianshu.io/upload_images/1181204-46c5da0a45a7cf07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 问自己几个问题
> 1.执行setN的时候会发生什么？n会变吗？App()会重新执行吗？
> 2.如果App()会重新执行，那么useState(0)的时候，n每次的值会有不同吗？
> 通过console.log就能得到答案！

![image.png](https://upload-images.jianshu.io/upload_images/1181204-ff16cf7cf59eea2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> 结论：n会变，App()会重新执行，n每次的值会有不同，但是n不是被setN改变的！

# 分析
- setN
```
1.setN一定会修改数据x，将n+1存入x
2.setN一定会触发<App />重新渲染(re-render)
```
- useState
``useState肯定会从x读取n的最新值``
- x
``每个组件有自己的数据x，我们将其命名为state``

# 尝试自己实现一个React.useState
```
let _state //全局_state用来存储state的值，避免重新渲染的时候被myUseState重置为初始值
const myUseState = initialValue => {
	_state = _state === undefined ? initialValue : _state
	const setState = (newValue) => {
		_state = newValue
		render()
	}
	return [_state, setState]
}

const render = () => {
	ReactDOM.render(<App1 />, document.getElementById('root'))
}

function App1(){
	const [n, setN] = myUseState(0)
	return (
		<div className='App'>
			<p>{n}</p>
			<p>
				<button onClick={() => setN(n + 1)}>+1</button>
			</p>
		</div>
	)
}
```

# 如果一个组件用了两个useState怎么办？
> 由于所以数据都放在_state里，所以会冲突。改进思路：把_state做成数组，比如_state = [0,0]

# 多个useState
```
let _state = [] //全局_state用来存储state的值，避免重新渲染的时候被myUseState重置为初始值
let index = 0
const myUseState = initialValue => {
	const currentIndex = index
	_state[currentIndex] = _state[currentIndex] === undefined ? initialValue : _state[currentIndex]
	const setState = newValue => {
		_state[currentIndex] = newValue
		render()
	}
	index += 1
	return [_state[currentIndex], setState]
}

const render = () => {
	index = 0
	ReactDOM.render(<App1 />, document.getElementById('root'))
}

function App1(){
	const [n, setN] = myUseState(0)
	const [m, setM] = myUseState(0)
	return (
		<div className='App'>
			<p>{n}</p>
			<p>
				<button onClick={() => setN(n + 1)}>+1</button>
			</p>
			<p>{m}</p>
			<p>
				<button onClick={() => setM(m + 1)}>+1</button>
			</p>
		</div>
	)
}
```

# _state数组方案缺点
- useState调用顺序
> 若第一次渲染时n是第一个，m是第二个，k是第三个
> 则第二次渲染时必须保证顺序完全一致
> 所以React不允许出现如下代码
```
function App(){
	const [n, setN] = React.useState(0)
	let m, setM
	if(n % 2 === 1){
		/* error:
			* React Hook "React.useState" is called conditionally.
			* React Hooks must be called in the exact same order in every component render
			*原因： 因为useState内部原理是把state声明成一个数组，需要顺序一一对应，如上图
		 */
		[m, setM] = React.useState(0)
	}
	return (
		<div className='App'>
			<p>{n}</p>
			<p>
				<button onClick={() => setN(n + 1)}>+1</button>
			</p>
			<p>{m}</p>
			<p>
				<button onClick={() => setM(m + 1)}>+1</button>
			</p>
		</div>
	)
}
```
![image.png](https://upload-images.jianshu.io/upload_images/1181204-c0b5554beb79b9af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 现在的代码还有一个问题
- App用了_state和index，那其他组件用什么？
``解决办法：给每个组件创建一个_state和index``
- 又有问题：放在全局作用域里重名了怎么办？
``解决办法：放在组件对应的虚拟节点对象上``

![image.png](https://upload-images.jianshu.io/upload_images/1181204-e3bd62558e75c7f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 总结
- 每个函数组件对应一个React节点
- 每个节点保存着state和index
- useState会读取state[index]
- index 由useState出现的顺序决定
- setState会修改state,并触发更新
``注意：这里对React的实现做了简化，React节点应该是FiberNode，_state的真实名称是memorizedState，index的实现则用到了链表，有兴趣的可以自行学习``
[阅读源码后，来讲讲React Hooks是怎么实现的 - 掘金](https://juejin.im/post/5bdfc1c4e51d4539f4178e1f)


# n 的分身
```
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
```
- 两种操作
> 1.点击+1，再点击log --无bug，先加1再打印1
>
> 2.点击log，再点击+1 --有bug，加1再打印0
>
> 问题：为什么log出了旧数据

因为有多个n 
![image.png](https://upload-images.jianshu.io/upload_images/1181204-62bc7ae8da49274d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 贯穿始终的状态
- 全局变量
> 用window.xxx即可，但是太low

- useRef
> useRef不仅可以用于div,还能用于任意数据

```
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
```
![image.png](https://upload-images.jianshu.io/upload_images/1181204-f893e9d78641bcba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- useContext
> useContext不仅能贯穿始终,还能贯穿不同组件

```
const themeContext = React.createContext(null)

function App() {
	const [theme, setTheme] = React.useState('blue');
	return (
		<themeContext.Provider value={{theme, setTheme}}>
			<div className={`App ${theme}`}>
				<p>{theme}</p>
				<div>
					<ChildA/>
				</div>
				<div>
					<ChildB/>
				</div>
			</div>
		</themeContext.Provider>
	);
}

function ChildA() {
	const {setTheme} = React.useContext(themeContext)
	return (
		<div>
			<button onClick={() => setTheme('red')}>red</button>
		</div>
	)
}

function ChildB() {
	const {setTheme} = React.useContext(themeContext)
	return (
		<div>
			<button onClick={() => setTheme('blue')}>blue</button>
		</div>
	)
}
```

# 总结
- 每次重新渲染，组件函数就会执行
- 对应的所以state都会出现【分身】
- 如果你不希望出现分身
- 可以用useRef/useContext等