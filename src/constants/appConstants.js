import { renderBubbleSort } from '../algorithms/sortAlgorithms/bubbleSort';
import { renderInsertionSort } from '../algorithms/sortAlgorithms/insertionSort';
import { renderSelectionSort } from '../algorithms/sortAlgorithms/selectionSort';
import { renderMergeSort } from '../algorithms/sortAlgorithms/mergeSort';
import { renderQuickSort } from '../algorithms/sortAlgorithms/quickSort';

export const sortingAlgorithms = [
  { id: 's1', name: 'Quick Sort', func: renderQuickSort, time: 30000 },
  { id: 's2', name: 'Merge Sort', func: renderMergeSort, time: 35000 },
  { id: 's3', name: 'Insertion Sort', func: renderInsertionSort, time: 55000 },
  { id: 's4', name: 'Selection Sort', func: renderSelectionSort, time: 60000 },
  { id: 's5', name: 'Bubble Sort', func: renderBubbleSort, time: 130000 },
];
export const pathAlgorithms = [
  { id: 'p1', name: 'Depth First Search', func: '' },
];

export const algoMap = new Map();

sortingAlgorithms.forEach((item) => {
  algoMap.set(item.id, item.func);
});
