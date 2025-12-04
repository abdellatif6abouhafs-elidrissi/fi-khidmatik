import { redirect } from 'next/navigation';
import { auth } from './auth';

export async function getSession() {
  return await auth();
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth(redirectTo = '/auth/login') {
  const session = await getSession();
  if (!session) {
    redirect(redirectTo);
  }
  return session;
}

export async function requireRole(role: 'customer' | 'craftsman' | 'admin', redirectTo = '/') {
  const session = await requireAuth();
  if (session.user.role !== role) {
    redirect(redirectTo);
  }
  return session;
}

export async function requireAdmin(redirectTo = '/') {
  return await requireRole('admin', redirectTo);
}

export async function requireCraftsman(redirectTo = '/') {
  return await requireRole('craftsman', redirectTo);
}

export async function requireCustomer(redirectTo = '/') {
  return await requireRole('customer', redirectTo);
}
