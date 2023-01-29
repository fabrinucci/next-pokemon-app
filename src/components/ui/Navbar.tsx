import NavLink from 'next/link';
import { Spacer, Text, useTheme, Link } from '@nextui-org/react';

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: theme?.colors.gray100.value,
        padding: '10px 50px',
      }}
    >
      <NavLink href='/' legacyBehavior>
        <Link>
          <Text color='white' h2>
            P
          </Text>
          <Text color='white' h3>
            okeBosti
          </Text>
        </Link>
      </NavLink>

      <Spacer />
      <NavLink href='/favorites' legacyBehavior>
        <Link>
          <Text>Favorites</Text>
        </Link>
      </NavLink>
    </nav>
  );
};
