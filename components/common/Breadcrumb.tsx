"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <Link href="/" className="hover:text-blue-400 transition-colors">
        <Home size={14} />
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRight size={12} />
          {index === items.length - 1 ? (
            <span className="text-gray-400">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-blue-400 transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}