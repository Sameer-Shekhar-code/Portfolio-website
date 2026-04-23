import { createCookieSessionStorage, redirect } from 'react-router'

const adminSessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'HNH_admin_session',
		secure: process.env.NODE_ENV === 'production',
		secrets: [process.env.SESSION_SECRET || 'default-secret'],
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 30, // 30 days
		httpOnly: true,
	},
})

export async function getAdminSession(request: Request) {
	const cookie = request.headers.get('Cookie')
	return adminSessionStorage.getSession(cookie)
}

export async function isAdmin(request: Request) {
	const session = await getAdminSession(request)
	return session.get('isAdmin') === true
}

export async function requireAdmin(request: Request) {
	const isUserAdmin = await isAdmin(request)
	if (!isUserAdmin) {
		throw redirect('/')
	}
}

export async function login(request: Request, secret: string) {
	if (secret === process.env.ADMIN_SECRET) {
		const session = await getAdminSession(request)
		session.set('isAdmin', true)
		return redirect('/', {
			headers: {
				'Set-Cookie': await adminSessionStorage.commitSession(session),
			},
		})
	}
	return redirect('/login?error=invalid')
}

export async function logout(request: Request) {
	const session = await getAdminSession(request)
	return redirect('/', {
		headers: {
			'Set-Cookie': await adminSessionStorage.destroySession(session),
		},
	})
}
