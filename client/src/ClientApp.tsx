import { Suspense } from "react";
import AppShell, { type AppShellProps } from "./App";
import { AppRoutes } from "./routes/AppRoutes";
import { clientRouteComponents } from "./routes/clientRoutes";

export default function ClientApp(props: Omit<AppShellProps, "children">) {
  return (
    <AppShell {...props}>
      <Suspense fallback={null}>
        <AppRoutes components={clientRouteComponents} />
      </Suspense>
    </AppShell>
  );
}
