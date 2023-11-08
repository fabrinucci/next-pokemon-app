import NavLink from 'next/link';
import { Spacer } from '@nextui-org/spacer';
import { Link } from '@nextui-org/link';

export const Navbar = () => {
  return (
    <nav className='flex items-center justify-between w-full py-[20px] px-[50px] bg-neutral-800'>
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
