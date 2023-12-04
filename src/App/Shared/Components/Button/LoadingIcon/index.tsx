import { Icons } from '~/App/Shared/Components/Icons';
import { TFeedbackProps } from '~/App/Shared/Types/TFeedbackProps';

interface ILoadingIcon {
	withFeedback?: TFeedbackProps;
}

export function LoadingIcon({ withFeedback }: ILoadingIcon) {
	if (
		withFeedback?.loadingOptions.isLoading &&
		!withFeedback?.loadingOptions.customIcon
	) {
		if (withFeedback.loadingOptions.typeLoadingIcon === 'Points') {
			return <Icons nameIcon="loadingPoints" />;
		}
		return <Icons nameIcon="loadingCircle" />;
	}

	if (
		withFeedback?.loadingOptions.isLoading &&
		withFeedback?.loadingOptions.customIcon
	) {
		return withFeedback.loadingOptions.customIcon;
	}
	return null;
}
