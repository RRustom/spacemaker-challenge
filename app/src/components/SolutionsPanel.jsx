import React from 'react';
import useSolutions from 'context/solutions';

const SolutionsPanel = () => {
  const { currentSolutionId, switchToSolution, solutions } = useSolutions();

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
            style={{
              cursor: 'pointer',
              background: isCurrentSolution ? 'grey' : 'none',
              fontSize: 18,
              padding: 8,
            }}
            onClick={() => switchToSolution({ solutionId })}
          >{`Solution ${solutionId}`}</div>
        );
      })}
    </div>
  );
};

export default SolutionsPanel;
