import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { NuqsAdapter } from "nuqs/adapters/react";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import DashboardLayout from "./components/layouts/dashboard-layout";

import DepartmentListPage from "./app/dashboard/departments/page";
import TierListPage from "./app/dashboard/tiers/page";
import LocationListPage from "./app/dashboard/locations/page";
import EmployeeListPage from "./app/dashboard/employees/page";
import NotFoundPage from "./app/dashboard/not-found/page";

import { Toaster } from "./components/ui/sonner";
import CustomQueriesPage from "./app/dashboard/custom-queries/page";
import { toast } from "sonner";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error);
      // @ts-ignore
      toast.error(error.response.data.title, {
        // @ts-ignore
        description: error.response.data.detail,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.log(error);
      // @ts-ignore
      toast.error(error.response.data.title, {
        // @ts-ignore
        description: error.response.data.detail,
      });
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/dashboard/departments" replace />}
            />

            <Route path="dashboard" element={<DashboardLayout />}>
              <Route path="departments" element={<DepartmentListPage />} />
              <Route path="tiers" element={<TierListPage />} />
              <Route path="locations" element={<LocationListPage />} />
              <Route path="employees" element={<EmployeeListPage />} />
              <Route path="custom-queries" element={<CustomQueriesPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NuqsAdapter>
  </StrictMode>
);
