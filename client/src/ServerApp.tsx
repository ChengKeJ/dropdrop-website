import AppShell, { type AppShellProps } from "./App";
import { AppRoutes } from "./routes/AppRoutes";
import { serverRouteComponents } from "./routes/serverRoutes";

export default function ServerApp(props: Omit<AppShellProps, "children">) {
  return (
    <AppShell {...props}>
      <AppRoutes components={serverRouteComponents} />
    </AppShell>
  );
}
