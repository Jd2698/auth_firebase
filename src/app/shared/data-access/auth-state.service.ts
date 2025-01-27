import { inject, Injectable } from '@angular/core'
import { Auth, authState, signOut } from '@angular/fire/auth'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class AuthStateService {
	private _auth = inject(Auth)

	get authState$(): Observable<any> {
		return authState(this._auth)
	}

	get currertUser() {
		return this._auth.currentUser
	}

	signOut() {
		return signOut(this._auth)
	}
}
