
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  ArrowDownUp,
  ListChecks,
  SpellCheck,
  Blocks,
  Puzzle,
  Search,
  Hash,
  Shapes,
  Palette,
  Home,
} from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

const games = [
  {
    title: 'Animal Alphabet',
    href: '/animal-alphabet',
    icon: <SpellCheck />,
  },
  {
    title: 'Number Sorting',
    href: '/number-sorting',
    icon: <ArrowDownUp />,
  },
  {
    title: 'Even or Odd',
    href: '/even-odd',
    icon: <ListChecks />,
  },
  {
    title: 'Alphabet Matching',
    href: '/alphabet-matching',
    icon: <Blocks />,
  },
  {
    title: 'Number Matching',
    href: '/number-matching',
    icon: <Hash />,
  },
  {
    title: 'Word Building',
    href: '/word-building',
    icon: <Puzzle />,
  },
  {
    title: 'Sight Word Hunt',
    href: '/sight-word-hunt',
    icon: <Search />,
  },
  {
    title: 'Shape Matching',
    href: '/shape-matching',
    icon: <Shapes />,
  },
  {
    title: 'Color Sorting',
    href: '/color-sorting',
    icon: <Palette />,
  },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { setOpenMobile } = useSidebar();

    const handleLinkClick = () => {
        setOpenMobile(false);
    }
    
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
            <h2 className="text-2xl font-headline text-sidebar-primary">Games</h2>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              isActive={pathname === '/'}
              onClick={handleLinkClick}
            >
              <Link href="/">
                <Home />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {games.map((game) => (
            <SidebarMenuItem key={game.title}>
              <SidebarMenuButton asChild size="lg" isActive={pathname === game.href} onClick={handleLinkClick}>
                <Link href={game.href}>
                  {game.icon}
                  <span>{game.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
