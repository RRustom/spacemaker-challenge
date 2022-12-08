import * as turf from '@turf/turf';

export const UNION = 'union';
export const INTERSECTION = 'intersect';

const performOperation = ({ operationType, features }) => {
  return features.reduce((accumulator, feature) => {
    if (!accumulator) return feature;

    if (operationType === UNION) {
      return turf.union(accumulator, feature);
    } else {
      return turf.intersect(accumulator, feature);
    }
  });
};

export default performOperation;
