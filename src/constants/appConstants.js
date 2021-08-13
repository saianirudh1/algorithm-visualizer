import { renderBubbleSort } from '../algorithms/sortAlgorithms/bubbleSort';
import { renderInsertionSort } from '../algorithms/sortAlgorithms/insertionSort';
import { renderSelectionSort } from '../algorithms/sortAlgorithms/selectionSort';
import { renderMergeSort } from '../algorithms/sortAlgorithms/mergeSort';
import { renderQuickSort } from '../algorithms/sortAlgorithms/quickSort';

export const sortingAlgorithms = [
  { id: 's1', name: 'Quick Sort', func: renderQuickSort },
  { id: 's2', name: 'Merge Sort', func: renderMergeSort },
  { id: 's3', name: 'Insertion Sort', func: renderInsertionSort },
  { id: 's4', name: 'Selection Sort', func: renderSelectionSort },
  { id: 's5', name: 'Bubble Sort', func: renderBubbleSort },
];

export const pathAlgorithms = [
  { id: 'p1', name: `Dijkstra's Algortithm`, func: () => {} },
];

export const algoMap = new Map();

sortingAlgorithms.forEach((item) => {
  algoMap.set(item.id, item.func);
});

pathAlgorithms.forEach((item) => {
  algoMap.set(item.id, item.func);
});
