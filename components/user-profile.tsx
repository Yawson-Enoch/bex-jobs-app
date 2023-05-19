'use client';

import { useRouter } from 'next/navigation';
import { LogOutIcon, UserCircleIcon, UserIcon } from 'lucide-react';

import useAuth from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserProfile() {
  const { logOut } = useAuth();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="w-9 rounded-full px-0">
          <UserIcon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">Profile menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-popover/90 backdrop-blur-sm"
      >
        <DropdownMenuItem onClick={() => router.push('/')}>
          <UserCircleIcon aria-hidden="true" className="mr-2 h-4 w-4" />
          <span>View Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logOut()}>
          <LogOutIcon aria-hidden="true" className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
