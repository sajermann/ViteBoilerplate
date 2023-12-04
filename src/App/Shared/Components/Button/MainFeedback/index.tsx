import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TFeedbackProps } from '~/App/Shared/Types/TFeedbackProps';
import { showInDevelopment } from '~/App/Shared/Utils/ShowInDevelopment';

interface IMainFeedback
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	withFeedback?: TFeedbackProps;
}

export function MainFeedback({ withFeedback, ...rest }: IMainFeedback) {
	if (
		withFeedback?.loadingOptions.isLoading ||
		withFeedback?.successOptions?.success ||
		withFeedback?.failedOptions?.failed
	) {
		return (
			<div
				{...showInDevelopment({ 'data-content': 'mainFeedback' })}
				{...rest}
			/>
		);
	}
	return null;
}
