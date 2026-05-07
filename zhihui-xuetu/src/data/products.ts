import type { ProductItem } from '../types';

export const products: ProductItem[] = [
  {
    id: 'prod-1',
    name: '学习笔记本',
    description: '硬壳设计，适合整理课堂笔记与错题复盘。',
    points: 50,
    accent: '#5db2ff',
  },
  {
    id: 'prod-2',
    name: '定制书签',
    description: '校园主题金属书签，适合作为活动纪念品。',
    points: 30,
    accent: '#3dffcb',
  },
  {
    id: 'prod-3',
    name: '云打印券',
    description: '可兑换一次资料打印，适合复习周集中使用。',
    points: 80,
    accent: '#ffc857',
  },
  {
    id: 'prod-4',
    name: '自习室优先券',
    description: '热门时段自习空间优先预约权益，提升学习效率。',
    points: 120,
    accent: '#ff8b73',
  },
];
