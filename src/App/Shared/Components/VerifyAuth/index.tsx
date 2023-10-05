import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONSTANTS } from '~/App/Shared/Constants';
import { useToken } from '../../Hooks/UseToken';

export function VerifyAuth() {
	const navigate = useNavigate();
	const { accessToken } = useToken();
	useEffect(() => {
		if (!accessToken) {
			navigate(CONSTANTS.URL.LOGIN);
		}
	}, [accessToken]);
	return null;
}
