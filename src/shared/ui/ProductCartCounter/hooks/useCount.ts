import { useState, ChangeEvent, useCallback } from 'react';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useCount = () => {
	const [count, setCount] = useState(1);

	const handleCount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const newCount = +e.target.value;
		const validCount =
			newCount > MAX_COUNT
				? MAX_COUNT
				: newCount < MIN_COUNT
				? MIN_COUNT
				: newCount;
		setCount(validCount);
	}, []);

	const handleCountMinus = useCallback(() => {
		setCount((prev) => (prev - 1 < MIN_COUNT ? MIN_COUNT : prev - 1));
	}, []);

	const handleCountPlus = useCallback(() => {
		setCount((prev) => (prev + 1 > MAX_COUNT ? MAX_COUNT : prev + 1));
	}, []);

	return { count, handleCount, handleCountMinus, handleCountPlus };
};
