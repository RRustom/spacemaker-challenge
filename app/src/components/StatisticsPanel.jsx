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
      <div
        style={{
          fontSize: 18,
          borderBottomWidth: '2px',
          borderBottomColor: 'black',
          borderBottomStyle: 'solid',
          padding: 8,
        }}
      >
        Statistics
      </div>
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

  return (
    <div style={{ padding: 8 }}>
      <strong>Area:</strong> {area} m<sup>2</sup>
    </div>
  );
};

export default StatisticsPanel;
