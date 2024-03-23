"use client";

import { ISearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { useState, KeyboardEvent } from 'react';
import GlassIcon from '@/public/glass.svg';
import { useRouter } from 'next/navigation';

export const Search = ({ className, ...props }: ISearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch = () => {
		router.push(`/search?q=${search}`);
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			goToSearch();
		}
	};

	return (
		<form className={cn(className, styles.search)} {...props} role="search">
			<Input
				className={styles.input}
				placeholder='Поиск...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance='primary'
				className={styles.button}
				onClick={goToSearch}
				aria-label='Искать по сайту'
			>
				<GlassIcon />
			</Button>

		</form>
	);
};

