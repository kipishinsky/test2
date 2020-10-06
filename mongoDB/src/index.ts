import express, {NextFunction, Request, Response} from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import io from 'socket.io-client'

const socket = io('http://localhost:3003/')
const index = express()
const server = http.createServer(index)

//security policy
index.use(cors())

//ограничивает строки по размеру
index.use(bodyParser.json({limit: '50mb'}))
//
index.use(bodyParser.urlencoded({limit: '50mb', extended: false}))

// logs
index.use((req: Request, res: Response, next: NextFunction): any => {
	console.log('Time: ', new Date().toString())
	console.log(req.method, req.url, 'params: ', req.params)
	console.log('query: ', req.query)
	console.log('body: ', req.body)
	console.log('cookies: : ', req.cookies)
	next() // чтобы конвеер не останавливался
})

const stateFibonacci: Array<number> = [
	0, 2
]


const someRouter = express.Router()

someRouter.get('/arr', (req: Request, res: Response) => {
	socket.on('Found the nearest number BD', (ReadyNum: number) => {
		res.status(200).json({fiba_num: ReadyNum})
	})
	res.status(200).json({fiba_num: stateFibonacci})
})

index.use('/', someRouter) // /arr/mar/shmar  .. generate path




































mongoose.connect('mongodb+srv://kipish:q1w2e3r4t5y6@clust.qpgcj.mongodb.net/test', {
	useNewUrlParser: true,
	useFindAndModify: true
	}).then(() => {
		server.listen(PORT, () => {
			console.log('listening on port:' + PORT)
		})
	}).catch(e => console.log('MongoDb connection error: ' + e))

// run server
const PORT = process.env.PORT || 3006

index.get('/', (req, res) => {
	console.log('mongoDB run')
	res.send('mongoDB run')
})


//const testRoutes = require('../routes/test')

// const hbs = nandleBars.create({
// 	defaultLayout: 'main',
// 	extname: 'hbs'
// })
//
// index.engine('hbs', hbs.engine)
// index.set('view engine', 'hbs')
// index.set('views', 'views')


//index.use(testRoutes) // bag


//
// async function start() {
// 	try {
// 		await mongoose.connect( 'mongodb+srv://kipish:q1w2e3r4t5@clust.lilux.mongodb.net/test' , {
// 			useNewUrlParser: true,
// 			useFindAndModify: false
//
// 		})
// 		server.listen(PORT, () => {
// 			console.log('listening on port:' + PORT)
// 		})
// 	} catch (e) {
// 		console.log(e)
// 	}
// }
// start()


// const dataBase = []
//
// socket.on('connection', (connection) => {
//
// 	connection.on('Found the nearest number', (num: number) => {
// 		console.log(`пришло с сервера: ${num}`)
// 		console.log(`сохраняю в БД`)
//
//
// 		//console.log(`сохранил в БД ${nearestNumber}`)
//
// 		//console.log(`отправил на фронт ${nearestNumber}`)
// 		//connection.emit('Found the nearest number', nearestNumber)
//
// 	})
//
//
// 	console.log('USER CONNECTED')
// })


