import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact · Save on Renewables",
  description: "Get in touch with the Save on Renewables team.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
