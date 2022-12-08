import solution1 from 'data/SE_State_Management_Polygons_1.json';
import solution2 from 'data/SE_State_Management_Polygons_2.json';
import { v4 as uuidv4 } from 'uuid';

/**
 * Dummy API that reads from local data files.
 */
class SolutionsAPI {
  static async getAllSolutionIds() {
    return { data: { ids: [1, 2] } };
  }

  static async getSolutionById({ solutionId }) {
    switch (solutionId) {
      case 1:
        return { data: _transform(solution1) };
      case 2:
        return { data: _transform(solution2) };
      default:
        return {};
    }
  }
}

const _transform = (data) =>
  data.features.map((x) => ({
    id: uuidv4(),
    geometry: x.geometry,
  }));

export default SolutionsAPI;
