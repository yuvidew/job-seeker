"use client"

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export const QueryProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider
                maxSnack={3}
                autoHideDuration={3000} style={{
                    fontSize: '1rem'
                }}
            >
                {children}
                <ReactQueryDevtools/>
            </SnackbarProvider>
        </QueryClientProvider>
    )
}
