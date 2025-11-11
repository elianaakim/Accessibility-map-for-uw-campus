import { Location, Edge } from './campus';
import { Heap, newHeap } from './heap';


/**
 * A path from one location on the map to another by following along the given
 * steps in the order they appear in the array. Each edge must start at the
 * place where the previous edge ended. We also cache the total distance of the
 * edges in the path for faster access.
 */
export type Path =
    {start: Location, end: Location, steps: Array<Edge>, dist: number};
/**
 * Returns the shortest path from the given start to the given ending location
 * that can be made by following along the given edges. If no path exists, then
 * this will return undefined. (Note that all distances must be positive or else
 * shortestPath may not work!)
 */
export const shortestPath = (
    _start: Location, _end: Location, _edges: Array<Edge>): Path | undefined => {

  // TODO (Task 1 - The Full-Short Press): implement this
      const adjacent = new Map<string, Edge[]>();
      for (const e of _edges) {
        const key = e.start.x + ',' + e.start.y;
        if (!adjacent.has(key)) {
          adjacent.set(key, []);
        }
        const edges = adjacent.get(key);
        if (edges !== undefined){
          edges.push(e);
        }
      }

      const finished = new Set<string>();
      const comparator = (a: Path, b: Path): number => a.dist - b.dist;
      const active: Heap<Path> = newHeap(comparator);

      const startPath: Path = {
        start: _start,
        end: _start,
        steps: [],
        dist: 0,
      };
      active.add(startPath);
      console.log("we are entering the while loop");
      // Inv:
      while (!active.isEmpty()) {
        const minPath = active.removeMin();
        const minKey = minPath.end.x + ',' + minPath.end.y;
        const endKey = _end.x + ',' + _end.y;

        if (minKey === endKey) {
          return minPath;
        }

        if (finished.has(minKey)) {
          continue;
        }

        finished.add(minKey);

        const neighbors = adjacent.get(minKey);
        if (neighbors === undefined) {
          continue;
        }

        for (const edge of neighbors){
          const edgeEndKey = edge.end.x + ',' + edge.end.y;
          if (!finished.has(edgeEndKey)){
            const newPath: Path = {
              start: _start,
              end: edge.end,
              steps: minPath.steps.concat([edge]),
              dist: minPath.dist + edge.dist,
            };
            active.add(newPath);
          }
        }

      }

  return undefined;
};