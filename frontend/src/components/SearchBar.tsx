

import { getSeachedProperties } from '../api/property';
import { useForm } from '@mantine/form';
import { Box, Group, NativeSelect, TextInput, Button } from '@mantine/core';
import { useArrayContext } from '../context/data';


export default function SearchBar() {
  const { setArrayData } = useArrayContext();
  const handleSearch = async (values: any) => {
    try {
      const data = await getSeachedProperties(values);
      setArrayData(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
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
    <Box
      p="md"
      style={{
        backgroundColor: 'grey',
        borderRadius: 'lg',
        boxShadow: 'md',
      }}
    >
      <form onSubmit={form.onSubmit((values: any) => handleSearch(values))}>
        <Group gap="md">
          <NativeSelect
            label="Tipo de Contrato"
            data={contractOptions}
            {...form.getInputProps('contract')}
          />
          <NativeSelect
            label="Tipo de Propiedad"
            data={typeOptions}
            {...form.getInputProps('type')}
          />
          <TextInput
            label="Dirección"
            placeholder="Ej: Calle Falsa 123"
            {...form.getInputProps('address')}
          />
          <Box>
            <Button type="submit">Buscar</Button>
          </Box>

        </Group>
      </form>
    </Box>
  );

};