import { useRouter } from 'next/navigation';
import * as NProgress from 'nprogress';

/* workaround for toploader not working with useRouter */
/* https://github.com/TheSGJ/nextjs-toploader/issues/10#issuecomment-1538691096 */
export default function useCustomRouter() {
  const router = useRouter();

  return {
    push: (href: string) => {
      NProgress.start();
      router.push(href);
    },
    replace: (href: string) => {
      NProgress.start();
      router.replace(href);
    },
  };
}
