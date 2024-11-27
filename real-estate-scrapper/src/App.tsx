import { AppShell, Burger, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CardProperty from './components/CardProperty';
import getLandingPage from './scrapper/puppeteer';
import { useEffect } from 'react';

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  useEffect(() => {
    getLandingPage();
  });
  return (

    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Esto es un logo</div>
      </AppShell.Header>


      <AppShell.Main>
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} >
              <CardProperty />
            </Grid.Col>
          ))}
        </Grid>
      </AppShell.Main>
    </AppShell >

  );
}
