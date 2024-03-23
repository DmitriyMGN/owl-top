'use client';

export default function Error({ error }: { error: Error, reset: () => void }) {
	return <>
		<div>Что-то пошло не так</div>
		<div>{JSON.stringify(error)}</div>
	</>;
}