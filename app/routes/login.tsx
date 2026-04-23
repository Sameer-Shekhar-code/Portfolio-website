import { login, logout } from '@/utils/auth.server'
import { type ActionFunctionArgs, type LoaderFunctionArgs, redirect } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	const secret = url.searchParams.get('secret')
	const logoutParam = url.searchParams.get('logout')

	if (logoutParam === 'true') {
		return logout(request)
	}

	if (secret) {
		return login(request, secret)
	}

	return redirect('/')
}
