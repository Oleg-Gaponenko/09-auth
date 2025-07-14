import css from './LayoutNotes.module.css';

type ParallelLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function SidebarLayout({
  children,
  sidebar,
}: ParallelLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.main}>{children}</main>
    </div>
  );
}
