import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	children: ReactNode,
	size?: 'b' | 'm' | 's'
}