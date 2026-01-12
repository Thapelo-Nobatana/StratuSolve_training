// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

const API_URL = 'http://localhost:8100';

/**
 * Auth store (single source of truth)
 */
export const user = writable(null);
export let userValues = {};
export const sessionLoading = writable(true);
let didLogout = false;
// session rehydration

export async function restoreSessions() {
	if (!browser || didLogout) return;
	sessionLoading.set(true);

	try {
		const res = await fetch(`${API_URL}/auth/me`, {
			credentials: 'include'
		});
		const data = await res.json();

		if (res.ok) {
			user.set(data);
			userValues = data;
		} else {
			user.set(null);
			userValues = {};
		}
	} catch {
		user.set(null);
		userValues = {};
	} finally {
		sessionLoading.set(false);
	}
}

//Signup

export async function signup(email, username, password) {
	const res = await fetch(`${API_URL}/auth/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',

		body: JSON.stringify({ email, username, password })
	});

	const data = await res.json();

	if (!res.ok || data.error) {
		return false;
	}

	user.set(data);
	userValues = data;

	return true;
}

//Login

export async function login(email, password) {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({ email, password })
	});

	const data = await res.json();
	console.log(' data from login: ', data);

	if (data.error) {
		return false;
	}
	user.set(data);
	userValues = data;

	if (data.role === 'admin') {
		goto('/');
	} else {
		goto('/');
		return;
	}

	console.log('this is the end of api');
	return true;
}

// UPDATE PROFILE
export async function updateProfile(username, password, email, photo) {
	const res = await fetch(`${API_URL}/auth/update/`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify({ username, email, password, photo })
	});

	const dataResponse = await res.json();

	console.log('this is data from updateProfile:', dataResponse);
}

// Logout

export async function logout() {
	console.log('this is vmy logout:');
	try {
		didLogout = true;
		let res = await fetch(`${API_URL}/auth/logout`, {
			method: 'POST',
			credentials: 'include'
		});

		let data = await res.json();

		console.log('this is the logout button output', data);
		user.set(null);
		userValues = {};
		goto('/login');

		return true;
	} catch {
		return false;
	}
}
