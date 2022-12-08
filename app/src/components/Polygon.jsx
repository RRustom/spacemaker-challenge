import React from 'react';
import useSolutions from 'context/solutions';
import _ from 'lodash';
import { useMapEvents, Polygon as _Polygon, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const Polygon = ({ polygon }) => {
  const { featureSelection } = useSolutions();

  // reset currentPolygonIndex when clicking outside of a polygon
  useMapEvents({
    click() {
      featureSelection.clear();
    },
  });

  const purpleOptions = {
    color: featureSelection.isSelected({ id: polygon.id }) ? 'green' : 'purple',
  };

  return (
    <GeoJSON
      eventHandlers={{
        click: (e) => {
          featureSelection.add({ id: polygon.id });
          // prevent base layer event handler from firing
          L.DomEvent.stopPropagation(e);
        },
      }}
      pathOptions={purpleOptions}
      data={{
        type: 'Feature',
        properties: {},
        geometry: polygon.geometry,
      }}
    />
  );
};

export default Polygon;
