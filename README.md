# Pathfinding Algorithm Visualizer

This is a program that visualizes various pathfinding algorithms to show how they work within a real world scenario (maze)

## What I Learned

I learned a lot about frontend applications doing this project, since this is my first experience with frontend stuff but I'll refer to what I actually built in bullet points instead of sentences.

- Used reactive state to track the maze grid, start/end ponts and chosen algorithm
- Handled user interaction through button clicks, clicking cells within the maze, and the dropdown selection menu
- Learned how to update the UI as an algorithm runs by animating visited cells and the final path that algorithm finds 
- Implemented very popular and some efficient graph traversal algorithms (well they're all efficient in their own scenarios but anyways) such as DFS, BFS, A*, and Dijkstra's algorithm
- Learned that different algorithms can find paths differently which sounds obvious but actually pretty interesting it's similar to if you put two different ants in a maze they're more likely to find different paths.
- Practiced debugging JavaScript errors and overall frontend behavior

# How to Run

1. Clone the repository with HTTPS

```bash
git clone https://github.com/loganduffy/pathfinding-visualizer.git
```
2. Enter the project directory:
```bash
cd pathfinding-visualizer
```
3. Install dependencies (npm):
```bash
npm install
```
4.  Run the program with
```bash
npm run dev
```
