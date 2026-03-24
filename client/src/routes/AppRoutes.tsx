import type { ComponentType } from "react";
import { Route, Switch } from "wouter";
import { ROUTE_PATHS, type RouteId } from "@/lib/routes";

export type RouteComponent = ComponentType<any>;
export type RouteComponentMap = Record<RouteId, RouteComponent>;

interface AppRoutesProps {
  components: RouteComponentMap;
}

export function AppRoutes({ components }: AppRoutesProps) {
  return (
    <Switch>
      <Route path={ROUTE_PATHS.home} component={components.home} />
      <Route path={ROUTE_PATHS.blogIndex} component={components.blogIndex} />
      <Route path={ROUTE_PATHS.blogPost} component={components.blogPost} />
      <Route path={ROUTE_PATHS.faq} component={components.faq} />
      <Route path={ROUTE_PATHS.about} component={components.about} />
      <Route path={ROUTE_PATHS.privacy} component={components.privacy} />
      <Route path={ROUTE_PATHS.terms} component={components.terms} />
      <Route path={ROUTE_PATHS.changelog} component={components.changelog} />
      <Route path={ROUTE_PATHS.editorialPolicy} component={components.editorialPolicy} />
      <Route path={ROUTE_PATHS.researchMethodology} component={components.researchMethodology} />
      <Route path={ROUTE_PATHS.notFound} component={components.notFound} />
      <Route component={components.notFound} />
    </Switch>
  );
}
