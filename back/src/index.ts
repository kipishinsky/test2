import express from 'express'
import http from 'http'
import io from 'socket.io'

const index = express()
const server = http.createServer(index)
const socket = io(server)

const calc = (n: number) => {
	let arr = []
	let prev = 0
	let next = 1
	for (let i = 0; i < n; i++) {
		let temp = next
		next = prev + next
		prev = temp
		arr.push(prev)
	}
	console.log('вычисляю')
	return arr
}

const binarySearch = (arr: Array<number>, num: number, start: number, end: number): any => {
	if (end < 1) {
		return arr[0]
	}
	const mid = Math.floor((start + (end - start) / 2))

	if (num === arr[mid]) {
		return arr[mid]
	}
	if (end - 1 === start) {
		return Math.abs(arr[start] - num) > Math.abs(arr[end] - num) ? arr[end] : arr[start];
	}
	if (num > arr[mid]) {
		return binarySearch(arr, num, mid, end);
	}
	if (num < arr[mid]) {
		return binarySearch(arr, num, start, mid);
	}
}

index.get('/', (req, res) => {
	console.log('server run')
	res.send('server run')
})

const stateBD: Array<number> = [
	0
]

socket.on('connection', (connection) => {

	connection.on('Work with number', (num: number) => {
		console.log(`пришло с фронта: ${num}`)
		const resArr = calc(num)
		let nearestNumber = binarySearch(resArr, num, 0, resArr.length - 1)

		console.log(`сохранил в БД: ${nearestNumber}`)
		stateBD.push(nearestNumber)
		connection.emit('Found the nearest number BD', stateBD)
		console.log(`отправил на фронт: ${nearestNumber}`)
		connection.emit('Found the nearest number', nearestNumber)
	})


	console.log('USER CONNECTED')
})


const PORT = process.env.PORT || 3003
server.listen(PORT, () => {
	console.log('listening on port:3003')
})