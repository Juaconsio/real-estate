import { useEffect, useState } from 'react';
import { Stack, Grid } from '@mantine/core';
import { getLandingPage } from '../api/property';
import CardProperty from '../components/CardProperty';
import CardPropertySkeleton from '../components/CardPropertySkeleton';
import SearchBar from '../components/SearchBar';
import { useArrayContext } from '../context/data';
import Property from '../types/property';

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
      {!loading && arrayData.length === 0 && <div>No hay propiedades</div>}

      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
        {PropertyList({ properties: arrayData, isLoading: loading })}
      </Grid>

    </Stack >
  );
}

function PropertyList({ properties, isLoading }: { properties: Property[]; isLoading: boolean }) {
  return (
    <>
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={index}>
            <CardPropertySkeleton />
          </Grid.Col>
        ))
        : properties.map((property, index) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={property.title}>
            <CardProperty key={index} property={property} />
          </Grid.Col>
        ))}
    </>
  );
}