import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="container-page py-16 text-center">
      <Image
        src="/images/empty.svg"
        alt=""
        width={140}
        height={140}
        className="mx-auto"
      />
      <p className="mt-6 font-semibold text-leaf">Error 404</p>
      <h1 className="mt-2 font-display text-3xl text-forest md:text-4xl">
        This page has not bloomed
      </h1>
      <p className="mx-auto mt-3 max-w-md leading-7 text-muted">
        The link may be incorrect, or the internship or company does not exist.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link href="/internships" className="btn btn-secondary">
          Browse Internships
        </Link>
      </div>
    </div>
  );
}
