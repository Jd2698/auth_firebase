import { Component, inject } from '@angular/core'
import { AuthService } from '../../data-access/auth.service'
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators
} from '@angular/forms'
import { isValidate } from '../../utils/validators'
import { toast } from 'ngx-sonner'
import { Router, RouterLink } from '@angular/router'
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component'

export interface FormSignIn {
	email: FormControl<string | null>
	password: FormControl<string | null>
}

@Component({
	selector: 'app-sign-in',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent],
	templateUrl: './sign-in.component.html',
	styles: ``
})
export default class SignInComponent {
	formGroup!: FormGroup

	private _auth = inject(AuthService)
	private _formBuilder = inject(FormBuilder)
	private _router = inject(Router)

	ngOnInit() {
		this.formGroup = this._formBuilder.group<FormSignIn>({
			email: this._formBuilder.control('', [
				Validators.required,
				Validators.email
			]),
			password: this._formBuilder.control('', [
				Validators.required,
				Validators.minLength(6)
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
			await this._auth.signIn({
				email,
				password
			})

			this._router.navigateByUrl('/tasks')
			toast('welcome bro')
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
