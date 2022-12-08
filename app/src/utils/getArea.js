import * as turf from '@turf/turf';

/**
 * Calculate the area of an aribitrary number of GeoJSON geometries
 * @param {Array<Object>} features: an array of GeoJSON Polygon or MultiPolygon feature objects
 * @returns {Number} the cumulative area of all geometries in m^2
 */
const getArea = ({ features }) => {
  return features.reduce((accumulator, polygon) => accumulator + turf.area(polygon), 0);
};

export default getArea;
