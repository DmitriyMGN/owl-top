'use client';

import { IProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Button, Card, Divider, Rating, Review, Tag } from '..';
import { declOfNum, priceRu } from '@/helpers/helpers';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

const Product = motion(forwardRef(({ product, className, ...props }: IProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);
	// const countReviewPx = (product.reviews.length * (85 + 20)) + 220;

	const variants = {
		visible: {
			opacity: 1,
			height: 'auto'
		},
		hidden: {
			opacity: 0,
			height: 0,
			overflow: 'hidden'
		}
	};



	const scrollToReview = () => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		reviewRef.current?.focus();
	};

	return (
		<div className={className} ref={ref} {...props}>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image
						src={"https://courses-top.ru" + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>
					{product.title}
				</div>
				<div className={styles.price}>
					<span><span className='visualyHidden'>цена</span>{priceRu(product.price)}</span>
					{product.oldPrice && <Tag className={styles.oldPrice} color='green'>
						<span className='visualyHidden'>скидка</span>
						{priceRu(product.price - product.oldPrice)}
					</Tag>}
				</div>
				<div className={styles.credit}>
					<span className='visualyHidden'>кредит</span>
					{priceRu(product.credit)}/<span className={styles.month}>мес</span>
				</div>
				<div className={styles.rating}>
					<span className='visualyHidden'>{'рейтинг ' + (product.reviewAvg ?? product.initialRating)}</span>
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>
				<div className={styles.tags}>
					{product.categories.map(c => <Tag className={styles.category} key={c} color='ghost'>{c}</Tag>)}
				</div>
				<div className={styles.priceTitle} aria-hidden={true}>
					цена
				</div>
				<div className={styles.creditTitle} aria-hidden={true}>
					кредит
				</div>
				<div className={styles.rateTitle}>
					<a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a>
				</div>
				<Divider className={styles.hr} />
				<div className={styles.description}>
					{product.description}
				</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages &&
						<div className={styles.advantages}>
							<div className={styles.advTitle}>Преимущества</div>
							<div>{product.advantages}</div>
						</div>
					}

					{product.disadvantages && <div className={styles.disadvantages}>
						<div className={styles.advTitle}>Недостатки</div>
						<div>{product.disadvantages}</div>
					</div>}


				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button className={styles.reviewButton}
						appearance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
						aria-expanded={isReviewOpened}
					>Читать отзывы</Button>
				</div>
			</Card>
			<motion.div
				initial='hidden'
				variants={variants}
				animate={isReviewOpened ? 'visible' : 'hidden'}
			>
				<Card
					className={styles.reviews}
					color='blue'
					ref={reviewRef}
					tabIndex={isReviewOpened ? 0 : -1}
				>
					{product.reviews.map(r => (
						<div key={r._id}>
							<Review review={r} />
							<Divider />
						</div>
					))}
					<ReviewForm productId={product._id} isOpened={isReviewOpened} />
				</Card>
			</motion.div>
		</div>
	);
}));

export default Product;