'use client';

import css from './TagsMenu.module.css';
import Link from 'next/link';
import { NoteTag } from '../../types/note';
import { useEffect, useRef, useState } from 'react';

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(previous => !previous);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button
        className={css.menuButton}
        onClick={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList} role="menu">
          <li className={css.menuItem} role="none">
            <Link
              href="/notes/filter/all"
              role="menu-item"
              className={css.menuLink}
              onClick={() => setIsOpen(false)}
            >
              All notes
            </Link>
          </li>
          {tags.map(tag => (
            <li key={tag} className={css.menuItem} role="none">
              <Link
                href={`/notes/filter/${tag}`}
                role="menu-item"
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
