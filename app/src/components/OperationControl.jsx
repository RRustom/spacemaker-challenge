import React, { useMemo } from 'react';
import useSolutions from 'context/solutions';
import _ from 'lodash';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';

import performOperation, { UNION, INTERSECTION } from 'utils/performOperation';

const OperationControl = ({ setError }) => {
  const { solutions, setSolutions, currentSolutionId, featureSelection } = useSolutions();
  const selectedPolygons = featureSelection.all();

  const __handleOperation = ({ operationType }) => {
    const result = performOperation({ operationType, features: selectedPolygons });

    if (!result) return setError('Invalid operation');

    const newPolygonId = uuidv4();

    featureSelection.clear();

    setSolutions((solution) => {
      const updatedFeatures = [
        ...solutions[currentSolutionId].filter((polygon) => {
          return !featureSelection.isSelected({ id: polygon.id });
        }),
        {
          id: newPolygonId,
          geometry: result.geometry,
        },
      ];

      return { ...solution, [currentSolutionId]: updatedFeatures };
    });

    featureSelection.add({ id: newPolygonId });
  };

  const notEnoughSelected = selectedPolygons.length < 2;

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
      <Button variant='text' onClick={() => __handleOperation({ operationType: UNION })}>
        Union
      </Button>
      <Button variant='text' onClick={() => __handleOperation({ operationType: INTERSECTION })}>
        Intersect
      </Button>
    </div>
  );
};

export default OperationControl;
