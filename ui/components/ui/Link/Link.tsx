import NextLink from 'next/link';

interface LinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
  }

export const Link = ({ href, children, className = '' }: LinkProps) => {
    return (
        <NextLink href={href} className={`underline ${className}`}>{children}</NextLink>
    )
}