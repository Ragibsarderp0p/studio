import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import { PT_Sans, Luckiest_Guy } from 'next/font/google';
import { GameSessionProvider } from '@/hooks/use-game-session';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const luckiestGuy = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-luckiest-guy',
});

export const metadata: Metadata = {
  title: 'EduFun Adventures',
  description: 'A fun and educational adventure for kids!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ptSans.variable} ${luckiestGuy.variable} font-body antialiased`}
      >
        <GameSessionProvider>
          <SidebarProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex flex-1">
                <AppSidebar />
                <main className="flex-grow">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </GameSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
