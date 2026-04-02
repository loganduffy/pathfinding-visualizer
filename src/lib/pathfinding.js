import { WALL, PATH, SOLUTION, VISITED, END, START } from './maze.js'

export function bfs(grid, startCell, endCell) {
  const queue = []
  queue.push(startCell)

  const visited = new Set()
  visited.add(`${startCell[0]},${startCell[1]}`)

  const parent = {}

  while (queue.length > 0) {
    const current = queue.shift()
    if (current[0] === endCell[0] && current[1] === endCell[1]) {
      const path = [] 
      let cell = endCell
      while (cell) {
        path.push(cell)
        cell = parent[`${cell[0]},${cell[1]}`]
      }
      path.reverse()
      return { found: true, path, visited: [...visited]}
    } else {
      const [row, col] = current
      const neighbours = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ]

      for (const neighbour of neighbours) {
        const [r, c] = neighbour
        if (r < 0 || r >= grid.length) {
          continue
        }
        if (c < 0 || c >= grid[0].length) {
          continue
        }
        if (grid[r][c] === WALL) {
          continue
        }
        if (visited.has(`${r},${c}`)) {
          continue
        }
        visited.add(`${r},${c}`)
        queue.push(neighbour)
        parent[`${r},${c}`] = current
      }
    }
  }
  return { found: false, path: [], visited: [...visited]}
}

