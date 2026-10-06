import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal data, including cookies, analytics and newsletter sign-ups.`,
  path: "/privacy-policy",
  kicker: "Privacy",
});

export default function Page() {
  return (
    <LegalPage title="Privacy policy" path="/privacy-policy" updated="2026-10-06">
      <p>
        This policy explains what personal data {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when you use this website, why, and your
        rights. [TODO: add your legal name or business name and postal address — required in many countries.]
      </p>

      <h2>Data we collect</h2>
      <ul>
        <li><strong>Newsletter:</strong> if you subscribe, your email address. It is stored by our email provider (Buttondown) and used only to send the newsletter.</li>
        <li><strong>Analytics and advertising cookies (only with your consent):</strong> pages visited, clicks on outbound links, approximate location, device and browser type, via Google Analytics, Meta Pixel and TikTok Pixel.</li>
        <li><strong>Server logs:</strong> our hosting provider (Vercel) processes IP addresses and request data to deliver and secure the website.</li>
        <li><strong>Emails you send us:</strong> whatever you include in your message.</li>
      </ul>
      <p>Calculators run entirely in your browser. Numbers you enter are not sent to us or stored.</p>

      <h2>Cookies and consent</h2>
      <p>
        Analytics and advertising scripts load only after you click &ldquo;Accept&rdquo; on our cookie banner. You can change your choice at any time
        using &ldquo;Cookie settings&rdquo; in the footer. We store your choice in your browser&apos;s local storage.
      </p>

      <h2>Affiliate links</h2>
      <p>
        When you click an affiliate link and visit another company&apos;s website, that company may set its own cookies to record that you came from
        us. Their privacy policy applies on their website.
      </p>

      <h2>Legal bases (UK/EU visitors)</h2>
      <ul>
        <li>Consent — analytics and advertising cookies, newsletter.</li>
        <li>Legitimate interests — security, server logs, responding to emails.</li>
      </ul>

      <h2>How long we keep data</h2>
      <p>Newsletter data until you unsubscribe. Analytics data per the providers&apos; retention settings (we use the shortest practical period). [TODO: confirm your settings.]</p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live (for example under the GDPR, UK GDPR or California law), you may have the right to access, correct, delete or
        port your data, to object to or restrict processing, and to withdraw consent. To exercise these rights, email{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. You can also complain to your local data protection authority.
      </p>

      <h2>International transfers</h2>
      <p>Our service providers may process data outside your country. Where required, they use appropriate safeguards such as standard contractual clauses.</p>

      <h2>Children</h2>
      <p>This website is not intended for anyone under 18, and we do not knowingly collect their data.</p>

      <h2>Changes</h2>
      <p>We may update this policy. The date at the top shows when it last changed.</p>
    </LegalPage>
  );
}
