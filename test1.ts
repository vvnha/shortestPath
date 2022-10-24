type RouteList = { leng: number; top: number | null }[][];

const MAX = Number.POSITIVE_INFINITY;

const graph = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const routes: RouteList = [];
const parentsList: number[] = [0, 0];
const settled = Array.from({ length: graph[0].length }, () => false);
settled[1] = true;

function getParents(graph: number[][], top: number) {
  if (!settled[top]) {
    settled[top] = true;

    for (let i = 0; i < graph[top].length; i++) {
      if ((graph[top][i] || graph[i][top]) && settled[i]) {
        parentsList[top] = i;
        getParents(graph, i);
      }
    }
  }
}

function findShortestPath(
  graph: number[][],
  departedTop: number,
  stopTop: number
) {
  for (let i = 2; i < graph.length; i++) {
    getParents(graph, i);
  }

  settled[1] = true;

  const topList: number[] = [];
  let currentTop = stopTop;

  while (currentTop !== departedTop) {
    topList.push(currentTop);

    console.log(currentTop);

    if (!parentsList[currentTop] && parentsList[currentTop] === 0)
      return 'No path';

    currentTop = parentsList[currentTop];
  }

  topList.push(departedTop);

  return topList.reverse().join('->');
}
console.log(findShortestPath(graph, 1, 7));
