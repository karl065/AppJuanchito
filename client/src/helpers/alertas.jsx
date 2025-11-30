import Swal from 'sweetalert2';

export const alertSuccess = (msg) => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});

	Toast.fire({
		icon: 'success',
		theme: 'dark',
		title: msg,
	});
};

export const alertInfo = (msg) => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});

	Toast.fire({
		icon: 'info',
		theme: 'dark',
		title: msg,
	});
};
export const alertWarning = async (msg) => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showDenyButton: true,
		showConfirmButton: true,
		confirmButtonText: 'Si',
		denyButtonText: 'No',
	});

	return await Toast.fire({
		icon: 'warning',
		theme: 'dark',
		title: msg,
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.onmouseenter = Swal.stopTimer;
					toast.onmouseleave = Swal.resumeTimer;
				},
			}).fire({
				icon: 'success',
				title: 'Producto eliminado',
			});
			return true;
		} else if (result.isDenied) {
			return false;
		}
	});
};
