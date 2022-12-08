import React from 'react';
import useSolutions from 'context/solutions';
import _ from 'lodash';
import getArea from 'utils/getArea';

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

  const area = getArea({ features: featureSelection.all() });

  return <div>Area: {area} m^2</div>;
};

export default StatisticsPanel;
