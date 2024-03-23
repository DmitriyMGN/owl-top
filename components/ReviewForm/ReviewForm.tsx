'use client';
import { IReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Button, Input, Rating, Textarea } from '..';
import CloseIcon from '@/public/cross.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';
import { useState } from 'react';

const ReviewForm = ({ productId, className, isOpened, ...props }: IReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const onSubmit = (formData: IReviewForm) => {
		console.log(formData);
		formData.productId = productId;

		fetch("https://courses-top.ru/api/review/create-demo", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				formData
			),
		})
			.then((res) => {
				if (res.ok) {
					setIsSuccess(true);
					reset();
					return res.json();
				}
				setError('Что-то пошло не так');
				return Promise.reject(`Ошибка: ${res.status}`);
			});

	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', { required: { value: true, message: "Заполните имя" } })}
					placeholder='Имя'
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', { required: { value: true, message: "Заполните заголовок" } })}
					placeholder='Заголовок отзыва'
					className={styles.title}
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						rules={{ required: { value: true, message: "Заполните рейтинг" } }}
						render={({ field }) => (
							<Rating isEditable
								rating={field.value}
								ref={field.ref}
								setRating={field.onChange}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					>
					</Controller>

				</div>
				<Textarea
					{...register('description', { required: { value: true, message: "Заполните описание" } })}
					placeholder='Текст отзыва'
					className={styles.description}
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label='Текст отзыва'
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button appearance='primary' tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccess && <div className={cn(styles.success, styles.panel)} role="alert">
				<div className={styles.successTitle}>
					Ваш отзыв отправлен
				</div>
				<div>
					Спасибо, ваш отзыв будет опубликован после проверки.
				</div>
				<button
					className={styles.close}
					onClick={() => setIsSuccess(false)}
					aria-label='Закрыть оповещение'
				>
					<CloseIcon />
				</button>
			</div>}
			{error && <div className={cn(styles.error, styles.panel)} role="alert">
				{error}
				<button
					className={styles.close}
					onClick={() => setError('')}
					aria-label='Закрыть оповещение'
				>
					<CloseIcon />
				</button>
			</div>}
		</form>
	);
};

export default ReviewForm;