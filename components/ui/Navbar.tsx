import Image from 'next/image';
import NextLink from 'next/link';
import { Link, Spacer, Text, useTheme } from '@nextui-org/react'


export const Navbar = () => {

  const { theme } = useTheme();

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0px 50px',
      backgroundColor: theme?.colors.purple600.value
    }}>

      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="App"
        width= {70}
        height= {70}
      />

      <NextLink href="/" passHref>
        <Link>
          <Text color='white' h2>P</Text>
          <Text color='white' h3>okemon</Text>
        </Link>
      </NextLink>


      <Spacer css={{ flex: 1}}/>

      <NextLink href="/favorites" passHref>
        <Link css={{ marginRight: '10px' }}>
          <Text color='white' size={18}>Favorites</Text>
        </Link>
      </NextLink>
    </div>
  )
}
