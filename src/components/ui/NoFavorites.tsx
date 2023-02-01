import { Container, Image, Text } from '@nextui-org/react';

export const NoFavorites = () => {
  return (
    <>
      <Container
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 100px)',
        }}
      >
        <Text h1>No favorites</Text>
        <Image
          src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
          alt='No favorites'
          width={250}
          height={250}
          css={{
            opacity: 0.1,
          }}
        />
      </Container>
    </>
  );
};
