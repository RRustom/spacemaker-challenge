import React from 'react';
import useSolutions from 'context/solutions';
import geojsonArea from '@mapbox/geojson-area';
import _ from 'lodash';
import * as turf from '@turf/turf';

const StatisticsPanel = () => {
  return (
    <div
      style={{
        borderRightWidth: '1px',
        borderRightStyle: 'solid',
        borderRightColor: 'black',
        display: 'flex',
        flexFlow: 'column nowrap',
        flex: 1,
      }}
    >
      <div>Statistics Panel</div>
      <_Statistics />
    </div>
  );
};

const _Statistics = () => {
  const { solutions, currentSolutionId, polygonSelection, isLoading } = useSolutions();

  if (
    isLoading ||
    !currentSolutionId ||
    _.isEmpty(solutions[currentSolutionId]) ||
    polygonSelection.isEmpty()
  )
    return null;

  const selectedPolygons = polygonSelection.polygons.map((polygonId) => {
    const polygon = solutions[currentSolutionId].find((x) => x.id === polygonId);
    const linearRing = [polygon.coords.map((coord) => [coord[1], coord[0]])];

    return turf.polygon(linearRing);
  });

  const area = selectedPolygons.reduce(
    (accumulator, polygon) => accumulator + turf.area(polygon),
    0,
  );

  return <div>Area: {area} m^2</div>;
};

export default StatisticsPanel;
