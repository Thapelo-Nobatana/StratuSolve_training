const API_URL = 'http://localhost:8100';

// GET all users
export async function fetchAllUsers() {
	try {
		let res = await fetch(`${API_URL}/admin/users`, {
			credentials: 'include'
		});

		let data = res.json();

		console.log('got all the users data:', data);
		return data;
	} catch {
		console.log('something went wrong');
		return;
	}
}
