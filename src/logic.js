export const calculateRow = (row, solution) => {
  let tmpSolution = solution.slice();
  let result = [];
  for (let i = 0; i < 4; i++) {
    if (row[i] === solution[i]) {
      result.push('red');
      tmpSolution.splice(i, 1, '');
    }
  }
  for (let i = 0; i < 4; i++) {
    if (tmpSolution.includes(row[i])) {
      result.push('white');
      let index = tmpSolution.indexOf(row[i]);
      tmpSolution.splice(index, 1, '');
    }
  }
  return result;
}