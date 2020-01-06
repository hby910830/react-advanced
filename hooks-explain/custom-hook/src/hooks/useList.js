import {useState, useEffect} from 'react'

const useList = () => {
	const [list, setList] = useState(null)
	useEffect(() => {
		ajax().then(list => {
			setList(list)
		})
	}, []) //确保只在第一次运行
	return {
		list,
		setList
	}
}
export default useList

function ajax(){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([
				{id: 1, name: 'Frank'},
				{id: 2, name: 'Jack'},
				{id: 3, name: 'Alice'},
				{id: 4, name: 'Bob'},
				{id: 5, name: 'Han'}
			])
		}, 1000)
	})
}