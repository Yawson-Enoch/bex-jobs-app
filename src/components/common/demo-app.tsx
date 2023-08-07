import { redirect, useRouter } from 'next/navigation';
import { useAtom } from 'jotai';

import { demoAppAtom } from '~/atoms/demo-app';
import { useLogin } from '~/hooks/api/useLogin';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

import { Button } from '../ui/button';
import LoadingIndicator from './loading-indicator';

export default function DemoApp() {
  const [isDemoApp, setIsDemoApp] = useAtom(demoAppAtom);

  const router = useRouter();

  const loginMutation = useLogin();

  return (
    <Dialog
      defaultOpen={isDemoApp}
      open={isDemoApp}
      onOpenChange={setIsDemoApp}
    >
      <DialogContent className="left-1/2 w-[min(calc(100%_-_1rem),_500px)] -translate-x-1/2 outline-none md:top-1/2 md:-translate-y-1/2">
        <div className="my-6 space-y-3 rounded-lg border bg-background p-3 md:my-0 md:space-y-6 md:p-6">
          <DialogHeader className="flex flex-row items-start justify-between text-left">
            <div>
              <DialogTitle className="scroll-m-20 text-xl font-semibold tracking-tight">
                Try BexJobs or Register for Full Access!
              </DialogTitle>
              <DialogDescription>
                Explore features instantly as a test user&#40;you have to
                register after logging out&#41; OR create an account for full
                functionality.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={loginMutation.isLoading}
              onClick={() => {
                loginMutation.mutate({
                  email: 'test@user.com',
                  password: 'top-secret',
                });
                setIsDemoApp(false);
                redirect('/dashboard');
              }}
            >
              {loginMutation.isLoading ? (
                <LoadingIndicator msg="Logging in..." />
              ) : (
                'Here for a test'
              )}
            </Button>
            <Button
              type="button"
              size="lg"
              onClick={() => {
                setIsDemoApp(false);
                router.push('/signup');
              }}
            >
              Register
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
