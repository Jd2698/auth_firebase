import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthStateService } from '../shared/data-access/auth-state.service'
import { map } from 'rxjs'

export const publicGuard = (): CanActivateFn => {
	return () => {
		const authStateService = inject(AuthStateService)
		const router = inject(Router)

		return authStateService.authState$.pipe(
			map(state => {
				if (state) {
					router.navigateByUrl('/tasks')
					return false
				}

				return true
			})
		)
	}
}

export const privateGuard = (): CanActivateFn => {
	return () => {
		const authStateService = inject(AuthStateService)
		const router = inject(Router)

		return authStateService.authState$.pipe(
			map(state => {
				if (!state) {
					router.navigateByUrl('/auth/sign-in')
					return false
				}

				return true
			})
		)
	}
}
