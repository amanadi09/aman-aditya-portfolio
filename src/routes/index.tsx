import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { Opening } from "@/sections/opening";
import { SelectedWork } from "@/sections/selected-work";
import { Method } from "@/sections/method";
import { TechnicalDNA } from "@/sections/technical-dna";
import { ExperienceSection } from "@/sections/experience";
import { Credentials } from "@/sections/credentials";
import { Contact } from "@/sections/contact";

const title = "Aman Aditya — Software Engineer";
const description =
  "Software engineer in India working across React, TypeScript, Node.js and SQL, with production experience diagnosing web-based SaaS defects through requests, authentication flows and application logs.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Aman Aditya",
          jobTitle: "Software Engineer",
          email: "mailto:amanaditya565@gmail.com",
          telephone: "+91 7979928386",
          address: { "@type": "PostalAddress", addressCountry: "IN" },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Chandigarh University",
          },
          knowsAbout: [
            "Python",
            "JavaScript",
            "TypeScript",
            "SQL",
            "React.js",
            "Node.js",
            "REST APIs",
            "Root-cause analysis",
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Opening />
        <SelectedWork />
        <Method />
        <TechnicalDNA />
        <ExperienceSection />
        <Credentials />
        <Contact />
      </main>
    </>
  );
}
