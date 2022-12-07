import React from 'react';
import useSolutions from 'context/solutions';
import geojsonArea from '@mapbox/geojson-area';
import _ from 'lodash';

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
  const { solutions, currentSolutionId, currentPolygonIndex, isLoading } = useSolutions();

  console.log('currentSolutionId: ', currentSolutionId);
  console.log('currentPolygonIndex: ', currentPolygonIndex);

  if (
    isLoading ||
    !currentSolutionId ||
    _.isEmpty(solutions[currentSolutionId]) ||
    currentPolygonIndex == null
  )
    return null;

  const geoJSON = {
    type: 'Polygon',
    coordinates: [
      solutions[currentSolutionId][currentPolygonIndex].map((coord) => [coord[1], coord[0]]),
    ],
  };

  console.log('geoJSON: ', geoJSON);

  const area = geojsonArea.geometry(geoJSON);

  return <div>Area: {area} m^2</div>;
};

export default StatisticsPanel;
