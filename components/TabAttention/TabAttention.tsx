'use client';
import { ITabAttentionProps } from './TabAttention.props';
import styles from './TabAttention.module.css';
import cn from 'classnames';
import { KeyboardEvent, useState } from 'react';

export const TabAttention = ({ ...props }: ITabAttentionProps): JSX.Element => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);

	const skipContentAction = (key: KeyboardEvent) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			// key.preventDefault();

		}
		setIsSkipLinkDisplayed(false);
	};

	return (
		<a
			onFocus={() => setIsSkipLinkDisplayed(true)}
			tabIndex={1}
			className={cn(styles.skipLink, {
				[styles.displayed]: isSkipLinkDisplayed
			})}
			onKeyDown={skipContentAction}
			{...props}
		>
			Сразу к содержанию
		</a >
	);
};