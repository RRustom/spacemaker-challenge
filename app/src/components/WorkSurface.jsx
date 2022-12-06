import React from 'react';
import useSolutions from 'context/solutions';
import _ from 'lodash';

const WorkSurface = () => {
  const { solutions, currentSolutionId, isLoading } = useSolutions();

  // console.log('solutions: ', solutions);

  if (isLoading || !currentSolutionId || _.isEmpty(solutions[currentSolutionId]))
    return <div>Loading...</div>;

  console.log('DATA: ', solutions[currentSolutionId]);

  return (
    <div
      style={{
        borderRightWidth: '2px',
        borderRightStyle: 'solid',
        borderRightColor: 'black',
        display: 'flex',
        flex: 3,
        overflowWrap: 'break-all',
        wordBreak: 'break-all',
      }}
    >
      <svg
        width='100%'
        viewBox='0 0 1 1'
        preserveAspectRatio='xMidYMid meet'
        xmlns='http://www.w3.org/2000/svg'
      >
        {solutions[currentSolutionId].map((coordinates, i) => {
          // console.log('coordinates: ', coordinates);
          // for (const c of coordinates) {
          //   console.log('coordinate: ', c);
          //   console.log('transform to: ', [
          //     parseFloat(c[0]).toPrecision(32) + 100.0,
          //     parseFloat(c[1]).toPrecision(32) + 100.0,
          //   ]);
          // }
          const p = coordinates.map((c) => [
            parseFloat(c[0] * 10).toPrecision(32),
            parseFloat(c[1] * 10).toPrecision(32),
          ]);
          console.log('P: ', p);
          const points = p.map((c) => c.join(',')).join(' ');
          // console.log('POINTS: ', points);

          console.log('points: ', points);

          return <polygon key={`polygon-${i}`} points={points} fill='none' stroke='black' />;
        })}
      </svg>
    </div>
  );
};

export default WorkSurface;
