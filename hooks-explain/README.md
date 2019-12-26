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

# gds
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