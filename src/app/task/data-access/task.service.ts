import { inject, Injectable, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import {
	addDoc,
	collection,
	Firestore,
	collectionData
} from '@angular/fire/firestore'
import { catchError, Observable, tap, throwError } from 'rxjs'

const PATH = 'tasks'

export interface Task {
	id: string
	title: string
	completed: boolean
}

export type TaskCreate = Omit<Task, 'id'>

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	private _firestore = inject(Firestore)
	private _collection = collection(this._firestore, PATH)

	loading = signal<boolean>(true)

	getTasks = toSignal(
		(collectionData(this._collection, { idField: 'id' }) as Observable<
			Task[]
		>).pipe(
			tap(() => {
				this.loading.set(false)
			}),
			catchError(error => {
				this.loading.set(false)

				return throwError(() => error)
			})
		),
		{
			initialValue: []
		}
	)

	constructor() {}

	create(task: TaskCreate) {
		return addDoc(this._collection, task)
	}

	findAll() {}
}
