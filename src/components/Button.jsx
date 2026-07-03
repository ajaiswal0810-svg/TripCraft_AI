// src/components/Button.jsx
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

/**
 * TripCraft design tokens (see tailwind.config.js for the source of truth):
 * teal-900  #0F3D4D  — primary ink / primary button surface
 * coral-500 #E2572B  — compass-arrow accent, primary CTA on dark surfaces
 * gold-500  #E8A23D  — paper-plane accent, secondary CTA
 * cream-50  #FDF6EE  — page background
 */

const VARIANT_STYLES = {
  primary:
    "bg-[#0F3D4D] text-[#FDF6EE] hover:bg-[#0B2E3A] focus-visible:outline-[#0F3D4D] shadow-sm shadow-[#0F3D4D]/20",
  accent:
    "bg-[#E2572B] text-white hover:bg-[#CB4A21] focus-visible:outline-[#E2572B] shadow-sm shadow-[#E2572B]/30",
  gold:
    "bg-[#E8A23D] text-[#0F3D4D] hover:bg-[#D8912E] focus-visible:outline-[#E8A23D] shadow-sm shadow-[#E8A23D]/30",
  outline:
    "bg-transparent text-[#0F3D4D] border border-[#0F3D4D]/30 hover:border-[#0F3D4D] hover:bg-[#0F3D4D]/5 focus-visible:outline-[#0F3D4D]",
  outlineLight:
    "bg-transparent text-[#FDF6EE] border border-[#FDF6EE]/40 hover:border-[#FDF6EE] hover:bg-[#FDF6EE]/10 focus-visible:outline-[#FDF6EE]",
  ghost:
    "bg-transparent text-[#0F3D4D] hover:bg-[#0F3D4D]/5 focus-visible:outline-[#0F3D4D]",
};

const SIZE_STYLES = {
  sm: "text-sm px-4 py-2 gap-1.5 rounded-full",
  md: "text-[15px] px-6 py-3 gap-2 rounded-full",
  lg: "text-base px-8 py-4 gap-2.5 rounded-full",
};

/**
 * Button
 *
 * Polymorphic CTA used across TripCraft — renders a <button>, an <a>, or a
 * react-router <Link> depending on the props it receives.
 *
 * Props:
 *  - variant: "primary" | "accent" | "gold" | "outline" | "outlineLight" | "ghost"
 *  - size: "sm" | "md" | "lg"
 *  - to: react-router path -> renders <Link>
 *  - href: external url -> renders <a>
 *  - icon: lucide-react icon component, placed before label
 *  - iconAfter: lucide-react icon component, placed after label
 *  - loading: shows a spinner and disables interaction
 *  - fullWidth: stretches to container width
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    to,
    href,
    icon: Icon,
    iconAfter: IconAfter,
    loading = false,
    fullWidth = false,
    disabled = false,
    className = "",
    ...rest
  },
  ref
) {
  const classes = [
    "inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    VARIANT_STYLES[variant] || VARIANT_STYLES.primary,
    SIZE_STYLES[size] || SIZE_STYLES.md,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        Icon && <Icon className="h-4 w-4" aria-hidden="true" />
      )}
      {children && <span>{children}</span>}
      {!loading && IconAfter && <IconAfter className="h-4 w-4" aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} aria-disabled={disabled} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        target={rest.target || "_blank"}
        rel={rest.rel || "noopener noreferrer"}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} disabled={disabled || loading} {...rest}>
      {content}
    </button>
  );
});

export default Button;