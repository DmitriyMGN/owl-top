import { MenuItem } from '@/interfaces/menu.interface';

export async function getMenu(firstCategory: number): Promise<MenuItem[]> {
	const result = await fetch('https://courses-top.ru/api/top-page/find', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'firstCategory': firstCategory
		}),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		});

	return result;
}