import { notifications } from '@mantine/notifications';

const handleResponse = (res: any, successMessage: string) => {
  if (res.error) {
    notifications.show({
      title: 'Error',
      message: res.error.message || 'Ocurrió un error inesperado',
      color: 'red',
    });
    throw new Error(res.error.message || 'Error en la operación');
  }

  notifications.show({
    title: 'Éxito',
    message: successMessage,
    color: 'green',
  });

  return res.data;
};

export default handleResponse;