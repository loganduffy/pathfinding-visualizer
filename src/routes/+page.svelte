<script>
  import { generateMaze, WALL, PATH, START, END, VISITED, SOLUTION } from "$lib/maze.js";
  import { bfs, dfs, dijkstra, astar } from "$lib/pathfinding"

  const algorithms = { bfs, dfs, dijkstra, astar }
  let selectedAlgorithm = $state("bfs")
  const ROWS = 20;
  const COLS = 20;

  let grid = $state(generateMaze(ROWS, COLS));
  let startCell = $state(null);
  let endCell = $state(null);

  function clearVisualization() {
    grid = grid.map(row =>
      row.map(cell =>
        cell === VISITED || cell === SOLUTION ? PATH : cell
      )
    )
  }

  function handleClick(r, c) {
    if (grid[r][c] === WALL) return;

    if (!startCell) {
      startCell = [r, c];
    } else if (!endCell) {
      endCell = [r, c];
    } else {
      clearVisualization()
      startCell = [r, c];
      endCell = null;
    }
  }

  function regenerate() {
    grid = generateMaze(ROWS, COLS);
    startCell = null;
    endCell = null;
  }

  function solve() {
    if (!startCell || !endCell) return;
    const result = algorithms[selectedAlgorithm](grid, startCell, endCell)
    
    let i = 0
    const interval = setInterval(() => {
      if (i >= result.visited.length) {
        clearInterval(interval)
        let j = 0
        const pathInterval = setInterval(() => {
          if (j >= result.path.length) {
            clearInterval(pathInterval)
            return
          }
          const [r, c] = result.path[j]
          if (grid[r][c] !== START && grid[r][c] !== END) {
            grid[r][c] = SOLUTION
            grid = grid
          }
          j++
        }, 30)
        return
      }
      const [r, c] = result.visited[i].split(',').map(Number)
      if (grid[r][c] !== START && grid[r][c] !== END) {
        grid[r][c] = VISITED
        grid = grid
      }
      i++
    }, 30)
  }

  function cellType(r, c) {
    if (startCell && startCell[0] === r && startCell[1] === c) return "start";
    if (endCell && endCell[0] === r && endCell[1] === c) return "end";
    if (grid[r][c] === WALL) return "wall";
    if (grid[r][c] === VISITED) return "visited";
    if (grid[r][c] === SOLUTION) return "solution";
    return "path";
  }

</script>

<div class="container">
  <h1>Pathfinding Visualizer</h1>
  <div class="controls">
    <button onclick={regenerate}>Generate Maze</button>
    <select bind:value={selectedAlgorithm}>
      <option value="bfs">BFS</option>
      <option value="dfs">DFS</option>
      <option value="dijkstra">Dijkstra's</option>
      <option value="astar">A*</option>
    </select>
    <button onclick={solve}>Solve</button>
  </div>
  <div
    class="grid"
    style="grid-template-columns: repeat({grid[0].length}, 20px)"
  >
    {#each grid as row, r}
      {#each row as _, c}
        <div
          class="cell {cellType(r, c)}"
          onclick={() => handleClick(r, c)}
        ></div>
      {/each}
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background: #111;
    min-height: 100vh;
    color: white;
  }

  .controls {
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem 1.5rem;
    background: #333;
    color: white;
    border: 1px solid #555;
    cursor: pointer;
    border-radius: 4px;
  }

  button:hover {
    background: #444;
  }

  select {
    padding: 0.5rem 1.5rem;
    background: #333;
    color: white;
    border: 1px solid #555;
    cursor: pointer;
    border-radius: 4px;
  }

  .grid {
    display: grid;
    gap: 0;
  }

  .cell {
    width: 20px;
    height: 20px;
  }

  .wall {
    background: #222;
  }
  .path {
    background: #888;
  }
  .start {
    background: #22c55e;
  }
  .end {
    background: #ef4444;
  }
  .visited {
    background: #60a5fa
  }
  .solution {
    background: #facc15
  }
</style>
