import React from 'react';
import useSolutions from 'context/solutions';

const SolutionsPanel = () => {
  const { currentSolutionId, setCurrentSolutionId, solutions } = useSolutions();

  return (
    <div
      style={{
        borderRightWidth: '2px',
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
            onClick={() => setCurrentSolutionId(solutionId)}
          >{`Solution ${solutionId}`}</div>
        );
      })}
    </div>
  );
};

export default SolutionsPanel;
