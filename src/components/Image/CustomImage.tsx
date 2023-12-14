import React from "react";
import Image from "next/image";

type Variant = "mobile" | "small" | "medium" | "large" | "extra-large" | "icon";

interface Props {
  variant: Variant;
  src: string;
  alt: string;
  className?: string;
}

const imageSizes: Record<Variant, { width: number; height: number }> = {
  mobile: { width: 120, height: 100 },
  icon: { width: 50, height: 50 },
  small: { width: 170, height: 130 },
  medium: { width: 230, height: 190 },
  large: { width: 300, height: 280 },
  "extra-large": { width: 450, height: 370 },
};

const CustomImage = ({ variant, src, alt, className }: Props) => {
  const { width, height } = imageSizes[variant];

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: Apx) and (resolution: 1dppx) Npx,
            (min-width: (A+1)px) and (resolution: 1dppx) Mpx,
            (max-width: Apx) and (min-resolution: 2dppx) (M+1)px,
            (min-width: (A+1)px) and (min-resolution: 2dppx) (((M+1)*5)+1)px"
      className={className}
      decoding="async"
      loading="lazy"
    />
  );
};

export default CustomImage;
