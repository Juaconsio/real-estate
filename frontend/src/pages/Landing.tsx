import { useEffect, useState } from 'react';
import { Stack, Grid, } from '@mantine/core';
import { getLandingPage } from '../api/property';
import CardProperty from '../components/CardProperty';
import SearchBar from '../components/SearchBar';
import { useArrayContext } from '../context/data';

export default function Landing() {
  const { arrayData, setArrayData } = useArrayContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getLandingPage();
        setArrayData(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Stack w={'90vw'} h={'90vh'}>
      <SearchBar />
      {loading && <div>Cargando...</div>}
      {!loading && arrayData.length === 0 && <div>No hay propiedades</div>}
      {!loading && arrayData.length > 0 &&
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          {arrayData.map((property) => (
            <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={property.title}>
              <CardProperty property={property} />
            </Grid.Col>
          ))}
        </Grid>
      }
    </Stack>
  );
}
