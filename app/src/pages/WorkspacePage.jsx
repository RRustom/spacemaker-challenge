import React from 'react';
import Logo from 'components/Logo';
import SolutionsPanel from 'components/SolutionsPanel';
import StatisticsPanel from 'components/StatisticsPanel';
import WorkSurface from 'components/WorkSurface';

const WorkspacePage = () => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column nowrap', width: '100%', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'black',
          width: '100%',
          height: 80,
        }}
      >
        <Logo />
      </div>
      <div style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%', height: '100%' }}>
        <SolutionsPanel />
        <WorkSurface />
        <StatisticsPanel />
      </div>
    </div>
  );
};

export default WorkspacePage;
