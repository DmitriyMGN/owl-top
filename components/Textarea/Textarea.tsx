import { ITextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Textarea = forwardRef(({ error, className, ...props }: ITextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return (
		<div className={cn(styles.textAreaWrapper, className)}>
			<textarea
				className={cn(styles.textarea, {
					[styles.error]: error
				})}
				ref={ref}
				{...props}
			/>
			{error && <span className={styles.errorMessage} role="alert">{error.message}</span>}
		</div>

	);
});