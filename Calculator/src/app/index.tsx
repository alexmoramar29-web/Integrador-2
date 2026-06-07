import { Redirect } from 'expo-router';

export default function IndexScreen() {
  // Redirigimos automáticamente a tu diseño premium
  return <Redirect href="/(auth)/login" />;
}