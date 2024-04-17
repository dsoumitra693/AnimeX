import React from 'react'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()
const MainLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarColor: "transparent",
          statusBarStyle: "light",
          navigationBarColor: "#000",
        }} />
    </QueryClientProvider>
  )
}

export default MainLayout