import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { Meta } from "@/components/primitives";

/** Explicit, legible resume download with file metadata attached. */
export function ResumeAction() {
  return (
    <a
      href={profile.resume}
      download
      className="group flex w-full items-center justify-between gap-6 border border-[var(--color-rule-strong)] px-5 py-4 transition-colors duration-300 hover:border-accent sm:w-auto"
    >
      <span className="flex flex-col gap-1">
        <span className="text-base font-medium transition-colors duration-300 group-hover:text-accent">
          Download resume
        </span>
        <Meta>PDF · aman-aditya-resume.pdf</Meta>
      </span>
      <ArrowDown
        className="h-5 w-5 shrink-0 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-y-1"
        aria-hidden
      />
    </a>
  );
}
