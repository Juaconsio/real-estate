import { Card, Image, Text, Stack } from '@mantine/core';



export default function CardProperty() {
  const property = {
    price: {
      currency: 'UF',
      amount: 2840,
    },
    type: 'Departamento en Venta',
    name: 'Edficio Terra Nova',
    neighborhood: 'Campus San Joaquín',
    numRooms: "1-3 dormitorios",
    mts: "50-100 mts²",
  }
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Stack justify="flex-start" align="flex-start" mt="md" mb="xs" gap="xs">
        <Text size="sm">Desde</Text>
        <Text size='xl' fw={600}>{property.price.currency} {property.price.amount}</Text>
        <Text size="sm" fw={400} >{property.type}</Text>
        <Text size="sm">{property.name}</Text>
        <Text size="sm">{property.neighborhood}</Text>
      </Stack>

      <Stack justify="flex-start" align="flex-start" mt="md" mb="xs" gap="xs">
        <Text size="sm">{property.mts}</Text>
        <Text size="sm">{property.numRooms}</Text>
      </Stack>
    </Card>
  );
}