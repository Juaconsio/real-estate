import { Card, Image, Text, Stack, Button, Group } from '@mantine/core';
import Property from '../types/property';
import { addFavoriteProperty } from '../api/property';
import handleResponse from './notifications';

export default function CardProperty({ property }: { property: Property }) {
  const handleAddFavorite = async (property_url: string) => {
    try {
      const res = await addFavoriteProperty(property_url);
      handleResponse(res, 'Propiedad añadida a favoritos');
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={property.image}
          height={160}
          alt="Property image"
        />
      </Card.Section>

      <Stack justify="flex-start" align="flex-start" mt="md" mb="xs" gap="xs">
        <Text size="sm">Desde</Text>
        <Text size='xl' fw={600}>{property.price}</Text>
        <Text size="lg" fw={500}>{property.title}</Text>
        <Text fw={500}>{property.address}</Text>
      </Stack>
      <Group justify="space-between" grow>
        <Button
          component='a'
          href={property.url ?? '#'}
          variant="light"
          fullWidth>
          Ver propiedad
        </Button>
        <Button
          onClick={() => property.url && handleAddFavorite(property.url)}
          variant="light"
          color='green'
          fullWidth>
          Añadir a Favoritos
        </Button>
      </Group>
      <Stack justify="flex-start" align="flex-start" mt="md" mb="xs" gap="xs">
        <Text size="sm">{property.size}</Text>
        <Text size="sm">{property.bedrooms}</Text>
      </Stack>
    </Card >
  );
}