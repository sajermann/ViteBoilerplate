import { useTranslation as useTranslationOficial, Trans } from 'react-i18next';

export function useTranslation() {
	const { t, i18n } = useTranslationOficial();

	function translate(text: string) {
		return t(text);
	}

	return { translate };
}
