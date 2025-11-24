import { WithProtection } from '@shared/store/HOCs/WithProtection';
import { WithQuery } from '@shared/store/HOCs/WithQuery';
import { LoadMore } from '@features/LoadMore';
import { CardList } from '@features/CardList';
import { useProducts } from '@shared/store/hooks/useProducts';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<>
			<CardListWithQuery
				title='Лакомства1'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</>
	);
});
