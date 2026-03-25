import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const supportMailbox = {
  localPart: "support",
  domain: "dropdrophabit.com",
};

function buildSupportEmailHref() {
  return `mailto:${supportMailbox.localPart}@${supportMailbox.domain}`;
}

type SupportEmailButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  emailLabel?: string;
};

export function SupportEmailButton({
  className,
  emailLabel,
  children,
  ...props
}: SupportEmailButtonProps) {
  return (
    <a
      {...props}
      href={buildSupportEmailHref()}
      className={cn("text-left", className)}
    >
      {children ?? emailLabel ?? `${supportMailbox.localPart}@${supportMailbox.domain}`}
    </a>
  );
}
