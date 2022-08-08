export const checkWin = (grid) => {
  if (checkVertical(grid)) {return checkVertical(grid)}
  if (checkHorizontal(grid)) {return checkHorizontal(grid)}
  if (checkUpDiag(grid)) {return checkUpDiag(grid)}
  if (checkDownDiag(grid)) {return checkDownDiag(grid)}
  if (checkFull(grid)) {return checkFull(grid)}
}

const checkVertical = (grid) => {
  for (let i = 0; i < 3; i++) {
    if (grid[0][i] && grid[0][i] === grid[1][i] && grid[0][i] === grid[2][i]) {
      return grid[0][i];
    }
  }
}

const checkHorizontal = (grid) => {
  for (let i = 0; i < 3; i++) {
    if (grid[i][0] && grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2]) {
      return grid[i][0];
    }
  }
}

const checkUpDiag = (grid) => {
  if (grid[2][0] && grid[2][0] === grid[1][1] && grid[2][0] === grid[0][2]) {
    return grid[2][0];
  }
}

const checkDownDiag = (grid) => {
  if (grid[0][0] && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
    return grid[0][0];
  }
}

const checkFull = (grid) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === null) {
        return false;
      }
    }
  }
  return "None";
}
