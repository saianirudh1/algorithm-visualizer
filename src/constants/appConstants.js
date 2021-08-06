import { renderBubbleSort } from '../algorithms/sortAlgorithms/bubbleSort';
import { renderInsertionSort } from '../algorithms/sortAlgorithms/insertionSort';
import { renderSelectionSort } from '../algorithms/sortAlgorithms/selectionSort';

export const sortingAlgorithms = [
  { id: 's1', name: 'Insertion Sort', func: renderInsertionSort },
  { id: 's2', name: 'Selection Sort', func: renderSelectionSort },
  { id: 's3', name: 'Bubble Sort', func: renderBubbleSort },
];
export const pathAlgorithms = [
  { id: 'p1', name: 'Depth First Search', func: '' },
];

export const algoMap = new Map();

sortingAlgorithms.forEach((item) => {
  algoMap.set(item.id, item.func);
});
