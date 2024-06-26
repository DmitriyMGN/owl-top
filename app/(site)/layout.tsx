
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';
import { Footer, Sidebar, Up } from '@/components';
import StoreProvider from '@/lib/StoreProvider';
import Header from '@/components/Header/Header';


const noto_sans_KR = Noto_Sans_KR({
	variable: '--noto-sans-font',
	weight: ['300', '400', '500', '700'],
	style: ['normal'],
	fallback: ['sans-serif'],
	subsets: ['cyrillic', 'cyrillic', 'latin', 'latin-ext'],
	preload: true,
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {


	return (
		<html lang="ru">
			<body className={`${noto_sans_KR.className} ${styles.wrapper}`}>
				<StoreProvider>
					<Header className={styles.header} />
					<Sidebar className={styles.sidebar} />
					<main className={styles.body} role='main'>
						{children}
					</main>
					<Footer className={styles.footer} />
					<Up />
				</StoreProvider>
			</body>
		</html>

	);
}
