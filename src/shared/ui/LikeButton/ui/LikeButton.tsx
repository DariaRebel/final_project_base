import s from './LikeButton.module.css';
//import { ReactComponent as LikeSvg } from './../../../assets/icons/like.svg';
import LikeSvg from '@shared/assets/icons/like.svg?react';
import classNames from 'classnames';
import { useAppSelector } from '@shared/store/utils';
import { userSelectors } from '@shared/store/slices/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	IErrorResponse,
} from '@shared/store/api/productsApi';
import { toast } from 'react-toastify';
import { useOptimistic } from 'react';

type TLikeButtonProps = {
	product: Product;
};
export const LikeButton = ({ product }: TLikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLike = product?.likes.some((l) => l.userId === user?.id);
	const [optimisticLike, setOptimisticLike] = useOptimistic(isLike, (prevValue) => !prevValue);
	const toggleLike = async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}

		setOptimisticLike(!optimisticLike);
	
		try {
		  let response;
		  if (isLike) {
			response = await deleteLike({ id: `${product.id}` });
		  } else {
			response = await setLike({ id: `${product.id}` });
		  }
		} catch (error) {
			const err = error as IErrorResponse;
			toast.error(err.data.message || "Someting wrong")
		  	console.error('Failed:', error);
		}
	};

	return (
		<button
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: optimisticLike,
			})}
			onClick={toggleLike}>
			<LikeSvg />
		</button>
	);
};
