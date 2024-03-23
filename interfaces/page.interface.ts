export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export interface TopPageModel {
	_id: string;
	tags: string[];
	secondCategory: string;
	alias: string;
	title: string;
	category: string;
	seoText?: string;
	tagsTitle: string;
	metaTitle: string;
	metaDescription: string;
	firstCategory: TopLevelCategory;
	advantages?: TopPageAdvantage[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	hh?: HhData;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	qas?: any[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addresses?: any[];
	categoryOn: string;
	blog: Blog;
	sravnikus: Sravnikus;
	learningclub: Sravnikus;
}

export interface Sravnikus {
	metaTitle: string;
	metaDescription: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	qas?: any[];
	_id: string;
}

export interface Blog {
	h1: string;
	metaTitle: string;
	metaDescription: string;
	views: number;
	_id: string;
}

export interface HhData {
	count: number;
	juniorSalary: number;
	middleSalary: number;
	seniorSalary: number;
	updatedAt: string;
	_id: string;
}

export interface TopPageAdvantage {
	title: string;
	description: string;
	_id: string;
}