import React, { useState, forwardRef } from 'react';
import useSolutions from 'context/solutions';
import _ from 'lodash';
import { MapContainer, TileLayer } from 'react-leaflet';
import './WorkSurface.css';
import * as turf from '@turf/turf';
import Polygon from 'components/Polygon';
import OperationControl from 'components/OperationControl';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

  const center = turf.getCoord(
    turf.centroid(...solutions[currentSolutionId].map((feature) => turf.feature(feature.geometry))),
  );
  center.reverse();

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

        {solutions[currentSolutionId].map((polygon) => (
          <Polygon key={`polygon-${polygon.id}`} polygon={polygon} />
        ))}
      </MapContainer>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={__handleCloseError}>
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

const MAP_HOST = 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png';
const MAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export default WorkSurface;
