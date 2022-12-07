import React from 'react';
import useSolutions from 'context/solutions';
import _ from 'lodash';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
  Polygon,
  GeoJSON,
} from 'react-leaflet';
import L from 'leaflet';
import './WorkSurface.css';
import bigDecimal from 'js-big-decimal';

const MAP_HOST =
  'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'; // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const MAP_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ';

const WorkSurface = () => {
  const { solutions, currentSolutionId, isLoading } = useSolutions();

  if (isLoading || !currentSolutionId || _.isEmpty(solutions[currentSolutionId]))
    return <div>Loading...</div>;

  const center = __calculateCenter({ polygons: solutions[currentSolutionId] });

  return (
    <div
      style={{
        borderRightWidth: '4px',
        borderRightStyle: 'solid',
        borderRightColor: 'black',
        display: 'flex',
        flex: 3,
      }}
    >
      <MapContainer center={center} zoom={16} scrollWheelZoom={true}>
        <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_HOST} maxZoom={20} />
        {solutions[currentSolutionId].map((coordinates, i) => (
          <_Polygon key={`polygon-${i}`} index={i} coordinates={coordinates} />
        ))}
      </MapContainer>
    </div>
  );
};

const _Polygon = ({ index, coordinates }) => {
  const { setCurrentPolygonIndex } = useSolutions();

  // reset currentPolygonIndex when clicking outside of a polygon
  useMapEvents({
    click() {
      setCurrentPolygonIndex(null);
    },
  });

  const purpleOptions = { color: 'purple' };

  return (
    <Polygon
      eventHandlers={{
        click: (e) => {
          setCurrentPolygonIndex(index);
          // prevent base layer event handler from firing
          L.DomEvent.stopPropagation(e);
        },
      }}
      pathOptions={purpleOptions}
      positions={coordinates}
    />
  );
};

const __calculateCenter = ({ polygons }) => {
  let sumX = new bigDecimal(0.0);
  let sumY = new bigDecimal(0.0);
  let n = 0;

  for (const polygon of polygons) {
    for (const coord of polygon) {
      sumX = sumX.add(new bigDecimal(coord[0]));
      sumY = sumY.add(new bigDecimal(coord[1]));
      n += 1;
    }
  }

  n = new bigDecimal(n);
  return [parseFloat(sumX.divide(n, 16).getValue()), parseFloat(sumY.divide(n, 16).getValue())];
};

export default WorkSurface;
