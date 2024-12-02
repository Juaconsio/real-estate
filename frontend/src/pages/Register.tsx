import { Button, Group, TextInput } from '@mantine/core';
import { Flex, Box, Paper, Text } from "@mantine/core";
import { register } from '../api/auth';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import handleResponse from '../components/notifications';

function Register() {
  const navigate = useNavigate()


  const handleSubmit = async (values: any) => {
    try {
      const res = await register(values);
      handleResponse(res, 'Usuario registrado correctamente');
      navigate('/');
    } catch (error) {
      console.error("Error registrando usuario:", error);
    }
  }


  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Correo Invalido'),
      name: (value: string) => value === null ? 'Añade tu nombre' : null,
      password: (value: string) => value.length < 6 ? 'La contraeña es muy corta. Mínimo 6 caracteres' : null,
    }
  });

  return (
    <Flex style={{ height: "100vh", width: "100vw" }}>
      {/* Left side with the form */}
      <Box
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Paper withBorder p="lg" shadow="md" style={{ width: "80%", maxWidth: 400 }}>
          <Text ta="center" style={{ fontSize: "2.5em" }}>Registrarse</Text>
          <form onSubmit={form.onSubmit((values: any) => handleSubmit(values))}>
            <TextInput
              withAsterisk
              label="Correo Electrónico"
              placeholder="your@email.com"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Nombre"
              placeholder="Nombre"
              type="nombre"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Contraseña"
              placeholder="Contraseña"
              type="password"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />

            <Group justify="space-between" mt="md">
              <Text
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate('/ingresa');
                  console.log('click');
                }}
              >¿Ya tienes una cuenta?</Text>
              <Button type="submit">Submit</Button>
            </Group>
          </form>

        </Paper>
      </Box>
      <Box
        style={{
          flex: 1,
          backgroundImage: "url('https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>
    </Flex>
  );
}
export default Register;