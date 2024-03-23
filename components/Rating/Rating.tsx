'use client';

import { IRatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from 'react';
import StarLogo from '../../public/star.svg';

export const Rating = forwardRef(({ isEditable = false, rating, setRating, error, tabIndex, ...props }: IRatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {

	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
	const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

	const computeFocus = (r: number, i: number): number => {
		if (!isEditable) {
			return - 1;
		}
		if (!rating && i == 0) {
			return tabIndex ?? 0;
		}
		if (r == i + 1) {
			return tabIndex ?? 0;
		}
		return -1;
	};

	useEffect(() => {
		const constructorRating = (currentRating: number): void => {
			const updatedArray = ratingArray.map((item: JSX.Element, index: number) => {
				return (
					<span
					// className={cn(styles.star, {
					// 	[styles.fill]: index < currentRating,
					// 	[styles.editable]: isEditable
					// })}
					// onMouseEnter={() => changeDisplay(index + 1)}
					// onMouseLeave={() => changeDisplay(rating)}
					// onClick={() => onClickHandler(index + 1)}
					// tabIndex={computeFocus(rating, index)}
					// onKeyDown={handleKey}
					// ref={r => ratingArrayRef.current?.push(r)}
					>
						<StarLogo
							className={cn(styles.star, {
								[styles.fill]: index < currentRating,
								[styles.editable]: isEditable
							})}
							onMouseEnter={() => changeDisplay(index + 1)}
							onMouseLeave={() => changeDisplay(rating)}
							onClick={() => onClickHandler(index + 1)}
							tabIndex={computeFocus(rating, index)}
							onKeyDown={handleKey}
							role={isEditable ? 'slider' : ''}
							aria-valuenow={rating}
							aria-valuemax={5}
							aria-valuemin={1}
							aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг' + rating)}
							aria-invalid={error ? true : false}
						/>
					</span>

				);
			});
			setRatingArray(updatedArray);
		};


		const changeDisplay = (index: number) => {
			if (!isEditable) {
				return;
			}
			constructorRating(index);
		};

		const onClickHandler = (index: number) => {
			if (!isEditable || !setRating) {
				return;
			}
			setRating(index);
		};


		const handleKey = (e: KeyboardEvent) => {
			if (!isEditable || !setRating) {
				return;
			}
			if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
				if (!rating) {
					setRating(1);
				} else {
					e.preventDefault();
					setRating(rating < 5 ? rating + 1 : 5);
				}
				ratingArrayRef.current[rating]?.focus();
			}
			if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
				e.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
			}
		};

		constructorRating(rating);

	}, [rating, tabIndex]);



	return (
		<div className={cn(styles.ratingWrapper, {
			[styles.error]: error
		})} ref={ref} {...props}>
			{ratingArray.map((item, index) => <span key={index}>{item}</span>)}
			{error && <span className={styles.errorMessage} role="alert">{error.message}</span>}
		</div>
	);
});