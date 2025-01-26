import { Component, inject, signal } from '@angular/core'
import { isValidate } from '../../../auth/utils/validators'
import { toast } from 'ngx-sonner'
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { TaskService } from '../../data-access/task.service'

@Component({
	selector: 'app-task-form',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './task-form.component.html',
	styles: ``
})
export default class TaskFormComponent {
	loading = signal(false)
	formGroup!: FormGroup

	private _formBuilder = inject(FormBuilder)
	private _taskService = inject(TaskService)

	ngOnInit() {
		this.formGroup = this._formBuilder.group<any>({
			title: this._formBuilder.control('', [
				Validators.required,
				Validators.minLength(3)
			]),
			completed: this._formBuilder.control(false, [Validators.required])
		})
	}

	getValidate(field: string, validate: string) {
		return isValidate(field, validate, this.formGroup)
	}

	async submit() {
		if (this.formGroup.invalid) return

		try {
			this.loading.set(true)
			await this._taskService.create(this.formGroup.value)
			
			toast('Task created successfully')
			this.loading.set(false)
		} catch (error) {
			toast('error')
		}
	}
}
