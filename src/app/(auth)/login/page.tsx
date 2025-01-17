import type { Metadata } from 'next';

import LoginPageClient from './page.client';

const title = 'Log In To Your Account';
const description = 'Log in to your account and access your dashboard';

export const metadata: Metadata = {
  title,
  description,
};

export default function LoginPage() {
  return <LoginPageClient />;
}
