import { inject, Injectable, signal } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import {
	addDoc,
	collection,
	Firestore,
	collectionData,
	doc,
	getDoc,
	updateDoc,
	deleteDoc
} from '@angular/fire/firestore'
import { catchError, Observable, tap, throwError } from 'rxjs'
import { AuthStateService } from '../../shared/data-access/auth-state.service'

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
	private _authState = inject(AuthStateService)
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

	constructor() {
		// console.log(this._authState.currertUser)
	}

	getTask(id: string) {
		const docRes = doc(this._collection, id)
		return getDoc(docRes)
	}
	create(task: TaskCreate) {
		return addDoc(this._collection, task)
	}

	update(task: TaskCreate, id: string) {
		const docRes = doc(this._collection, id)
		return updateDoc(docRes, task)
	}

	delete(id: string) {
		const docRes = doc(this._collection, id)
		return deleteDoc(docRes)
	}
}
