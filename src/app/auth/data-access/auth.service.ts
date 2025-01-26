import { Injectable } from '@angular/core'
import {
	Auth,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup
} from '@angular/fire/auth'

export interface User {
	email: string
	password: string
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private _auth: Auth) {}

	signUp(user: User) {
		return createUserWithEmailAndPassword(this._auth, user.email, user.password)
	}
	signIn(user: User) {
		return signInWithEmailAndPassword(this._auth, user.email, user.password)
	}

	signInWithGoogle() {
		const provider = new GoogleAuthProvider()
		// provider.setCustomParameters({ prompt: 'select_accout'})

		return signInWithPopup(this._auth, provider)
	}
}
