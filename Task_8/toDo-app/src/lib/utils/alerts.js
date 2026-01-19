// @ts-nocheck
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { browser } from '$app/environment';

const icons = 'success  error  warning  info  question';

export const showAlert = (title, text, icon) => {
	if (browser) {
		return Swal.fire({
			title,
			text,
			icon,
			confirmButtonText: 'OK'
		});
	}
};

export const showConfirmation = (title, text) => {
	if (browser) {
		return Swal.fire({
			title,
			text,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#f44336',
			cancelButtonColor: '#4299e1',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		});
	}
};
