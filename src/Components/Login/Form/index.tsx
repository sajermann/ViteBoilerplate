import { Button } from '~/Components/Shared/Button';
import { Input } from '~/Components/Shared/Input';
import { useAuth } from '~/Hooks/UseAuth';
import { useTranslation } from '~/Hooks/UseTranslation';

export function LoginForm() {
	const { translate } = useTranslation();
	const {
		handleSubmitForm,
		handleLogin,
		register,
		errors,
		setValue,
		isLoading,
	} = useAuth();
	return (
		<form
			className="flex flex-col gap-4 w-full"
			onSubmit={handleSubmitForm(handleLogin)}
		>
			<Input
				labelProps={{
					children: 'Email',
				}}
				inputProps={{
					...register('email'),
					id: 'email',
					placeholder: translate('TYPE_YOUR_EMAIL'),
					error: errors.email?.message,
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
				}}
			/>

			<Button type="submit">Entrar</Button>
			<Button
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
