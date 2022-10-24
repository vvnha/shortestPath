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
const parentsList: number[] = [];

function getParents(graph: number[][]) {
  for (let top = 2; top < graph.length; top++) {
    for (let i = 0; i < graph[top].length; i++) {
      if ((graph[top][i] || graph[i][top]) && !parentsList[top]) {
        parentsList[top] = i;
      }
    }
  }
}

function findShortestPath(
  graph: number[][],
  departedTop: number,
  stopTop: number
) {
  getParents(graph);
  parentsList[1] = 0;

  const topList: number[] = [];

  let currentTop = stopTop;

  while (currentTop !== departedTop) {
    topList.push(currentTop);

    if (!parentsList[currentTop] && parentsList[currentTop] !== 0)
      return 'No path';
    currentTop = parentsList[currentTop];
  }

  topList.push(departedTop);
  return topList.reverse().join('->');
}
console.log(findShortestPath(graph, 2, 7));
