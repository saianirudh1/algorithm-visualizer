import { renderBubbleSort } from '../algorithms/sortAlgorithms/bubbleSort';
import { renderSelectionSort } from '../algorithms/sortAlgorithms/selectionSort';

export const sortingAlgorithms = [
  { id: 's1', name: 'Bubble Sort', func: renderBubbleSort },
  { id: 's2', name: 'Selection Sort', func: renderSelectionSort },
];
export const pathAlgorithms = [
  { id: 'p1', name: 'Depth First Search', func: '' },
];

export const algoMap = new Map();

sortingAlgorithms.forEach((item) => {
  algoMap.set(item.id, item.func);
});
