import { toast } from 'react-toastify';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

export const notify = (message: string, type: NotificationType = 'info') => {
	toast[type](message, {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});
}; 