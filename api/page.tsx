import { TopPageModel } from '@/interfaces/page.interface';

export async function getPage(alias: string): Promise<TopPageModel> {
	const result = fetch(`https://courses-top.ru/api/top-page/byAlias/${alias}`, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		}
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

	return result;
}