import { IAdavantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';
import CheckIcon from '@/public/advantages.svg';

export const Advantages = ({ advantages }: IAdavantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map(a => (
				<div key={a._id} className={styles.advantage}>
					<CheckIcon />
					<div className={styles.title}>{a.title}</div>
					<hr className={styles.vline} />
					<div>{a.description}</div>
				</div>
			))}
		</>
	);
};