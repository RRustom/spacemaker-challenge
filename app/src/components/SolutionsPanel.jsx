import React from 'react';
import useSolutions from 'context/solutions';

const SolutionsPanel = () => {
  const { currentSolutionId, setCurrentSolutionId, setCurrentPolygonIndex, solutions } =
    useSolutions();

  return (
    <div
      style={{
        borderRightWidth: '4px',
        borderRightStyle: 'solid',
        borderRightColor: 'black',
        display: 'flex',
        flex: 1,
        height: '100%',
        flexFlow: 'column nowrap',
      }}
    >
      {Object.keys(solutions).map((solutionId) => {
        solutionId = Number(solutionId);
        const isCurrentSolution = solutionId === currentSolutionId;
        return (
          <div
            key={solutionId}
            style={{ cursor: 'pointer', background: isCurrentSolution ? 'grey' : 'none' }}
            onClick={() => {
              setCurrentSolutionId(solutionId);
              setCurrentPolygonIndex(null);
            }}
          >{`Solution ${solutionId}`}</div>
        );
      })}
    </div>
  );
};

export default SolutionsPanel;
