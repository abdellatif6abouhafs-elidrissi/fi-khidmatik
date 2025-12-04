'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  Heart,
  User,
  Settings,
  MessageSquare,
  Users,
  FileText,
  TrendingUp,
  CheckCircle,
  Briefcase,
  Star,
  DollarSign,
  Wrench,
  Shield,
  Clock,
} from 'lucide-react';

export interface SidebarItem {
  icon: string;
  label: string;
  href: string;
  badge?: string | number;
}

interface SidebarProps {
  items: SidebarItem[];
  locale: string;
}

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Calendar,
  Heart,
  User,
  Settings,
  MessageSquare,
  Users,
  FileText,
  TrendingUp,
  CheckCircle,
  Briefcase,
  Star,
  DollarSign,
  Wrench,
  Shield,
  Clock,
};

const Sidebar: React.FC<SidebarProps> = ({ items, locale }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    active
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50 font-medium'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`
                      px-2 py-0.5 rounded-full text-xs font-bold
                      ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}
                    `}
                  >
                    {item.badge}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
