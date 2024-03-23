import { TagProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';

export const Tag = ({ children, className, size = 's', color = 'ghost', href, ...props }: TagProps): JSX.Element => {
	return (
		<>
			<div className={cn(className, styles.tag, {
				[styles.s]: size === 's',
				[styles.b]: size === 'b',
				[styles.primary]: color === 'primary',
				[styles.ghost]: color === 'ghost',
				[styles.red]: color === 'red',
				[styles.green]: color === 'green',
				[styles.gray]: color === 'gray'
			})}
				{...props}
			>
				{href ? <a href={href}>{children}</a> : <>{children}</>}
			</div>
		</>
	);
};