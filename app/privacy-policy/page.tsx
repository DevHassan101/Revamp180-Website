import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Revamp 180°",
  description:
    "How Revamp 180° collects, uses, and protects the personal information you share with us.",
};

const sections: LegalSection[] = [
  {
    heading: "Introduction",
    body: [
      "Revamp 180° (\"we\", \"us\", or \"our\") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what we collect, how we use it, and the choices you have.",
      "By using our website or services, you agree to the practices described in this policy.",
    ],
  },
  {
    heading: "Information We Collect",
    body: [
      "Information you provide directly: your name, email address, phone number, company details, and any message or project information you submit through our contact, quote, or consultation forms.",
      "Information collected automatically: basic usage data such as your browser type, device, and pages visited, gathered through cookies and similar technologies to help us improve the site.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "To respond to your enquiries, prepare quotes, and deliver the services you request.",
      "To communicate with you about your project, updates, and relevant offers you have asked for.",
      "To maintain, secure, and improve our website and services.",
    ],
  },
  {
    heading: "Sharing Your Information",
    body: [
      "We do not sell your personal information. We may share it only with trusted service providers who help us operate our business (for example, email or hosting providers), and only to the extent needed to deliver our services.",
      "We may also disclose information where required by law or to protect our legal rights.",
    ],
  },
  {
    heading: "Data Retention & Security",
    body: [
      "We keep your information only as long as necessary to fulfil the purposes described in this policy or as required by law.",
      "We use reasonable technical and organisational measures to protect your data. However, no method of transmission over the internet is completely secure.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information at any time. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "If you have any questions about this Privacy Policy or how we handle your data, email us at info@revamp180.com.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Your privacy matters to us. This page explains what information we collect and how we use and protect it."
      updated="June 13, 2026"
      sections={sections}
    />
  );
}
