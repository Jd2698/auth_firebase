import { Component, effect, inject, input, OnInit, signal } from '@angular/core'
import { isValidate } from '../../../auth/utils/validators'
import { toast } from 'ngx-sonner'
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { Task, TaskService } from '../../data-access/task.service'
import { Router } from '@angular/router'

@Component({
	selector: 'app-task-form',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './task-form.component.html',
	styles: ``,
	providers: [TaskService]
})
export default class TaskFormComponent {
	loading = signal(false)
	formGroup!: FormGroup
	id = input.required<string>()

	private _formBuilder = inject(FormBuilder)
	private _taskService = inject(TaskService)
	private _router = inject(Router)

	constructor() {
		this.formGroup = this._formBuilder.group<any>({
			title: this._formBuilder.control('', [
				Validators.required,
				Validators.minLength(3)
			]),
			completed: this._formBuilder.control(false, [Validators.required])
		})

		effect(() => {
			if (!this.id()) return

			this.getTask(this.id())
		})
	}

	async getTask(id: string) {
		const taskSnapshot = await this._taskService.getTask(this.id())

		if (!taskSnapshot.exists()) return

		this.formGroup.patchValue(taskSnapshot.data() as Task)
	}

	getValidate(field: string, validate: string) {
		return isValidate(field, validate, this.formGroup)
	}

	async submit() {
		if (this.formGroup.invalid) return

		try {
			this.loading.set(true)

			if (this.id()) {
				await this._taskService.update(this.formGroup.value, this.id())
			} else {
				await this._taskService.create(this.formGroup.value)
			}

			toast(`Successfully ${this.id() ? 'updated' : 'created'}`)

			this._router.navigateByUrl('/tasks')
			this.loading.set(false)
		} catch (error) {
			toast('error')
		}
	}
}
