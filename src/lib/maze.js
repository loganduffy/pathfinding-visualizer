export const WALL = 0
export const PATH = 1
export const START = 2
export const END = 3 
export const VISITED = 4 
export const SOLUTION = 5 

export function generateMaze(rows, cols) {
  const height = rows * 2 + 1
  const width = cols * 2 + 1
  const grid = Array.from({ length: height }, () => Array(width).fill(WALL))

  function carve (r, c) {
    const directions = shuffle([[-1, 0], [1, 0], [0, -1], [0, 1]])
    for (const [dr, dc] of directions) {
      const nr = r + dr
      const nc = c + dc
      const gr = nr * 2 + 1
      const gc = nc * 2 + 1
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[gr][gc] === WALL) {
        grid[r * 2 + 1 + dr][c * 2 + 1 + dc] = PATH
        grid[gr][gc] = PATH
        carve(nr, nc)
      }
    }
  }

  grid[1][1] = PATH
  carve(0,0)
  return grid
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
