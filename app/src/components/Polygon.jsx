import React from 'react';
import useSolutions from 'context/solutions';
import _ from 'lodash';
import { useMapEvents, Polygon as _Polygon } from 'react-leaflet';
import L from 'leaflet';

const Polygon = ({ polygon }) => {
  const { polygonSelection } = useSolutions();

  // reset currentPolygonIndex when clicking outside of a polygon
  useMapEvents({
    click() {
      polygonSelection.clear();
    },
  });

  const purpleOptions = {
    color: polygonSelection.isSelected({ id: polygon.id }) ? 'green' : 'purple',
  };

  return (
    <_Polygon
      eventHandlers={{
        click: (e) => {
          polygonSelection.add({ id: polygon.id });
          // prevent base layer event handler from firing
          L.DomEvent.stopPropagation(e);
        },
      }}
      pathOptions={purpleOptions}
      positions={polygon.coords}
    />
  );
};

export default Polygon;
