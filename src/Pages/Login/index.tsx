import React, { useState } from 'react';
import { LoginForm } from '~/Components/Login/Form';
import { useTranslation } from '~/Hooks/UseTranslation';

export function Login() {
	const { translate } = useTranslation();

	return (
		<div className="flex items-center justify-center p-32 h-full">
			<div className="flex items-center justify-center flex-col gap-6 border rounded-xl p-16 w-96">
				<h1 className="font-extrabold text-5xl">Login</h1>
				<LoginForm />
			</div>
		</div>
	);
}
