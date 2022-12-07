import { useState } from 'react';
import useSolutions from 'context/solutions';
import _ from 'lodash';

const usePolygonSelection = () => {
  const [selectedPolygonIds, setSelectedPolygonIds] = useState([]);

  const add = ({ id }) => {
    setSelectedPolygonIds((ids) => [...ids, id]);
  };

  const clear = () => {
    setSelectedPolygonIds([]);
  };

  const isEmpty = () => {
    return _.isEmpty(selectedPolygonIds);
  };

  const isSelected = ({ id }) => {
    return selectedPolygonIds.includes(id);
  };

  return { polygons: selectedPolygonIds, add, clear, isEmpty, isSelected };
};

export default usePolygonSelection;
