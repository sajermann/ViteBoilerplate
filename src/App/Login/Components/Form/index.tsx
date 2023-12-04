import { Button } from '~/App/Shared/Components/Button';
import { Input } from '~/App/Shared/Components/Input';
import { useLogin } from '~/App/Login/Hooks/UseLogin';
import { useTranslation } from '~/App/Shared/Hooks/UseTranslation';
import { ContainerInput } from '~/App/Shared/Components/ContainerInput';
import { Label } from '~/App/Shared/Components/Label';
import { ErrorsInput } from '~/App/Shared/Components/ErrorsInput';

export function LoginForm() {
	const { translate } = useTranslation();
	const { handleSubmit, register, errors, setValue, isLoading } = useLogin();

	return (
		<form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
			<ContainerInput>
				<Label htmlFor="email" isError={!!errors.email?.message}>
					Email
				</Label>
				<Input
					autoFocus
					id="email"
					{...register('email')}
					placeholder={translate('TYPE_YOUR_EMAIL')}
					disabled={isLoading}
					iserror={!!errors.email?.message}
				/>
				<ErrorsInput
					errors={errors.email?.message ? [errors.email?.message] : undefined}
				/>
			</ContainerInput>

			<ContainerInput>
				<Label htmlFor="password" isError={!!errors.password?.message}>
					{translate('PASSWORD')}
				</Label>
				<Input
					id="password"
					{...register('password')}
					placeholder={translate('TYPE_YOUR_PASSWORD')}
					disabled={isLoading}
					iserror={!!errors.password?.message}
				/>
				<ErrorsInput
					errors={
						errors.password?.message ? [errors.password?.message] : undefined
					}
				/>
			</ContainerInput>

			<div className="w-full flex flex-col items-center gap-2">
				<Button type="submit" disabled={isLoading}>
					Entrar
				</Button>

				<Button
					disabled={isLoading}
					type="button"
					variant="outlined"
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
					variant="outlined"
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
					variant="outlined"
					onClick={() => {
						setValue('email', 'sajermannbruno@gmail.com');
						setValue('password', 'Senha_Temporaria');
					}}
				>
					Admin
				</Button>
			</div>
		</form>
	);
}
