import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ITabAttentionProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
	children?: ReactNode
}