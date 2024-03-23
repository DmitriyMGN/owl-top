import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import up from '@/public/upArrow.svg';
import close from '@/public/cross2.svg';
import menu from '@/public/menu.svg';

export const icons = {
	up,
	close,
	menu
};

export type IconName = keyof typeof icons;

export interface IButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: IconName
	appearance: 'primary' | 'white',
}