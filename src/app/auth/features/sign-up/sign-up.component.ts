import { Component, inject, OnInit } from '@angular/core'
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { isValidate } from '../../utils/validators'
import { AuthService } from '../../data-access/auth.service'
import { toast } from 'ngx-sonner'
import { Router, RouterLink } from '@angular/router'
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component'

export interface FormSignUp {
	email: FormControl<String | null>
	password: FormControl<String | null>
}

@Component({
	selector: 'app-sign-up',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
	templateUrl: './sign-up.component.html',
	styles: ``
})
export default class SignUpComponent implements OnInit {
	formGroup!: FormGroup

	private _auth = inject(AuthService)
	private _formBuilder = inject(FormBuilder)
	private _router = inject(Router)

	ngOnInit() {
		this.formGroup = this._formBuilder.group<FormSignUp>({
			email: this._formBuilder.control('', [
				Validators.required,
				Validators.email,
				Validators.minLength(3)
			]),
			password: this._formBuilder.control('', [
				Validators.required,
				Validators.minLength(3)
			])
		})
	}

	getValidate(field: string, validate: string) {
		return isValidate(field, validate, this.formGroup)
	}

	async submit() {
		if (this.formGroup.invalid) return

		const { email, password } = this.formGroup.value
		try {
			await this._auth.signUp({
				email,
				password
			})

			toast('created user')
		} catch (error: any) {
			toast(error.message)
		}
	}

	async submitWithGoogle() {
		try {
			const data = await this._auth.signInWithGoogle()

			this._router.navigateByUrl('/tasks')
			toast('welcome bro')
		} catch (error: any) {
			toast(error.message)
		}
	}
}
