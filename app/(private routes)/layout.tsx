import AuthProvider from '@/components/AuthProvider/AuthProvider';

export default function Private({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
