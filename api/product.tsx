import { ProductModel } from '@/interfaces/product.interface';

export async function getProduct(category: string): Promise<ProductModel[]> {
	const result = await fetch("https://courses-top.ru/api/product/find", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"category": category,
			"limit": 10
		}),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.then((data) => {
			return data;
		});
	return await result;
}