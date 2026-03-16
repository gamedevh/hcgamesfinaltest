/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, Play, Info, Trophy, Zap, Ghost, Rocket, Target, Sword } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['All', 'Action', 'Puzzle', 'Arcade', 'Strategy', 'Retro'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Generate 50 game slots with varying data
  const games = useMemo(() => {
    const icons = [
      <Gamepad2 className="w-6 h-6" />,
      <Zap className="w-6 h-6" />,
      <Ghost className="w-6 h-6" />,
      <Rocket className="w-6 h-6" />,
      <Target className="w-6 h-6" />,
      <Sword className="w-6 h-6" />,
      <Trophy className="w-6 h-6" />
    ];

    const titles = [
      'Neon Strike', 'Void Runner', 'Pixel Quest', 'Cyber Dash', 'Gravity Flip',
      'Shadow Blade', 'Echo Chamber', 'Binary Soul', 'Vector Drift', 'Pulse Wave',
      'Grid Master', 'Static Flow', 'Core Breach', 'Data Link', 'Logic Gate',
      'Signal Lost', 'Bit Shift', 'Code Red', 'Null Pointer', 'Buffer Overflow',
      'Kernel Panic', 'Root Access', 'Shell Shock', 'Macro War', 'Micro Bot',
      'Nano Tech', 'Quantum Leap', 'Plasma Core', 'Fusion Cell', 'Solar Wind',
      'Lunar Base', 'Mars Rover', 'Star Ship', 'Deep Space', 'Dark Matter',
      'Black Hole', 'Event Horizon', 'Singularity', 'Worm Hole', 'Time Warp',
      'Dimension X', 'Parallel World', 'Mirror Edge', 'Glass City', 'Neon Night',
      'Rainy Day', 'Cold Snap', 'Heat Wave', 'Storm Front', 'Final Boss'
    ];

    return Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: titles[i] || `Game ${i + 1}`,
      category: CATEGORIES[1 + (i % (CATEGORIES.length - 1))],
      rating: parseFloat((4 + Math.random()).toFixed(1)),
      players: `${Math.floor(Math.random() * 1000)}k`,
      icon: icons[i % icons.length]
    }));
  }, []);

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Gamepad2 className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">HCGAMES</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                    selectedCategory === cat ? 'text-blue-500' : 'text-white/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-48 md:w-64"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
              PLAY THE <span className="text-blue-600">FUTURE</span>
            </h1>
            <p className="text-white/40 max-w-2xl mx-auto text-lg">
              Experience the next generation of minimalistic gaming. 
              Clean interface, pure performance, zero distractions.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Games Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            {selectedCategory} Games
            <span className="ml-3 text-sm font-normal text-white/30">
              {filteredGames.length} available
            </span>
          </h2>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/[0.08] hover:border-blue-500/50 cursor-pointer"
              >
                <div className="aspect-square bg-black rounded-xl mb-4 flex items-center justify-center text-white/20 group-hover:text-blue-500 transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors" />
                  {game.icon}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
                      <Play className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
                      {game.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-white/40">
                      <Trophy className="w-3 h-3" />
                      {game.rating}
                    </div>
                  </div>
                  <h3 className="font-bold text-sm truncate group-hover:text-blue-400 transition-colors">
                    {game.title}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] text-white/30">
                    <span>{game.players} players</span>
                    <div className="flex gap-2">
                      <Info className="w-3 h-3 hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGames.length === 0 && (
          <div className="py-20 text-center">
            <Ghost className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/40">No games found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 text-blue-500 text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <Gamepad2 className="text-black w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tighter">HCGAMES</span>
            </div>
            
            <div className="flex gap-8 text-xs text-white/30 uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>

            <p className="text-[10px] text-white/20 uppercase tracking-widest">
              © 2026 HCGAMES. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
