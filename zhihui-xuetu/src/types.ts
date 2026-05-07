import type { ReactNode } from 'react';

export interface NavItem {
  key: string;
  label: string;
  path: string;
}

export interface QuickLinkItem {
  title: string;
  description: string;
  path: string;
  icon: ReactNode;
}

export interface PostItem {
  id: string;
  author: string;
  avatarColor: string;
  time: string;
  title: string;
  excerpt: string;
  likes: number;
  comments: number;
  tag: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  downloads: number;
  reward?: number;
  isUserUpload?: boolean;
}

export interface TextbookItem {
  id: string;
  title: string;
  publisher: string;
  condition: string;
  price: number;
  major: string;
}

export interface EbookItem {
  id: string;
  title: string;
  author: string;
  chapters: number;
  category: string;
  summary: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  points: number;
  accent: string;
}
