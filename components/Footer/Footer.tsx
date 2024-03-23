import { IFooter } from './Footer.props';
import Link from 'next/link';
import styles from './Footer.module.css';
// import cn from 'classnames';

export const Footer = ({ className, ...props }: IFooter): JSX.Element => {
	return (
		<footer className={className} {...props}>
			<p className={styles.footerParagraph}>OwlTop © 2020 - 2024 Все права защищены</p>
			<div className={styles.footerLinkContainer}>
				<Link className={styles.footerLink} href="#">Пользовательское соглашение</Link>
				<Link className={styles.footerLink} href="#">Политика конфиденциальности</Link>
			</div>
		</footer>
	);
};