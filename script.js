const graph = {
    A: { B: 4, C: 1 },
    B: { A: 4, C: 2, D: 5 },
    C: { A: 1, B: 2, D: 8, E: 10 },
    D: { B: 5, C: 8, E: 2, F: 6 },
    E: { C: 10, D: 2, F: 3 },
    F: { D: 6, E: 3 }
};

function dijkstra(graph, startNode, endNode) {
    const distances = {};
    const visited = {};
    const previous = {};
    const priorityQueue = [];

    // Initialize distances and queue
    for (let node in graph) {
        distances[node] = Infinity;
        visited[node] = false;
    }
    distances[startNode] = 0;
    priorityQueue.push({ node: startNode, distance: 0 });

    while (priorityQueue.length > 0) {
        priorityQueue.sort((a, b) => a.distance - b.distance);
        const { node: currentNode } = priorityQueue.shift();

        if (visited[currentNode]) continue;
        visited[currentNode] = true;

        for (let neighbor in graph[currentNode]) {
            const newDist = distances[currentNode] + graph[currentNode][neighbor];
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                previous[neighbor] = currentNode;
                priorityQueue.push({ node: neighbor, distance: newDist });
            }
        }
    }

    // Reconstruct the shortest path
    const path = [];
    let current = endNode;
    while (current) {
        path.unshift(current);
        current = previous[current];
    }

    return { distance: distances[endNode], path };
}

function findShortestPath() {
    const startNode = document.getElementById('startNode').value.toUpperCase();
    const endNode = document.getElementById('endNode').value.toUpperCase();

    if (!graph[startNode] || !graph[endNode]) {
        document.getElementById('result').innerHTML = "Invalid nodes!";
        return;
    }

    const { distance, path } = dijkstra(graph, startNode, endNode);

    if (distance === Infinity) {
        document.getElementById('result').innerHTML = `No path found between ${startNode} and ${endNode}`;
    } else {
        document.getElementById('result').innerHTML = 
            `Shortest path: ${path.join(' → ')}<br>Distance: ${distance}`;
    }
}