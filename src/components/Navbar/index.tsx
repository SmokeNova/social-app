'use client';

import Link from 'next/link';
import { Input } from '../ui/input';
import { useSession, signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import { LogInIcon } from 'lucide-react';
import { UserDropdown } from '..';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header>
      <nav className='flex justify-between py-3 px-10 items-center shadow-lg'>
        <div className='flex gap-5 items-center grow'>
          <Link href='/' className='text-4xl font-semibold text-blue-600'>
            LOGO
          </Link>
          <Input
            type='text'
            placeholder='Search'
            className='focus-visible:ring-0 w-1/2 min-w-[300px] max-w-[500px]'
          />
        </div>

        {status !== 'loading' &&
          (session && session.user ? (
            <UserDropdown
              name={session.user?.name ?? ''}
              image={session.user?.image ?? ''}
            />
          ) : (
            <Button onClick={() => signIn()} variant='primary'>
              <LogInIcon className='mr-2 w-5 h-5' />
              Sign In
            </Button>
          ))}
      </nav>
    </header>
  );
}
