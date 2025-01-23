"use client";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import type { PropsWithChildren } from "react";
import { Toaster } from "../components/common/Toaster";
import { AppLayout } from "../components/Layouts/AppLayout";
import "../globals.css";
import "../i18n/config";
import { AuthSessionProvider } from "../provider/AuthSessionProvider";
import { LightThemeProvider } from "../provider/LightThemeProvider";
import { SessionLoader } from "../provider/SessionLoader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <SessionLoader>
            <LocalizationProvider
              dateAdapter={AdapterLuxon}
              adapterLocale="en-us"
            >
              <QueryClientProvider client={queryClient}>
                <LightThemeProvider>
                  <AppLayout>{children}</AppLayout>
                  <Toaster />
                  <ReactQueryDevtools initialIsOpen={false} />
                </LightThemeProvider>
              </QueryClientProvider>
            </LocalizationProvider>
          </SessionLoader>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
