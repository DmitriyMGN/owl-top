import { PProps } from './P.props';
import styles from './P.module.css';
import cn from 'classnames';

export const P = ({ children, size = 's', ...props }: PProps): JSX.Element => {
	return (
		<>
			<p className={cn(styles.paragraph, {
				[styles.s]: size === 's',
				[styles.b]: size === 'b',
				[styles.m]: size === 'm',
			})}
				{...props}
			>{children}
			</p>
		</>
	);
};