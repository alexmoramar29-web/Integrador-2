import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Esto elimina la barra blanca de "Home" por completo
      }}
    />
  );
}