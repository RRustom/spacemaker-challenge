import React from 'react';
import useSolutions from 'context/solutions';
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
      <div>Statistics</div>
      <_Statistics />
    </div>
  );
};

const _Statistics = () => {
  const { solutions, currentSolutionId, featureSelection, isLoading } = useSolutions();

  if (
    isLoading ||
    !currentSolutionId ||
    _.isEmpty(solutions[currentSolutionId]) ||
    featureSelection.isEmpty()
  )
    return null;

  const area = featureSelection
    .all()
    .reduce((accumulator, polygon) => accumulator + turf.area(polygon), 0);

  return <div>Area: {area} m^2</div>;
};

export default StatisticsPanel;
