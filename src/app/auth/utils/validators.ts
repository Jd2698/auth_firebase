import { FormGroup } from '@angular/forms'

export const isValidate = (
	field: string,
	validate: string,
	form: FormGroup
) => {
	const control = form.get(field)

	return control && control.hasError(validate) && control.touched
}
