import { TopLevelCategory, TopPageModel } from '@/interfaces/page.interface';
import { ProductModel } from '@/interfaces/product.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ITopPage extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}