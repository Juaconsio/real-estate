import { Button, Group, TextInput } from '@mantine/core';
import { Flex, Box, Paper, Text } from "@mantine/core";
import { login } from '../api/auth';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import handleResponse from '../components/notifications';

function Login() {
  const navigate = useNavigate()


  const handleSubmit = async (values: any) => {
    try {
      const res = await login(values);
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
      password: '',
    },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Correo Invalido'),
      password: (value: string) => value.length < 6 ? 'La contraeña es muy corta. Mínimo 6 caracteres' : null,
    }
  });

  return (
    <Flex style={{ height: "100vh", width: "100vw" }}>
      <Box
        style={{
          flex: 1,
          backgroundImage: "url('https://images.pexels.com/photos/2968141/pexels-photo-2968141.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>
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
          <Text ta="center" style={{ fontSize: "2.5em", paddingBottom: '0.5em' }}>Ingresa</Text>
          <form onSubmit={form.onSubmit((values: any) => handleSubmit(values))}>
            <TextInput
              label="Correo Electrónico"
              placeholder="your@email.com"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <br></br>
            <TextInput
              label="Contraseña"
              placeholder="Password"
              type="password"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />

            <Group justify="space-between" mt="md">
              <Text
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate('/registrate');
                }}
              >¿No tienes una cuenta?</Text>
              <Button type="submit">Entrar</Button>
            </Group>
          </form>

        </Paper>
      </Box>

    </Flex>
  );
}
export default Login;