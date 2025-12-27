"use client";

import Image from "next/image";
import Dark from "@/public/images/kaufra-dark.png";
import Light from "@/public/images/kaufra-light.png";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";
import { APP_NAME } from "@/lib/constants";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <Image
      src={resolvedTheme === "dark" ? Light : Dark}
      alt={`${APP_NAME} logo`}
      width={60}
      height={50}
      priority
    />
  );
};

export default Logo;
