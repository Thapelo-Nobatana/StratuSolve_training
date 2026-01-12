// @ts-nocheck
const API_URL = 'http://localhost:8100';

import { userValues } from '$lib/stores/auth.svelte';

// GET Categories
export async function fetchCategories() {
	try {
		let res = await fetch(`${API_URL}/categories`, {
			method: 'GET',
			credentials: 'include'
		});

		let data = await res.json();
		console.log('all fetched categories:    ', data);
		return data;
	} catch {
		console.log('something went wrong');
		return { err: 'something went wrong' };
	}
}

// Create Categories
export async function createCategory(data) {
	try {
		let res = await fetch(`${API_URL}/categories`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(data)
		});
		return await res.json();
	} catch {
		return { err: 'something went wrong' };
	}
}

// Delete Categories

export async function deleteCategory(id) {
	try {
		let res = await fetch(`${API_URL}/categories/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		});
		return await res.json();
	} catch {
		return { err: 'something went wrong' };
	}
}
