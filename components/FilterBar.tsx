import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
  showSearch?: boolean;
  showPriceRange?: boolean;
  showDuration?: boolean;
  showDestination?: boolean;
}

export function FilterBar({
  onFilterChange,
  showSearch = true,
  showPriceRange = true,
  showDuration = true,
  showDestination = true
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-lg border border-neutral-100 overflow-hidden mb-8"
    >
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          {showSearch && (
            <div className="flex-1 min-w-[250px] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search destinations, tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-2xl border-2 border-neutral-200 focus:border-primary transition-colors"
              />
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          )}

          {/* Destination Filter */}
          {showDestination && (
            <Select>
              <SelectTrigger className="w-[200px] h-12 rounded-2xl border-2">
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                <SelectItem value="dubai">Dubai</SelectItem>
                <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                <SelectItem value="maldives">Maldives</SelectItem>
                <SelectItem value="turkey">Turkey</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Price Range */}
          {showPriceRange && (
            <Select>
              <SelectTrigger className="w-[200px] h-12 rounded-2xl border-2">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-1000">Under AED 1,000</SelectItem>
                <SelectItem value="1000-3000">AED 1,000 - 3,000</SelectItem>
                <SelectItem value="3000-5000">AED 3,000 - 5,000</SelectItem>
                <SelectItem value="5000+">Above AED 5,000</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Duration */}
          {showDuration && (
            <Select>
              <SelectTrigger className="w-[200px] h-12 rounded-2xl border-2">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Duration</SelectItem>
                <SelectItem value="short">1-3 Days</SelectItem>
                <SelectItem value="medium">4-7 Days</SelectItem>
                <SelectItem value="long">7+ Days</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Advanced Filters Toggle */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-12 rounded-2xl border-2 px-4"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              More Filters
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                className="ml-2"
              >
                ▼
              </motion.span>
            </Button>
          </motion.div>
        </div>

        {/* Expanded Filters */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger className="h-12 rounded-2xl border-2">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                <SelectItem value="4+">4+ Stars</SelectItem>
                <SelectItem value="3.5+">3.5+ Stars</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="h-12 rounded-2xl border-2">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="family">Family</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="h-12 rounded-2xl border-2">
                <SelectValue placeholder="Group Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Group Size</SelectItem>
                <SelectItem value="solo">Solo</SelectItem>
                <SelectItem value="couple">Couple</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="group">Group</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      </div>

      {/* Active Filters */}
      {searchQuery && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
            >
              <span>Search: "{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="hover:text-primary/70">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
