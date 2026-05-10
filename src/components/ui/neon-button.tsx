"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative group border text-foreground mx-auto text-center rounded-full font-medium tracking-[0.15em] uppercase inline-flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer no-underline",
  {
    variants: {
      variant: {
        default:
          "bg-[#EA0100]/5 hover:bg-[#EA0100]/15 border-[#EA0100]/40 hover:border-[#EA0100]/80",
        solid:
          "bg-[#EA0100] hover:bg-[#c40100] text-foreground border-transparent hover:border-foreground/30",
        ghost:
          "border-transparent bg-transparent hover:border-foreground/30 hover:bg-foreground/5",
      },
      size: {
        default: "px-7 py-2 text-sm",
        sm: "px-4 py-1 text-xs",
        lg: "px-10 py-3.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  neon?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type NeonButtonProps =
  | (CommonProps &
      Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
        href?: undefined;
      })
  | (CommonProps &
      Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
        href: string;
      });

function NeonGlow({ neon, position }: { neon: boolean; position: "top" | "bottom" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute h-px transition-all duration-500 ease-in-out inset-x-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-[#EA0100] to-transparent hidden",
        position === "top"
          ? "-top-px opacity-0 group-hover:opacity-100"
          : "-bottom-px opacity-30 group-hover:opacity-100",
        neon && "block",
      )}
    />
  );
}

const NeonButton = React.forwardRef<HTMLElement, NeonButtonProps>(
  ({ className, neon = true, size, variant, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if ("href" in props && props.href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <NeonGlow neon={neon} position="top" />
          {children}
          <NeonGlow neon={neon} position="bottom" />
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <NeonGlow neon={neon} position="top" />
        {children}
        <NeonGlow neon={neon} position="bottom" />
      </button>
    );
  },
);

NeonButton.displayName = "NeonButton";

export { NeonButton, buttonVariants };
