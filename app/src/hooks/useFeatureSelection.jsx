import { useState } from 'react';
import * as turf from '@turf/turf';
import _ from 'lodash';

const useFeatureSelection = ({ features }) => {
  const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);

  const add = ({ id }) => {
    setSelectedFeatureIds((ids) => [...ids, id]);
  };

  const clear = () => {
    setSelectedFeatureIds([]);
  };

  const isEmpty = () => {
    return _.isEmpty(selectedFeatureIds);
  };

  const isSelected = ({ id }) => {
    return selectedFeatureIds.includes(id);
  };

  const all = () => {
    return selectedFeatureIds.map((id) => {
      const polygon = features.find((x) => x.id === id);
      return turf.feature(polygon.geometry);
    });
  };

  return { all, add, clear, isEmpty, isSelected };
};

export default useFeatureSelection;
