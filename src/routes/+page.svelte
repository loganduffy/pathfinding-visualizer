<script>
  import { generateMaze, WALL, START, END } from "$lib/maze.js";
  const ROWS = 20;
  const COLS = 20;

  let grid = $state(generateMaze(ROWS, COLS));
  let startCell = $state(null);
  let endCell = $state(null);

  function handleClick(r, c) {
    if (grid[r][c] === WALL) return;

    if (!startCell) {
      startCell = [r, c];
    } else if (!endCell) {
      endCell = [r, c];
    } else {
      startCell = [r, c];
      endCell = null;
    }
  }

  function regenerate() {
    grid = generateMaze(ROWS, COLS);
    startCell = null;
    endCell = null;
  }

  function cellType(r, c) {
    if (startCell && startCell[0] === r && startCell[1] === c) return "start";
    if (endCell && endCell[0] === r && endCell[1] === c) return "end";
    if (grid[r][c] === WALL) return "wall";
    return "path";
  }
</script>

<div class="container">
  <h1>Pathfinding Visualizer</h1>
  <div class="controls">
    <button onclick={regenerate}>Generate Maze</button>
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
</style>
