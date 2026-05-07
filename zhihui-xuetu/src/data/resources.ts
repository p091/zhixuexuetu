import type { ResourceItem } from '../types';

export const resourceCategories = ['全部', '编程', '数学', '英语', '物理', '经济'] as const;

export const resources: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Java 期末实验全套模板',
    author: '软件工程 2201',
    category: '编程',
    description: '包含常见实验题框架、注释说明和汇报用 PPT。',
    downloads: 468,
    reward: 8,
  },
  {
    id: 'res-2',
    title: '高等数学 A 典型题精讲',
    author: '数学竞赛社',
    category: '数学',
    description: '覆盖极限、导数、积分三大章节，适合考前复习。',
    downloads: 521,
    reward: 10,
  },
  {
    id: 'res-3',
    title: '大学英语六级作文高分句型库',
    author: '外语学院共享组',
    category: '英语',
    description: '精选 100 条高频句型，按主题分类，便于快速记忆。',
    downloads: 732,
    reward: 6,
  },
  {
    id: 'res-4',
    title: '大学物理实验报告标准样例',
    author: '王同学',
    category: '物理',
    description: '附实验误差分析写法和图表规范，适合直接参考。',
    downloads: 289,
    reward: 5,
  },
  {
    id: 'res-5',
    title: '微观经济学知识图谱',
    author: '经济学社',
    category: '经济',
    description: '把消费者理论、成本理论和市场结构串成一张图。',
    downloads: 346,
    reward: 7,
  },
  {
    id: 'res-6',
    title: '前端面试冲刺题单与答案',
    author: '校招互助会',
    category: '编程',
    description: '整理了 HTML、CSS、JS、React 高频问题和精简答案。',
    downloads: 883,
    reward: 12,
  },
];
