import React, { useState, forwardRef } from 'react';
import useSolutions from 'context/solutions';
import _ from 'lodash';
import { MapContainer, TileLayer } from 'react-leaflet';
import './WorkSurface.css';
import bigDecimal from 'js-big-decimal';
import * as turf from '@turf/turf';
import Polygon from 'components/Polygon';
import OperationControl from 'components/OperationControl';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const MAP_HOST = 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png';

// 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'; // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const MAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

// 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ';

const WorkSurface = () => {
  const { solutions, currentSolutionId, isLoading } = useSolutions();
  const [error, setError] = useState('');

  const __handleCloseError = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError('');
  };

  if (isLoading || !currentSolutionId || _.isEmpty(solutions[currentSolutionId]))
    return <div>Loading...</div>;

  const center = __calculateCenter({ polygons: solutions[currentSolutionId] });

  console.log('SOLUTION: ', solutions[currentSolutionId]);

  return (
    <div
      style={{
        borderRightWidth: '4px',
        borderRightStyle: 'solid',
        borderRightColor: 'black',
        display: 'flex',
        flex: 3,
        flexFlow: 'column',
      }}
    >
      <OperationControl setError={setError} />
      <MapContainer center={center} zoom={16} maxZoom={20} scrollWheelZoom={true}>
        <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_HOST} />

        {solutions[currentSolutionId].map((polygon, i) => (
          <Polygon key={`polygon-${i}`} polygon={polygon} />
        ))}
      </MapContainer>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={__handleCloseError}>
        <_Alert severity='error' sx={{ width: '100%' }} onClose={__handleCloseError}>
          {error}
        </_Alert>
      </Snackbar>
    </div>
  );
};

const _Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const __calculateCenter = ({ polygons }) => {
  let sumX = new bigDecimal(0.0);
  let sumY = new bigDecimal(0.0);
  let n = 0;

  for (const polygon of polygons) {
    for (const coord of polygon.coords) {
      sumX = sumX.add(new bigDecimal(coord[0]));
      sumY = sumY.add(new bigDecimal(coord[1]));
      n += 1;
    }
  }

  n = new bigDecimal(n);
  return [parseFloat(sumX.divide(n, 16).getValue()), parseFloat(sumY.divide(n, 16).getValue())];
};

export default WorkSurface;
