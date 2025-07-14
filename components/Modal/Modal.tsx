'use client';

import css from './Modal.module.css';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const [installed, setInstalled] = useState(false);
  useEffect(() => {
    setInstalled(true);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  if (!installed) return null;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleClick}
    >
      <div className={css.modal}>
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={css.closeButton}
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
