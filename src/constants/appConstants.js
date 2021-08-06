import { renderBubbleSortAnimations } from '../algorithms/sortAlgorithms/BubbleSort';
export const sortingAlgorithms = [
  { id: 's1', name: 'Bubble Sort', func: renderBubbleSortAnimations },
];
export const pathAlgorithms = [
  { id: 'p1', name: 'Depth First Search', func: '' },
];

export const algoMap = new Map();

sortingAlgorithms.forEach((item) => {
  algoMap.set(item.id, item.func);
});
