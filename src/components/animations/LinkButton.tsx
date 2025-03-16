'use client';

import Link from 'next/link';
import { SpotlightButton, SpotlightButtonProps } from './SpotlightButton';

interface LinkButtonProps extends Omit<SpotlightButtonProps, 'onClick'> {
    href: string;
}

export function LinkButton({ href, children, ...props }: LinkButtonProps) {
    return (
        <Link href={href}>
            <SpotlightButton {...props}>
                {children}
            </SpotlightButton>
        </Link>
    );
} 