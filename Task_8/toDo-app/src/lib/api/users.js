// @ts-nocheck

import { json } from '@sveltejs/kit';

const API_URL = 'http://localhost:8100';

// GET all users
export async function fetchAllUsers(num) {
	try {
		let res = await fetch(`${API_URL}/admin/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ num })
		});

		let data = await res.json();

		console.log('got all the users data:', data);
		return data;
	} catch {
		console.log('something went wrong');
		return;
	}
}

// Delete user

export async function deleteUser(id) {
	try {
		let res = await fetch(`${API_URL}/admin/delete/${id}`, {
			method: 'DELETE',
			credentials: 'include'
		});

		if (res.ok) {
			console.log('user deleted');
		}
	} catch (error) {
		console.error('failed to Delete user:', error);
	}
}
