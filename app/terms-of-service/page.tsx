import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Revamp 180°",
  description:
    "The terms and conditions that govern your use of the Revamp 180° website and services.",
};

const sections: LegalSection[] = [
  {
    heading: "Acceptance of Terms",
    body: [
      "These Terms of Service (\"Terms\") govern your access to and use of the Revamp 180° website and services. By accessing our website or engaging our services, you agree to be bound by these Terms.",
      "If you do not agree with any part of these Terms, please do not use our website or services.",
    ],
  },
  {
    heading: "Services",
    body: [
      "Revamp 180° provides web design and development, app development, branding, UI/UX design, social media management, and video editing services. The specific scope, deliverables, and timelines for each engagement are agreed in a separate proposal or quote.",
    ],
  },
  {
    heading: "Quotes & Payments",
    body: [
      "Quotes we provide are based on the information available at the time and remain valid for the period stated. Any change in scope may affect pricing and timelines.",
      "Payment terms, including deposits and milestones, are set out in your project agreement. Work may be paused if agreed payments are not received.",
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "Upon full payment, ownership of the final deliverables created specifically for your project transfers to you, unless stated otherwise in your agreement.",
      "We retain the right to display completed work in our portfolio and marketing materials unless you request otherwise in writing.",
    ],
  },
  {
    heading: "Client Responsibilities",
    body: [
      "You agree to provide accurate information, timely feedback, and any content or access needed to complete the work. Delays in providing these may affect agreed timelines.",
      "You are responsible for ensuring that any materials you supply do not infringe the rights of third parties.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "Our services are provided on a professional best-effort basis. To the fullest extent permitted by law, Revamp 180° is not liable for any indirect, incidental, or consequential damages arising from the use of our website or services.",
    ],
  },
  {
    heading: "Changes to These Terms",
    body: [
      "We may update these Terms from time to time. The latest version will always be available on this page, and continued use of our services constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "Contact Us",
    body: [
      "If you have any questions about these Terms, email us at info@revamp180.com.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="Please read these terms carefully — they govern your use of our website and the services we provide."
      updated="June 13, 2026"
      sections={sections}
    />
  );
}
