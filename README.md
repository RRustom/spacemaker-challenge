# Spacemaker Challenge

## Overview 

I really resonated with the Spacemaker [tech core beliefs](https://github.com/spacemakerai/spacemaker-tech-core-beliefs), especially the principle of minimizing time to value (TTV). Below I'll outline the design decisions and trade-offs I made to complete this challenge, with respect to these princples. 

**Live demo: <https://rrustom.github.io/spacemaker-challenge/>**

## Running the code

1. `$ cd app`
2. `$ npm install`
3. `$ npm run start` and open [http://localhost:3000](http://localhost:3000)

Run tests with: 

`$ npm test`

## Design Decisions and Trade-Offs 
My primary objective was to minimize TTV, and build a demo that is safe from bugs, easy to understand, and ready for change. I also wanted to have a live demo :)

For these reasons, I opted to build the whole thing on the client side. I took full advantage of the fact that I could use any frameworks or libraries that were necessary, and minimized my ownership across domains that are beyond the scope of the demo's objective.

The client architecture is simple:
1. A dummy API in `api/solutions.js` that fetches the solution data
2. The solution data and relevant state is stored as a single source of truth in a React Context shared across the `SolutionsPanel`, `WorkSurface`, and `StatisticsPanel`
3. Any operations in `WorkSurface` will update the Context state, which then propagates to the `StatisticsPanel`

Some assumptions:
1. We want to be agnostic to the many types of GeoJSON Geometries (Polygon, MultiPolygon, etc...)
2. This demo is focused on 2D, but should easily extend to 3D geometries

Given these assumptions and our objective, here are the decisions I made: 

### 1. Storing geometries

Given that we're ingesting GeoJSON, and we're using GeoJSON to perform geospatial analysis, and to render the geometries, I opted for a simple array of GeoJSON geometries (type and coordinates). This avoids any complexity when it comes to transforming or manipulating data.

Each geometry is given a UUID (guaranteed to be unique). For now this is done when reading the data from the API, but could be assigned on the backend in the future. This allows us to easily update geometries, and use them as keys to make sure that the renderings are always up to date.

On the higher-level, we're storing a single object (unique solution ID: array of GeoJSON geometries).

### 2. Managing state

I chose to keep it simple, and have a single React Context that wraps the entire page. Since the current use-case is straightforward, there was no need for more complex state management solutions like Redux or Mobx. Context data can be easily accessed by any of its children without having props or state being passed around.

The `SolutionsContext`is in charge of fetching data from the API, and keeping it fresh. It also provides some abstractions for the UI (ex: `switchToSolution` and `featureSelection`) that abstract away context state. In the future, it will also be responsible for updating data on the backend.

We start by fetching all solution IDs in order to display them on the solutions panel (`__fetchSolutionIds`), but only fetch a solution's data when it's needed (`__fetchSolutionById`).

Instead of creating a separate context for feature/polygon selection, I relied on the pattern of using hooks to abstract away that logic, and provide access to that logic through the same context. All of the selection logic is in `useFeatureSelection`.

### 3. Rendering geometries

I opted for minimized ownership by using [`react-leaflet`](https://github.com/PaulLeCam/react-leaflet). It's a small, fast, well-maintainted, and easy to use package with a big community. It allows us to render GeoJSON without having to worry about map projections, floating point coordinates, or map layers. It also allows for a better UI/UX out of the box.

### 4. Spatial analytics

I also opted to minimize ownership and TTV for this problem by using [`turf`](https://turfjs.org/). It's a great library for geospatial analysis and operations, completely native to GeoJSON. We can rely on it for fast and accurate calculations, and easy extensibility. Out of the box, it covers a wide array of edge cases and gnarly problems (map projections, floating point arithmetic, convex/concave/irregular shapes).

I decided to not store state as turf objects, and instead adopt a more functional approach of converting from our simple GeoSJON objects source of truth whenever necessary. This prevents our app from being too tightly coupled with `turf`, in case we wanted to replace it in the future.

### 5. Future-proof readiness for change

The way that the app is setup allows us to:
1. Easily connect to a backend to read and write solution data
2. Easily add 3D geometries by updating the `WorkSurface` and `Polygon` components. There are no hidden dependencies or leaky abstractions.
3. Easily replace `turf` dependency
4. Support arbitrary GeoJSON geometries out of the box, for future use cases.
5. Easily onboard other developers! I made sure to use good names, `prettier`, `eslint`, absolute imports, and other clean coding chonventions in order to allow the codebase to grow in complexity without slowing down development.