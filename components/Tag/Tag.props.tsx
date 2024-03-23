import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode,
	size?: 'b' | 's',
	color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary';
	href?: string;
}