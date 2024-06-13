"use client";

import { QueryClient, QueryClientProvider } from "react-query";

interface QueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 2000,
      retry: 2,
    },
    mutations: {
      retryDelay: 2000,
      retry: 2,
    },
  },
});

const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
