import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import s from './Modal.module.css';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	const modalRoot = document.getElementById('modal-root');
	const overlayRef = useRef<HTMLDivElement>(null);
	const lastFocusedElement = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (isOpen) {
			lastFocusedElement.current = document.activeElement as HTMLElement;
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			lastFocusedElement.current?.focus();
		};
	}, [isOpen, onClose]);

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === overlayRef.current) onClose();
	};

	if (!isOpen || !modalRoot) return null;

	return ReactDOM.createPortal(
		<div
			className={classNames(s.modalOverlay)}
			ref={overlayRef}
			onClick={handleOverlayClick}>
			<div className={classNames(s.modalContent)} tabIndex={-1} autoFocus>
				{children}
			</div>
		</div>,
		modalRoot
	);
};
