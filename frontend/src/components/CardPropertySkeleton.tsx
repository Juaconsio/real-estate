import { Card, Skeleton, Stack, Group } from '@mantine/core';

export default function CardPropertySkeleton() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Skeleton height={160} />
      </Card.Section>

      <Stack justify="flex-start" align="flex-start" mt="md" mb="xs" gap="xs">
        <Skeleton height={10} width="30%" />
        <Skeleton height={20} width="50%" />
        <Skeleton height={15} width="70%" />
        <Skeleton height={15} width="60%" />
      </Stack>

      <Group justify="space-between" grow>
        <Skeleton height={36} width="48%" radius="md" />
        <Skeleton height={36} width="48%" radius="md" />
      </Group>

      <Stack justify="flex-start" align="flex-start" mt="md" mb="xs" gap="xs">
        <Skeleton height={10} width="40%" />
        <Skeleton height={10} width="40%" />
      </Stack>
    </Card>
  );
}
