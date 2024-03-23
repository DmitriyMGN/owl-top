'use client';
import { IHeader } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import Logo from '@/public/logo.svg';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { motion, useReducedMotion } from 'framer-motion';
import { Sidebar } from '..';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = ({ className, ...props }: IHeader): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const pathName = usePathname();
	const shouldReduceMotion = useReducedMotion();

	useEffect(() => {
		setIsOpened(false);
	}, [pathName]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20
			}
		},
		closed: {
			opacity: shouldReduceMotion ? 1 : 0,
			x: '100%',
		}
	};

	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
			<ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)} />
			<motion.div
				variants={variants}
				initial={'closed'}
				animate={isOpened ? 'opened' : 'closed'}
				className={styles.mobileMenu}
			>
				<Sidebar />
				<ButtonIcon
					className={styles.menuClose}
					appearance='white'
					icon='close'
					onClick={() => setIsOpened(false)}
				/>
			</motion.div>
		</header>
	);
};

export default Header;