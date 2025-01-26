import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, GoogleAuthProvider, provideAuth } from '@angular/fire/auth'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideFirebaseApp(() =>
			initializeApp({
				projectId: 'anuglar-auth',
				appId: '1:127747497085:web:241fa15a33b8930c6fe514',
				storageBucket: 'anuglar-auth.firebasestorage.app',
				apiKey: 'AIzaSyBjEZs4t0Rfzw-17b1nQp0moUu_wuyepz4',
				authDomain: 'anuglar-auth.firebaseapp.com',
				messagingSenderId: '127747497085'
			})
		),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore())
	]
}
