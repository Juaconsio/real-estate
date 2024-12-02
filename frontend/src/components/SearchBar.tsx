
import { getSeachedProperties } from '../api/property';
import { useForm } from '@mantine/form';
import { Box, Group, NativeSelect, TextInput, Button, LoadingOverlay } from '@mantine/core';
import { useArrayContext } from '../context/data';
import { useDisclosure } from '@mantine/hooks';

export default function SearchBar() {
  const { setArrayData } = useArrayContext();
  const [visible, { toggle }] = useDisclosure(false);
  const handleSearch = async (values: any) => {
    try {
      toggle();
      const data = await getSeachedProperties(values);
      setArrayData(data);
    } catch (error) {
      console.error("Error fetching properties:", error);

    } finally {
      toggle(); // NO funca
    }
  }
  const contractOptions = ['Arriendo', 'Venta', 'Arriendo Temporal'];
  const typeOptions = ['Departamentos',
    'Casas',
    'Oficinas',
    'Parcelas',
    'Locales',
    'Terrenos',
    'Sitios',
    'Bodegas',
    'Industriales',
    'Agricolas',
    'OtrosInmuebles',
    'Estacionamientos',
    'Loteos'
  ];


  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      contract: contractOptions[0],
      type: typeOptions[0],
      address: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.address) {
        errors.address = 'Dirección requerida';
      }
      return errors;
    },
  });

  return (

    < Box pos="relative"
      p="md"
      style={{
        borderRadius: 'lg',
        boxShadow: 'md',
      }
      }
    >
      <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <form onSubmit={form.onSubmit((values: any) => handleSearch(values))}>
        <Group gap="xl" justify="center" style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '16px',
        }}>
          <Box>
            <NativeSelect
              data={contractOptions}
              {...form.getInputProps('contract')}
            />
          </Box>
          <Box>
            <NativeSelect
              data={typeOptions}
              {...form.getInputProps('type')}
            />
          </Box>
          <Box style={{ width: '15em' }} >
            <TextInput
              placeholder="Ingresa dirección o comuna"
              {...form.getInputProps('address')}
            />
          </Box>
          <Box >
            <Button type="submit" >Buscar</Button>
          </Box>

        </Group>
      </form>
    </Box >
  );

};