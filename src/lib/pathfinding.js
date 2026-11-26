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

function getNeighbours(grid, [row, col]) {
  return [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ].filter(([r, c]) =>
    r >= 0 &&
    r < grid.length &&
    c >= 0 &&
    c < grid[0].length &&
    grid[r][c] !== WALL
  )
}
function buildPath(parent, endCell) {
  const path = []
  let cell = endCell

  while (cell) {
    path.push(cell)
    cell = parent[`${cell[0]},${cell[1]}`]
  }

  return path.reverse()
}

export function dfs(grid, startCell, endCell) {
  const stack = [startCell]
  const visited = new Set([`${startCell[0]},${startCell[1]}`])
  const parent = {}

  while (stack.length > 0) {
    const current = stack.pop()
    const [row, col] = current

    if (row === endCell[0] && col === endCell[1]) {
      return { found: true, path: buildPath(parent, endCell), visited:
        [...visited] }
    }

    for (const neighbour of getNeighbours(grid, current)) {
      const key = `${neighbour[0]},${neighbour[1]}`

      if (visited.has(key)) continue

      visited.add(key)
      parent[key] = current
      stack.push(neighbour)
    }
  }

  return { found: false, path: [], visited: [...visited] }
}

export function dijkstra(grid, startCell, endCell) {
  const startKey = `${startCell[0]},${startCell[1]}`
  const distances = { [startKey]: 0 }
  const parent = {}
  const visited = new Set()
  const visitOrder = []
  const queue = [{ cell: startCell, distance: 0 }]

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance)
    const { cell: current, distance } = queue.shift()
    const currentKey = `${current[0]},${current[1]}`

    if (visited.has(currentKey)) continue

    visited.add(currentKey)
    visitOrder.push(currentKey)

    if (current[0] === endCell[0] && current[1] === endCell[1]) {
      return { found: true, path: buildPath(parent, endCell), visited: visitOrder }
    }

    for (const neighbour of getNeighbours(grid, current)) {
      const neighbourKey = `${neighbour[0]},${neighbour[1]}`
      const newDistance = distance + 1

      if (
        distances[neighbourKey] === undefined ||
        newDistance < distances[neighbourKey]
      ) {
        distances[neighbourKey] = newDistance
        parent[neighbourKey] = current
        queue.push({ cell: neighbour, distance: newDistance })
      }
    }
  }

  return { found: false, path: [], visited: visitOrder }
}

export function astar(grid, startCell, endCell) {
  const key = ([r, c]) => `${r},${c}`
  const heuristic = ([r, c]) =>
    Math.abs(r - endCell[0]) + Math.abs(c - endCell[1])

  const startKey = key(startCell)
  const gScore = { [startKey]: 0 }
  const parent = {}
  const closed = new Set()
  const visitOrder = []
  const open = [{ cell: startCell, g: 0, f: heuristic(startCell) }]

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f)
    const { cell: current, g } = open.shift()
    const currentKey = key(current)

    if (closed.has(currentKey)) continue

    closed.add(currentKey)
    visitOrder.push(currentKey)

    if (current[0] === endCell[0] && current[1] === endCell[1]) {
      return { found: true, path: buildPath(parent, endCell), visited: visitOrder }
    }

    for (const neighbour of getNeighbours(grid, current)) {
      const neighbourKey = key(neighbour)
      const tentativeG = g + 1

      if (
        gScore[neighbourKey] === undefined ||
        tentativeG < gScore[neighbourKey]
      ) {
        gScore[neighbourKey] = tentativeG
        parent[neighbourKey] = current
        open.push({
          cell: neighbour,
          g: tentativeG,
          f: tentativeG + heuristic(neighbour),
        })
      }
    }
  }

  return { found: false, path: [], visited: visitOrder }
}
