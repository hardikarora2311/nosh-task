import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetaData({
  title = "Nosh Task Submission",
  description = "Submission for Nosh Task by Hardik Arora",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    icons,
    metadataBase: new URL("https://noshtask-hardik.vercel.app/"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
