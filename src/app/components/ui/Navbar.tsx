import NavLink from 'next/link';
import { Spacer } from '@nextui-org/spacer';
import { Link } from '@nextui-org/link';

export const Navbar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        // backgroundColor: theme?.colors.gray100.value,
        padding: '10px 50px',
      }}
    >
      <NavLink href='/' legacyBehavior>
        <Link>
          <h2 color='white'>P</h2>
          <h3 color='white'>okeBosti</h3>
        </Link>
      </NavLink>

      <Spacer />
      <NavLink href='/favorites' legacyBehavior>
        <Link>
          <p>Favorites</p>
        </Link>
      </NavLink>
    </nav>
  );
};
