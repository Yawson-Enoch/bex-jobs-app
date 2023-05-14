import AuthHeader from '@/components/auth-header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <div className="relative flex flex-col justify-between gap-3 md:gap-5">
        {children}
      </div>
    </>
  );
}
