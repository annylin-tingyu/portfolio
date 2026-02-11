import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-light-gray bg-white">
      <div className="mx-auto max-w-[880px] px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-[13px] text-mid-gray">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-mid-gray transition-colors duration-[120ms] hover:text-accent-hover-text"
            >
              Twitter
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-mid-gray transition-colors duration-[120ms] hover:text-accent-hover-text"
            >
              LinkedIn
            </Link>
            <Link
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-mid-gray transition-colors duration-[120ms] hover:text-accent-hover-text"
            >
              Dribbble
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
