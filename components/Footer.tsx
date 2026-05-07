import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <div className="layout-container py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-[13px] text-[#6B7280]">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/about"
              className="link-underline link-underline--lift text-[13px] text-[#6B7280] hover:text-[#C47A5B]"
            >
              About
            </Link>
            <Link
              href="/2026%20Anny_Lin%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline link-underline--lift text-[13px] text-[#6B7280] hover:text-[#C47A5B]"
            >
              Resume
            </Link>
            <Link
              href="https://www.linkedin.com/in/atylin/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline link-underline--lift text-[13px] text-[#6B7280] hover:text-[#C47A5B]"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
