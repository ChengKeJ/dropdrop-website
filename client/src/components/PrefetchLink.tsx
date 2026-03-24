import type {
  AnchorHTMLAttributes,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
  TouchEventHandler,
} from "react";
import { Link } from "wouter";
import { queueRoutePrefetch } from "@/routes/prefetch";

type PrefetchLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onMouseEnter" | "onFocus" | "onTouchStart"
> & {
  href: string;
  children: ReactNode;
  prefetch?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onFocus?: FocusEventHandler<HTMLAnchorElement>;
  onTouchStart?: TouchEventHandler<HTMLAnchorElement>;
};

export function PrefetchLink({
  href,
  children,
  prefetch = true,
  onMouseEnter,
  onFocus,
  onTouchStart,
  ...props
}: PrefetchLinkProps) {
  const triggerPrefetch = () => {
    if (prefetch) {
      queueRoutePrefetch(href);
    }
  };

  return (
    <Link href={href} asChild>
      <a
        {...props}
        href={href}
        onMouseEnter={(event) => {
          triggerPrefetch();
          onMouseEnter?.(event);
        }}
        onFocus={(event) => {
          triggerPrefetch();
          onFocus?.(event);
        }}
        onTouchStart={(event) => {
          triggerPrefetch();
          onTouchStart?.(event);
        }}
      >
        {children}
      </a>
    </Link>
  );
}
