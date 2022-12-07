import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import SolutionsAPI from 'api/solutions';
import usePolygonSelection from 'hooks/usePolygonSelection';
import _ from 'lodash';

export const SolutionsContext = createContext();

export const SolutionsProvider = ({ children }) => {
  const [solutions, setSolutions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSolutionId, setCurrentSolutionId] = useState(null);
  const polygonSelection = usePolygonSelection();

  useEffect(() => {
    if (_.isEmpty(solutions)) {
      __fetchSolutionIds({ setIsLoading, setSolutions, setIsError, setCurrentSolutionId });
    }
  }, []);

  useEffect(() => {
    if (currentSolutionId && _.isEmpty(solutions[currentSolutionId])) {
      __fetchSolutionById({
        solutionId: currentSolutionId,
        setIsLoading,
        setSolutions,
        setIsError,
      });
    }
  }, [currentSolutionId]);

  const switchToSolution = ({ solutionId }) => {
    setCurrentSolutionId(solutionId);
    polygonSelection.clear();
  };

  const memoedValues = useMemo(
    () => ({
      solutions,
      setSolutions,
      currentSolutionId,
      switchToSolution,
      isLoading,
      isError,
      polygonSelection,
    }),
    [
      solutions,
      setSolutions,
      currentSolutionId,
      switchToSolution,
      isLoading,
      isError,
      polygonSelection,
    ],
  );

  return <SolutionsContext.Provider value={memoedValues}>{children}</SolutionsContext.Provider>;
};

export default function useSolutions() {
  return useContext(SolutionsContext);
}

const __fetchSolutionIds = async ({
  setIsLoading,
  setSolutions,
  setIsError,
  setCurrentSolutionId,
}) => {
  try {
    setIsLoading(true);
    const response = await SolutionsAPI.getAllSolutionIds();
    console.log('SOLUTION IDS: ', response);
    if (response) {
      setSolutions((solutions) => ({
        ...solutions,
        ...response.data.ids.reduce((accumulator, id) => ({ ...accumulator, [id]: [] }), {}),
      }));
      setCurrentSolutionId(response.data.ids[0]);
    }
  } catch (err) {
    setIsError(true);
    console.log('Error: ', err);
  } finally {
    setIsLoading(false);
  }
};

const __fetchSolutionById = async ({ solutionId, setIsLoading, setSolutions, setIsError }) => {
  try {
    setIsLoading(true);
    const response = await SolutionsAPI.getSolutionById({ solutionId });
    if (response) {
      setSolutions((solutions) => ({ ...solutions, [solutionId]: response.data }));
    }
  } catch (err) {
    setIsError(true);
    console.log('Error: ', err);
  } finally {
    setIsLoading(false);
  }
};
