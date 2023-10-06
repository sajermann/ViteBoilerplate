import { Button } from '~/App/Shared/Components/Button';
import { Input } from '~/App/Shared/Components/Input';
import { useLogin } from '~/App/Login/Hooks/UseLogin';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';

export function LoginForm() {
	const { translate } = useTranslation();
	const { handleSubmit, register, errors, setValue, isLoading } = useLogin();

	return (
		<form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
			<Input
				labelProps={{
					children: 'Email',
				}}
				inputProps={{
					...register('email'),
					id: 'email',
					placeholder: translate('TYPE_YOUR_EMAIL'),
					error: errors.email?.message,
					disabled: isLoading,
				}}
			/>

			<Input
				labelProps={{
					children: translate('PASSWORD'),
				}}
				inputProps={{
					...register('password'),
					id: 'password',
					placeholder: translate('TYPE_YOUR_PASSWORD'),
					error: errors.password?.message,
					type: 'password',
					disabled: isLoading,
				}}
			/>

			<Button type="submit" disabled={isLoading}>
				Entrar
			</Button>
			<Button
				disabled={isLoading}
				type="button"
				colorStyle="Success"
				onClick={() => {
					setValue('email', 'analyst@gmail.com');
					setValue('password', 'Senha_Temporaria');
				}}
			>
				Analyst
			</Button>
			<Button
				disabled={isLoading}
				type="button"
				colorStyle="Warning"
				onClick={() => {
					setValue('email', 'user@gmail.com');
					setValue('password', 'Senha_Temporaria');
				}}
			>
				User
			</Button>
			<Button
				disabled={isLoading}
				type="button"
				colorStyle="Secondary"
				onClick={() => {
					setValue('email', 'sajermannbruno@gmail.com');
					setValue('password', 'Senha_Temporaria');
				}}
			>
				Admin
			</Button>
		</form>
	);
}
