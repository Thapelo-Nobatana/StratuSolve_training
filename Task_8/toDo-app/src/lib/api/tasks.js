// @ts-nocheck

const API_URL = 'http://localhost:8100';

// GET TASKS
export async function fetchTasks() {
	try {
		const res = await fetch(`${API_URL}/tasks`, {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		});

		// console.log('where are you:', await res.json());
		return await res.json();
	} catch {
		console.error({ err: 'Maybe not logged in ? or authed' });
		return [];
	}
}

// POST TASKS
export async function createTask(task) {
	try {
		const res = await fetch(`${API_URL}/tasks`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(task)
		});
		console.log('res: ', res);
		return await res.json();
	} catch {
		console.log('An err occured');
		return { err: 'something wrong' };
	}
}

// UPDATE TASKS
export async function updateTask(data) {
	try {
		const res = await fetch(`${API_URL}/tasks/${data.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify(data)
		});
		return await res.json();
	} catch {
		console.log('update failed');

		return { err: 'Update failed' };
	}
}

// DELETE TASKS
export async function deleteTask(id) {
	try {
		const res = await fetch(`${API_URL}/tasks/${id}`, {
			method: 'DELETE',
			credentials: 'include'
		});
		return await res.json();
	} catch {
		console.log('delete failed');
		return { err: 'delete failed' };
	}
}

// Search user by email

export async function fetchUserByEmail(email) {
	try {
		const res = await fetch(`${API_URL}/admin/email`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		return await res.json();
	} catch {
		console.log('User does not exist');
		return { error: 'User does not exist' };
	}
}

// Admin fetch all tasks and user_id

export async function adminFetchAllTask() {
	try {
		const res = await fetch(`${API_URL}/admin/tasks`, {
			method: 'GET',
			credentials: 'include'
		});

		return await res.json();
	} catch (err) {
		console.log('could not fetch:', err);
	}
}
