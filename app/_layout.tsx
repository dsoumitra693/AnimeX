import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { Stack } from 'expo-router'
import { StatusBar, } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from '@/Theme';

const queryClient = new QueryClient()
const MainLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <StatusBar backgroundColor={theme.colors.surface} />
        <Stack screenOptions={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarColor: "transparent",
          statusBarStyle: "inverted",
          navigationBarColor: "#000",
        }} />
      </PaperProvider>
    </QueryClientProvider>
  )
}

export default MainLayout