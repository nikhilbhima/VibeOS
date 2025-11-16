"use client";

import { useState } from "react";
import { Search, Star, Download, Eye, TrendingUp, Sparkles, FileText, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock prompts data
const mockPrompts = [
  {
    id: 1,
    title: "Build SaaS Starter in Lovable",
    description: "Complete SaaS starter with auth, payments, dashboard. Optimized for Lovable's Supabase integration.",
    author: "Sarah Chen",
    authorAvatar: "S",
    price: 5,
    sales: 1234,
    rating: 4.8,
    reviews: 156,
    category: "Full-Stack",
    tool: "Lovable",
    tags: ["SaaS", "Auth", "Payments"],
    featured: true,
  },
  {
    id: 2,
    title: "E-commerce with Bolt",
    description: "Full e-commerce platform with product catalog, cart, checkout. Perfect for Bolt's web containers.",
    author: "Alex Kumar",
    authorAvatar: "A",
    price: 10,
    sales: 892,
    rating: 4.9,
    reviews: 94,
    category: "E-commerce",
    tool: "Bolt",
    tags: ["E-commerce", "Stripe", "Products"],
    featured: true,
  },
  {
    id: 3,
    title: "Component Library in V0",
    description: "50+ reusable components with shadcn/ui. Variants, animations, and accessibility built-in.",
    author: "You",
    authorAvatar: "Y",
    price: 3,
    sales: 2104,
    rating: 4.7,
    reviews: 289,
    category: "Components",
    tool: "V0 (Vercel)",
    tags: ["Components", "shadcn/ui", "Tailwind"],
    featured: false,
  },
  {
    id: 4,
    title: "Full-Stack App Blueprint",
    description: "Architecture planning prompt for complex apps. Database schema, API design, deployment strategy.",
    author: "Sarah Chen",
    authorAvatar: "S",
    price: 15,
    sales: 567,
    rating: 5.0,
    reviews: 78,
    category: "Architecture",
    tool: "Any",
    tags: ["Architecture", "Planning", "Database"],
    featured: true,
  },
  {
    id: 5,
    title: "Authentication System Pro",
    description: "Enterprise-grade auth with OAuth, 2FA, RBAC. Works with all major providers.",
    author: "Michael Zhang",
    authorAvatar: "M",
    price: 8,
    sales: 743,
    rating: 4.6,
    reviews: 123,
    category: "Backend",
    tool: "Claude Code",
    tags: ["Auth", "Security", "OAuth"],
    featured: false,
  },
  {
    id: 6,
    title: "Landing Page Generator",
    description: "High-converting landing pages with Hero, Features, Pricing, CTA sections. Mobile-first.",
    author: "Emma Davis",
    authorAvatar: "E",
    price: 4,
    sales: 1456,
    rating: 4.5,
    reviews: 201,
    category: "Frontend",
    tool: "Any",
    tags: ["Landing Page", "Marketing", "Conversion"],
    featured: false,
  },
];

const categories = ["All", "Full-Stack", "Frontend", "Backend", "Components", "E-commerce", "Architecture"];
const tools = ["All Tools", "Lovable", "Bolt", "V0 (Vercel)", "Claude Code", "Any"];

export default function PromptLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTool, setSelectedTool] = useState("All Tools");
  const [sortBy, setSortBy] = useState("popular");

  const filteredPrompts = mockPrompts.filter((prompt) => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || prompt.category === selectedCategory;
    const matchesTool = selectedTool === "All Tools" || prompt.tool === selectedTool;
    return matchesSearch && matchesCategory && matchesTool;
  });

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Prompt Library</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Discover and use proven prompts from successful builders
              </p>
            </div>
            <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2">
              <Sparkles className="w-4 h-4" />
              Submit Prompt
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {tools.map((tool) => (
                  <option key={tool} value={tool}>{tool}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="popular">Popular</option>
                <option value="recent">Recent</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-6 border-b border-border bg-card/50">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-blue-500" />
              <p className="text-xs text-muted-foreground">Total Prompts</p>
            </div>
            <p className="text-2xl font-semibold">{mockPrompts.length}</p>
          </div>
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Download className="w-4 h-4 text-green-500" />
              <p className="text-xs text-muted-foreground">Total Sales</p>
            </div>
            <p className="text-2xl font-semibold">6,996</p>
          </div>
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </div>
            <p className="text-2xl font-semibold">4.8</p>
          </div>
          <div className="bg-background border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <p className="text-xs text-muted-foreground">Trending</p>
            </div>
            <p className="text-2xl font-semibold">12</p>
          </div>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              {/* Card Header */}
              <div className="p-5 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {prompt.featured && (
                        <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      )}
                      <h3 className="font-semibold text-foreground group-hover:text-blue-500 transition-colors truncate">
                        {prompt.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{prompt.description}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{prompt.rating}</span>
                    <span className="text-xs text-muted-foreground">({prompt.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Download className="w-3.5 h-3.5" />
                    <span>{prompt.sales.toLocaleString()} sales</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-accent text-accent-foreground rounded text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Tool Badge */}
                <div className="mb-3">
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-xs font-medium">
                    {prompt.tool}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500 flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-500">{prompt.authorAvatar}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">by {prompt.author}</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-accent/30 border-t border-border flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">${prompt.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </Button>
                  <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 gap-1">
                    <Download className="w-3.5 h-3.5" />
                    Buy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No prompts found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
