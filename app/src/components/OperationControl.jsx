import React, { useMemo } from 'react';
import useSolutions from 'context/solutions';
import _ from 'lodash';
import Button from '@mui/material/Button';
import * as turf from '@turf/turf';
import { v4 as uuidv4 } from 'uuid';
import L from 'leaflet';

const OperationControl = ({ setError }) => {
  const { solutions, setSolutions, currentSolutionId, polygonSelection } = useSolutions();

  console.log('SELECTION: ', polygonSelection.polygons);

  const __handleIntersection = () => {
    if (polygonSelection.polygons.length !== 2) return setError('Can only intersect 2 polygons');

    console.log('polygonSelection.polygons: ', polygonSelection.polygons);

    const selectedPolygons = polygonSelection.polygons.map((polygonId) => {
      const polygon = solutions[currentSolutionId].find((x) => x.id === polygonId);
      const linearRing = [polygon.coords.map((coord) => [coord[1], coord[0]])];
      return turf.polygon(linearRing);
    });

    const intersection = turf.intersect(selectedPolygons[0], selectedPolygons[1]);

    console.log('Intersection: ', intersection);

    if (!intersection) return setError('Invalid intersection');

    const newPolygonId = uuidv4();

    polygonSelection.clear();

    setSolutions((solution) => {
      const updatedPolygons = [
        ...solutions[currentSolutionId].filter((polygon) => {
          return !polygonSelection.isSelected({ id: polygon.id });
        }),
        {
          id: newPolygonId,
          coords: turf.getCoords(intersection)[0].map((coord) => [coord[1], coord[0]]),
        },
      ];

      console.log('updated polygons: ', updatedPolygons);

      return { ...solution, [currentSolutionId]: updatedPolygons };
    });

    polygonSelection.add({ id: newPolygonId });
  };

  const __handleUnion = () => {
    console.log('UNION');
    if (polygonSelection.polygons.length !== 2) return setError('Can only union 2 polygons');

    console.log('polygonSelection.polygons: ', polygonSelection.polygons);

    const selectedPolygons = polygonSelection.polygons.map((polygonId) => {
      const polygon = solutions[currentSolutionId].find((x) => x.id === polygonId);
      const linearRing = [polygon.coords.map((coord) => [coord[1], coord[0]])];
      return turf.polygon(linearRing);
    });
    // const union = selectedPolygons.reduce((accumulator, polygon) => {
    //   if (!accumulator) return polygon
    //   return turf.union(accumulator, polygon)
    // }, null)

    const union = turf.union(selectedPolygons[0], selectedPolygons[1]);

    console.log('UNION: ', union);

    if (!union) return setError('Invalid union');

    const newPolygonId = uuidv4();

    polygonSelection.clear();

    setSolutions((solution) => {
      const updatedPolygons = [
        ...solutions[currentSolutionId].filter((polygon) => {
          return !polygonSelection.isSelected({ id: polygon.id });
        }),
        { id: newPolygonId, coords: turf.getCoords(union)[0].map((coord) => [coord[1], coord[0]]) },
      ];

      console.log('updated polygons: ', updatedPolygons);

      return { ...solution, [currentSolutionId]: updatedPolygons };
    });

    polygonSelection.add({ id: newPolygonId });
  };

  const notEnoughSelected = polygonSelection.polygons.length < 2;

  //   const controls = useMemo(
  //     () => (
  //       <div style={{ background: 'white', display: 'flex', flexFlow: 'column nowrap' }}>
  //         <Button variant='text' onClick={() => __handleUnion()}>
  //           Union
  //         </Button>
  //         <Button variant='text' onClick={__handleIntersection}>
  //           Intersect
  //         </Button>
  //       </div>
  //     ),
  //     [],
  //   );

  if (notEnoughSelected) return null;

  return (
    <div
      style={{
        background: 'white',
        display: 'flex',
        flexFlow: 'column nowrap',
        position: 'absolute',
        height: 'auto',
        width: 250,
        zIndex: 1000,
        bottom: 0,
      }}
    >
      <Button
        variant='text'
        onClick={(e) => {
          e.stopPropagation();
          L.DomEvent.stopPropagation(e);
          __handleUnion();
        }}
      >
        Union
      </Button>
      <Button variant='text' onClick={__handleIntersection}>
        Intersect
      </Button>
    </div>
  );
};

export default OperationControl;
