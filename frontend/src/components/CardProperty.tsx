import { Card, Image, Text, Stack, Button } from '@mantine/core';
import Property from '../types/property';


export default function CardProperty({ property }: { property: Property }) {

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
        <Text size="sm">{property.title}</Text>
        <Text size="sm">{property.address}</Text>
      </Stack>
      <Button
        component='a'
        href={property.url ?? '#'}
        variant="light"
        fullWidth>
        Ver propiedad
      </Button>
      <Stack justify="flex-start" align="flex-start" mt="md" mb="xs" gap="xs">
        <Text size="sm">{property.size}</Text>
        <Text size="sm">{property.bedrooms}</Text>
      </Stack>
    </Card>
  );
}