'use client';

import { firstLevelMenu } from '@/helpers/helpers';
import { notFound } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { useEffect } from 'react';
import { setFirstCategory } from '@/lib/features/server-slice';
// import { getPage } from '@/api/page';

// export async function generateMetadata({ params }: { params: { alias: string } }) {
// 	const page = await getPage(params.alias);
// 	return {
// 		title: page?.metaTitle
// 	};
// }

export default function Types({ params }: { params: { types: string } }): JSX.Element {
	const categoryItem = firstLevelMenu.find(m => m.route == params.types);
	const dispatch = useAppDispatch();
	// const page = getPage(params.types);

	if (!categoryItem) {
		return notFound();
	}

	useEffect(() => {
		dispatch(setFirstCategory(categoryItem !== undefined ? categoryItem.id : null));
	});
	return (
		<div>
			Страничка типа {params.types}
		</div>
	);
}