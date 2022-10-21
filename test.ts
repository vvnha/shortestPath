type RouteList = { leng: number; top: number | null }[][];

const MAX = Number.POSITIVE_INFINITY;

const graph = [
  [0.0, 2.5, 2.0, 2.1, MAX, MAX, MAX, MAX, MAX],
  [MAX, 0.0, MAX, MAX, 1.0, MAX, MAX, MAX, MAX],
  [MAX, MAX, 0.0, MAX, 0.6, 1.5, MAX, MAX, MAX],
  [MAX, MAX, MAX, 0.0, MAX, 2.5, MAX, MAX, MAX],
  [MAX, MAX, MAX, MAX, 0.0, MAX, 2.3, MAX, MAX],
  [MAX, MAX, MAX, MAX, MAX, 0.0, 1.9, 2.0, MAX],
  [MAX, MAX, MAX, MAX, MAX, MAX, 0.0, 1.8, 1.7],
  [MAX, MAX, MAX, MAX, MAX, MAX, MAX, 0.0, 2.0],
  [MAX, MAX, MAX, MAX, MAX, MAX, MAX, MAX, 0.0],
];

const routes: RouteList = [];

function findShortestPath(graph: number[][], departedTop: number) {
  let currentMinTop = departedTop;
  const result: RouteList = [];
  const settleTop: number[] = [];
  const unSettleTop: number[] = Array.from(Array(graph.length).keys());

  //inital table
  for (let i = 0; i < graph.length; i++) {
    if (i === departedTop) result[i] = [{ leng: 0, top: departedTop }];
    else result[i] = [{ leng: MAX, top: null }];
  }

  let array: RouteList[number] = [];

  while (!settleTop.includes(currentMinTop)) {
    for (let i = 0; i < graph[currentMinTop].length; i++) {
      const currentLength =
        graph[currentMinTop][i] < MAX
          ? Number(
              (
                graph[currentMinTop][i] +
                result[currentMinTop][result[currentMinTop].length - 1].leng
              ).toFixed(2)
            )
          : Number(
              (
                graph[i][currentMinTop] +
                result[currentMinTop][result[currentMinTop].length - 1].leng
              ).toFixed(2)
            );

      if (
        currentLength < result[i][result[i].length - 1].leng &&
        i !== currentMinTop
      ) {
        const newItem = { leng: currentLength, top: currentMinTop };
        result[i].push(newItem);
        array.push({ leng: currentLength, top: i });
      }
    }

    if (!settleTop.includes(currentMinTop)) {
      settleTop.push(currentMinTop);
      unSettleTop.splice(currentMinTop, 1);
    }

    currentMinTop =
      array.reduce(
        (result, item) => {
          if (item.leng < result.leng) result = item;
          return result;
        },
        { leng: Infinity, top: currentMinTop }
      ).top || departedTop;

    const newArray = array.filter(
      (item: RouteList[number][number]) => item.top !== currentMinTop
    );
    array = [...newArray];
  }
}

findShortestPath(graph, 8);
