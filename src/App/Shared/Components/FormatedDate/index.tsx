import { format } from 'date-fns';

export function FormatedDate({ date }: { date?: string }) {
	try {
		return format(new Date(date as string), 'dd/MM/yyyy, HH:mm');
	} catch {
		return '';
	}
}
