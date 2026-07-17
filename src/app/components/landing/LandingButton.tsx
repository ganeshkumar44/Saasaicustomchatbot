import { Link } from 'react-router';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';

type LandingButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface LandingButtonBaseProps {
  variant?: LandingButtonVariant;
  className?: string;
  children: ReactNode;
}

type LandingButtonAsButton = LandingButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    to?: undefined;
  };

type LandingButtonAsAnchor = LandingButtonBaseProps & {
  href: string;
  to?: undefined;
};

type LandingButtonAsLink = LandingButtonBaseProps & {
  to: string;
  href?: undefined;
};

export type LandingButtonProps =
  | LandingButtonAsButton
  | LandingButtonAsAnchor
  | LandingButtonAsLink;

const VARIANT_CLASSES: Record<LandingButtonVariant, string> = {
  primary:
    'bg-[#2563EB] text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20',
  secondary:
    'bg-[#7C3AED] text-white hover:bg-violet-700 shadow-lg shadow-violet-500/20',
  outline:
    'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
  ghost: 'text-slate-700 hover:bg-slate-100',
};

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

export function LandingButton(props: LandingButtonProps) {
  const { variant = 'primary', className, children } = props;
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={classes}>
        {children}
      </a>
    );
  }

  const {
    type = 'button',
    variant: _variant,
    className: _className,
    children: _children,
    href: _href,
    to: _to,
    ...buttonProps
  } = props as LandingButtonAsButton;
  return (
    <button {...buttonProps} type={type} className={classes}>
      {children}
    </button>
  );
}
