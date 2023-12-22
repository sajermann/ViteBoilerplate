import { useTranslation } from '../../Hooks/UseTranslation';

export function Status({ status }: { status?: string }) {
	const { translate } = useTranslation();
	return translate((status || '').toUpperCase());
}
