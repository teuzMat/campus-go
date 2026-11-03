import { Stack } from 'expo-router';
import { ExpensesContextProvider } from '../store/expenses-context';

export default function RootLayout() {
  return (
    <ExpensesContextProvider>
      <Stack 
        screenOptions={{ 
          headerStyle: { backgroundColor: '#0B0F19' },
          headerTintColor: '#FFFFFF',
          contentStyle: { backgroundColor: '#0B0F19' }
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="task/[id]" options={{ title: 'Tarefa' }} />
        <Stack.Screen name="new-task" options={{ presentation: 'modal', title: 'Nova Tarefa' }} />
      </Stack>
    </ExpensesContextProvider>
  );
}