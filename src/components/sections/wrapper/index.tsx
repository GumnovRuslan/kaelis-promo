'use client';

import { usePathname } from 'next/navigation';
import { Header, Footer } from "@/components/sections";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log(pathname)
  const isNotFound = pathname === '/not-found';

  return (
    <>
      {!isNotFound  && <Header />}
      <main>
        {children}
      </main>
      {!isNotFound  && <Footer />}
    </>
  );
}

export default Wrapper;