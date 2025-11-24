import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './CartAmount.module.css';
import classNames from 'classnames';
import { Modal } from '@shared/ui/Modal';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

type CartAmountProps = {
	products: CartProduct[];
};
export const CartAmount = ({ products }: CartAmountProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const confirmRef = useRef<HTMLButtonElement>(null);
	const allPrice = useMemo(
		() => products.reduce((acc, p) => p.price * p.count + acc, 0),
		[products]
	);
	const allDiscount = useMemo(
		() => products.reduce((acc, p) => p.discount * p.count + acc, 0),
		[products]
	);

	const handleConfirm = () => {
		console.log('Заказ подтвержден:', products);
		setIsModalOpen(false);
		toast.success('Вы оформили заказ!');
		const order = products.map((p) => ({ id: p.id, count: p.count }));
		console.log('Отправка заказа на сервер: ', JSON.stringify(order, null, 2));
	};
	const handleSubmitCart = () => {
		setIsModalOpen(true);
	};

	useEffect(() => {
		if (isModalOpen && confirmRef.current) {
			confirmRef.current.focus();
		}
	}, [isModalOpen]);

	return (
		<div className={classNames(s['cart-amount'])}>
			<h1 className={classNames(s['cart-amount__title'])}>Ваша корзина</h1>
			<div className={classNames(s['cart-amount__table'])}>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						{`Товары (${products.length})`}
					</span>
					<span className={classNames(s['cart-amount__table-value'])}>
						{`${allPrice} ₽`}
					</span>
				</div>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						Скидка
					</span>
					<span
						className={classNames(
							s['cart-amount__table-value'],
							s['cart-amount__table-value-discount']
						)}>
						{`${allDiscount} ₽`}
					</span>
				</div>
			</div>
			<div className={classNames(s['cart-amount__total-cost'])}>
				<h2 className={classNames(s['cart-amount__total-cost-title'])}>
					Общая стоимость
				</h2>
				<span className={classNames(s['cart-amount__total-cost-value'])}>
					{`${allPrice - allDiscount} ₽`}
				</span>
			</div>
			<button
				onClick={handleSubmitCart}
				className={classNames(
					s['button'],
					s['button_type_primary'],
					s['button_type_wide']
				)}>
				Оформить заказ
			</button>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<h2>Для продолжения оформления</h2>
				<p>
					Подтвердите ваш заказ на {products.length} товара
				</p>
				<div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
					<Button
						onClick={handleConfirm}
						className={s.modalConfirmButton}>
						Ок
					</Button>
					<Button
						ref={confirmRef}
						onClick={() => setIsModalOpen(false)}
					>
						Отмена
					</Button>
				</div>
			</Modal>
		</div>
	);
};
