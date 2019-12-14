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