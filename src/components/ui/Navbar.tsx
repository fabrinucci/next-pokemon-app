import NavLink from 'next/link';
import { Spacer } from '@nextui-org/spacer';
import { Link } from '@nextui-org/link';

export const Navbar = () => {
  return (
    <nav className='flex w-full items-center justify-between bg-neutral-800 px-[50px] py-[20px]'>
      <NavLink href='/' legacyBehavior>
        <Link className='cursor-pointer'>
          <h2 className='text-5xl'>P</h2>
          <h3 className='text-2xl font-semibold'>okeBosti</h3>
        </Link>
      </NavLink>

      <Spacer />
      <NavLink href='/favorites' legacyBehavior>
        <Link className='cursor-pointer'>
          <p className='text-lg'>Favorites</p>
        </Link>
      </NavLink>
    </nav>
  );
};
