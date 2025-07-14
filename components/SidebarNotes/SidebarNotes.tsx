'use client';
import { NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';
import Link from 'next/link';

const tags: (NoteTag | 'All')[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function SitebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map(tag => (
        <li className={css.menuItem} key={tag}>
          <Link
            href={`/notes/filter/${tag === 'All' ? 'all' : tag}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
