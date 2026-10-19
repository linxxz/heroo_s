import Link from 'next/link';

export function LogoMark({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
      <rect width="30" height="30" rx="9" fill="#C3EE3A" />
      <path d="M9 8v14M21 8v14M9 15h12" stroke="#0A0C09" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ href }) {
  return (
    <Link href={href} className="logo" aria-label="heroo — home">
      <LogoMark />
      heroo
    </Link>
  );
}
