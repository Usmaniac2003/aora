import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
      </Stack>
      {/* StatusBar configuration */}
      <StatusBar backgroundColor="#161612" style="light" />
    </>
  );
};

export default AuthLayout;
