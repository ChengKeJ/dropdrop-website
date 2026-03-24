import Home from "../pages/Home";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import FAQ from "../pages/FAQ";
import About from "../pages/About";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Changelog from "../pages/Changelog";
import EditorialPolicy from "../pages/EditorialPolicy";
import ResearchMethodology from "../pages/ResearchMethodology";
import NotFound from "../pages/NotFound";
import type { RouteComponentMap } from "./AppRoutes";

export const serverRouteComponents: RouteComponentMap = {
  home: Home,
  blogIndex: Blog,
  blogPost: BlogPost,
  faq: FAQ,
  about: About,
  privacy: Privacy,
  terms: Terms,
  changelog: Changelog,
  editorialPolicy: EditorialPolicy,
  researchMethodology: ResearchMethodology,
  notFound: NotFound,
};
