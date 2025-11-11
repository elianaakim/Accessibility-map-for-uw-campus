import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { BUILDINGS, EDGES } from './campus';
import { shortestPath } from './dijkstra';

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

/** Returns a list of all known buildings. */
export const getBuildings = (_req: SafeRequest, res: SafeResponse): void => {
  res.json({buildings: BUILDINGS});
};


// TODO (Task 1 - Retrieve You Me): add a route to get the shortest path
/**
 * Retrieves the shortest path between two buildings on campus.
 */
export const getShortestPath = (req: SafeRequest, res: SafeResponse): void => {
  const startLongName = first(req.query.start);
  const endLongName = first(req.query.end);

  if (!startLongName || !endLongName) {
    res.status(400).send("Missing 'start' or 'end' query parameter");
    return;
  }

  const startBuilding = BUILDINGS.find(b => b.longName === startLongName);
  const endBuilding = BUILDINGS.find(b => b.longName === endLongName);

  if (!startBuilding || !endBuilding) {
    res.status(400).send("Start or end building not found");
    return;
  }

  const path = shortestPath(startBuilding.location, endBuilding.location, EDGES);

  if (path === undefined) {
    res.status(404).send("No path found between buildings");
  } else {
    res.json({ steps: path }); 
  }
};

// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give multiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};