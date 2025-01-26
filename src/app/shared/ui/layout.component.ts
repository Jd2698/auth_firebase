import { Component, inject } from '@angular/core'
import { AuthStateService } from '../data-access/auth-state.service'
import { Router, RouterLink, RouterOutlet } from '@angular/router'

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [RouterOutlet, RouterLink],
	template: `
	<header class="h-[80px] mb-8 w-full max-w-screen-lg mx-auto">
		<nav class="flex items-center justify-between h-full">
			<a class="text-2xl front-bold" [routerLink]="['/tasks']"  >Ng Task</a>
			<button class="button bg-red-800 p-2 rounded" type="button" (click)="signOut()">sign out</button>
		</nav>
	</header>
	<section class="max-w-screen-lg mx-auto">
		<router-outlet/>
	</section>
	`
})
export default class LayoutComponent {
	private _authStateService = inject(AuthStateService)
	private _router = inject(Router)

	async signOut() {
		await this._authStateService.signOut()
		this._router.navigateByUrl('/auth/sign-in')
	}
}
