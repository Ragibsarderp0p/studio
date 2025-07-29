import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  ArrowDownUp,
  ListChecks,
  SpellCheck,
  Blocks,
  Puzzle,
  Search,
  Hash,
} from 'lucide-react';

const games = [
  {
    title: 'Animal Alphabet',
    description: 'Guess the missing letter!',
    href: '/animal-alphabet',
    icon: <SpellCheck className="w-16 h-16 text-primary" />,
    color: 'bg-blue-100',
  },
  {
    title: 'Number Sorting',
    description: 'Drag numbers to the right order.',
    href: '/number-sorting',
    icon: <ArrowDownUp className="w-16 h-16 text-primary" />,
    color: 'bg-green-100',
  },
  {
    title: 'Even or Odd',
    description: 'Find the even or odd numbers.',
    href: '/even-odd',
    icon: <ListChecks className="w-16 h-16 text-primary" />,
    color: 'bg-yellow-100',
  },
  {
    title: 'Alphabet Matching',
    description: 'Match the letters.',
    href: '/alphabet-matching',
    icon: <Blocks className="w-16 h-16 text-primary" />,
    color: 'bg-red-100',
  },
   {
    title: 'Number Matching',
    description: 'Match the numbers.',
    href: '/number-matching',
    icon: <Hash className="w-16 h-16 text-primary" />,
    color: 'bg-purple-100',
  },
  {
    title: 'Word Building',
    description: 'Build words from letters.',
    href: '/word-building',
    icon: <Puzzle className="w-16 h-16 text-primary" />,
    color: 'bg-indigo-100',
  },
  {
    title: 'Sight Word Hunt',
    description: 'Find the hidden words.',
    href: '/sight-word-hunt',
    icon: <Search className="w-16 h-16 text-primary" />,
    color: 'bg-pink-100',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary-foreground bg-primary inline-block px-6 py-2 rounded-full shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>
          Welcome to EduFun Adventures!
        </h1>
        <p className="text-xl mt-4 text-primary max-w-2xl mx-auto">
          Choose a game below to start your learning journey.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {games.map((game) => (
          <Link href={game.href} key={game.href} legacyBehavior>
            <a className="transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer shadow-lg hover:shadow-2xl overflow-hidden rounded-2xl border-4 border-white block">
              <Card>
                <CardHeader className={`p-6 ${game.color}`}>
                  <div className="flex justify-center items-center h-32">
                    {game.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-6 bg-white text-center">
                  <CardTitle className="font-headline text-2xl text-primary">{game.title}</CardTitle>
                  <CardDescription className="mt-2 text-lg">{game.description}</CardDescription>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
