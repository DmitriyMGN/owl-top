'use client';
import { firstLevelMenu } from '@/helpers/helpers';
import { notFound } from "next/navigation";
import { setFirstCategory } from '@/lib/features/server-slice';
import { useAppDispatch } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import TopPage from '../../../../components/TopPage/TopPage';
import { getProduct } from '@/api/product';
import { ProductModel } from '@/interfaces/product.interface';
import { TopPageModel } from '@/interfaces/page.interface';
import { getPage } from '@/api/page';
import { addProducts } from '@/lib/features/sort-slice';


export default function PageProducts({ params }: { params: { alias: string, types: string } }) {

	const [product, setProduct] = useState<ProductModel[]>([]);
	const [page, setPage] = useState<TopPageModel>();
	const dispatch = useAppDispatch();

	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.types);

	// if (!firstCategoryItem) {
	// 	return notFound();
	// }

	useEffect(() => {
		getPage(params.alias)
			.then((data) => {
				setPage(data);
			});
	}, []);

	useEffect(() => {
		if (page !== undefined) {
			getProduct(page.category)
				.then((data) => {
					dispatch(addProducts(data));
					setProduct(data);
				});
		}
	}, [page]);


	useEffect(() => {
		dispatch(setFirstCategory(firstCategoryItem !== undefined ? firstCategoryItem.id : null));
	});

	if (!firstCategoryItem) {
		return notFound();
	}


	return (
		<div>
			{page &&
				<TopPage
					firstCategory={firstCategoryItem.id}
					page={page}
					products={product}
				/>
			}
		</div>
	);
}