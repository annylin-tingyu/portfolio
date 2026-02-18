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
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline link-underline--lift text-[13px] text-[#6B7280] hover:text-[#4F46E5]"
            >
              Twitter
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline link-underline--lift text-[13px] text-[#6B7280] hover:text-[#4F46E5]"
            >
              LinkedIn
            </Link>
            <Link
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline link-underline--lift text-[13px] text-[#6B7280] hover:text-[#4F46E5]"
            >
              Dribbble
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
