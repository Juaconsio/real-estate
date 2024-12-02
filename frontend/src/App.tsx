import { Center } from "@mantine/core";
import AppRoutes from "./routes/router";
import { ArrayProvider } from './context/data';

export default function App() {
  return (
    <Center h="100vh">
      <ArrayProvider>
        <AppRoutes />
      </ArrayProvider>
    </Center>
  );
}
