import { Suspense } from 'react';
import { AppBar } from '../AppBar/AppBar';

export default function Layout({ children }) {
  return (
    <>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}
