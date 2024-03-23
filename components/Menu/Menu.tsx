"use client";

import { IMenuProps } from './Menu.props';
import styles from './Menu.module.css';
import { FirstLevelMenuItem, MenuItem, PageItem } from '@/interfaces/menu.interface';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { KeyboardEvent, useEffect, useState } from 'react';
import { firstLevelMenu } from '@/helpers/helpers';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setFirstCategory } from '@/lib/features/server-slice';
import { motion, useReducedMotion } from 'framer-motion';

export default function Menu({ ...props }: IMenuProps) {
	const [menuData, setMenuData] = useState<MenuItem[]>([]);
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
	const dispatch = useAppDispatch();
	const firstCategory = useAppSelector(state => state.serverSlice.value.firstCategory);
	const shouldReduceMotion = useReducedMotion();
	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion ? {} : {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: { marginBottom: 0 }
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 29
		},
		hidden: {
			opacity: shouldReduceMotion ? 1 : 0,
			height: 0
		}
	};

	useEffect(() => {
		fetch('https://courses-top.ru/api/top-page/find', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'firstCategory': firstCategory
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.then((data) => {
				return setMenuData(data);
			});

	}, [firstCategory]);

	const changeCategoryHandler = (firstCategoryId: number): void => {
		dispatch(setFirstCategory(firstCategory !== undefined ? firstCategoryId : null));
	};

	const openSecondLevel = (secondCategory: string) => {
		return setMenuData(menuData.map(m => {
			if (m._id.secondCategory === secondCategory) {
				setAnnounce(m.isOpened ? 'closed' : 'opened');
				m.isOpened = !m.isOpened;
			}
			return m;
		}));
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildFirstLevel = () => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(m => (
					<li
						key={m.route}
					>
						<Link href={`/${m.route}`} className={styles.firstLevelLink} onClick={() => changeCategoryHandler(m.id)}>
							<div className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: m.id === firstCategory
							})} >
								{m.icon}
								<span>{m.name}</span>
							</div>
						</Link>
						{m.id === firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menu: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menuData.map(m => {
					if (m.pages.map(p => p.alias).includes(usePathname().split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<li key={m._id.secondCategory}>
							<button className={styles.secondLevel}
								onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
								onClick={() => openSecondLevel(m._id.secondCategory)}
							>{m._id.secondCategory}</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(m.pages, menu.route, m.isOpened ?? false)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(p => (
				<motion.li
					key={p._id}
					variants={variantsChildren}
				>
					<Link
						aria-current={`/${route}/${p.alias}` === usePathname() ? 'page' : false}
						tabIndex={isOpened ? 0 : -1}
						href={`/${route}/${p.alias}`}
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: `/${route}/${p.alias}` === usePathname()
						})}>
						{p.category}
					</Link>

				</motion.li>

			))
		);
	};


	return (
		<nav className={styles.menu} role='navigation' {...props}>
			{announce && <span role="log" className='visualyHidden'>{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
			{buildFirstLevel()}
		</nav>
	);
}