// @ts-nocheck

const API_URL = 'http://localhost:8100';

// export async function updatePassword(email, password) {
// 	try {
// 		const res = await fetch(`${API_URL}/updatePassword`, {
// 			method: 'PUT',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},

// 			body: JSON.stringify({ email, password })
// 		});

// 		if (!res.ok) {
// 			const err = await res.json();
// 			console.error('Update password failed:', err);
// 			return false;
// 		}

// 		const data = await res.json();
// 		console.log('Password updated:', data);
// 		return true;
// 	} catch (error) {
// 		console.error('Frontend updatePassword error:', error);
// 		return false;
// 	}
// }

// Forgot Password email

export async function sendResetEmail(email) {
	try {
		let res = await fetch(`${API_URL}/auth/forgot-password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		return true;
	} catch {
		console.error('email failed to send');
	}
}

// Reset Password

export async function resetPassword(token, password) {
	try {
		let res = await fetch(`${API_URL}/auth/reset-password`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token, password })
		});

		if (!res.ok) {
			const error = await res.json();
			console.error('Failed to reset Password:', error);
		}

		// const data = await res.json();

		console.log('Password updated successfully:');

		return true;
	} catch (err) {
		console.error('Failed to update password', err);
		return false;
	}
}
