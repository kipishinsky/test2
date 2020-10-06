import React, {useEffect, useState} from 'react'
import s from '../styles/app.module.scss'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../store/store'
import {setCountAC} from '../store/reducer/rootReducer'
import io from 'socket.io-client'

const socket = io('http://localhost:3003/')

export const App = () => {

	const dispatch = useDispatch()
	const count = useSelector<RootStateType, number | null>(state => state.root.count)

	useEffect(() => {
		socket.on('Found the nearest number', (ReadyNum: number) => {
			dispatch(setCountAC({value: ReadyNum}))
		})
	}, [])


	const [arr, setArr] = useState<Array<number>>([
		0
	])

	const [finallyValue, setFinallyValue] = useState<number | null>(0)

	const formik = useFormik({
		initialValues: {
			int: ''
		},
		onSubmit: values => {
			socket.emit('Work with number', values.int)
			formik.resetForm()
		}
	})

	const setCount = () => {
		return setFinallyValue(count)
	}

	useEffect(() => {
		setCount()
	}, [count])

	useEffect(() => {
		socket.on('Found the nearest number BD', (ReadyNum: number) => {
			setArr([ReadyNum])
		})
	}, [arr])

	return (
		<div className={s.app}>
			<div className={s.app_task}>
				<ul className={s.app_task__item}>
					<li className={s.done}>
						1. На фронте в Реакте есть поле ввода числа (валидация на то, что это только число) и кнопка
						RUN
					</li>
					<li>
						2. По нажатию идет запрос на сервер с этим инпутом
					</li>
					<li>
						3. Сервер берет число из запроса и находит ближайшее к нему число в последовательности
						Фибоначчи
					</li>
					<li>
						4. Сервер сохраняет историю рассчетов в базу данных (любая структура на ваш выбор)
					</li>
					<li>
						5. Сервер возвращает число на фронт
					</li>
					<li>
						6. Фронт выводит число в поле ниже
					</li>
					<li>
						7. При вводе нового чилса последовательность повторяется без перезагрузки страницы
						Если есть вопросы или появятся в процессе - не стесняйтесь их задавать
					</li>
				</ul>
			</div>
			<div className={s.app_task_job}>
				<div className={s.app_task_job__board}>
					<form className={s.app_task_job__board__form} onSubmit={formik.handleSubmit}>
						<input
							className={s.app_task_job__board__input}
							name="int"
							type="number"
							onChange={formik.handleChange}
							value={formik.values.int || ''}
							placeholder="only number"
							required
						/>
						<button
							className={s.app_task_job__board__button}
							type='submit'
						>run
						</button>
					</form>
					<div className={s.app_task_job__board__final}>
						{'RESULT: ' + finallyValue}
					</div>
					<div className={s.app_task_job__board__arr}>
						{'dataBase: ' + arr}
					</div>
				</div>
			</div>
		</div>
	)
}

