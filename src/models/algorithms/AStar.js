import PathfindingAlgorithm from "./PathfindingAlgorithm";

class AStar extends PathfindingAlgorithm {
    constructor() {
        super();
        this.openList = [];
        this.closedList = [];
        this.shortestPath = null; // Add this to track the shortest path
    }

    start(startNode, endNodes) { // Accept an array of end nodes
        super.start(startNode, endNodes);
        this.openList = [startNode];
        this.closedList = [];
        this.shortestPath = null;
        
        startNode.distanceFromStart = 0;
        startNode.distanceToEnd = this.calculateMinDistance(startNode, endNodes);
        startNode.totalDistance = startNode.distanceFromStart + startNode.distanceToEnd;
    }

    calculateMinDistance(node, endNodes) {
        return Math.min(...endNodes.map(endNode => 
            Math.hypot(endNode.longitude - node.longitude, endNode.latitude - node.latitude)
        ));
    }

    nextStep() {
        if(this.openList.length === 0) {
            console.log("[A*] No more nodes in open list - finished");

            this.finished = true;
            return [];
        }

        const updatedNodes = [];
        const currentNode = this.openList.reduce((acc, current) => 
            current.totalDistance < acc.totalDistance ? current : acc, this.openList[0]
        );

        console.log("[A*] Processing node:", {
            id: currentNode.id,
            totalDistance: currentNode.totalDistance,
            isEndNode: this.endNodes.some(n => n.id === currentNode.id) // Check if current node is an end node
        });
      

        this.openList.splice(this.openList.indexOf(currentNode), 1);
        currentNode.visited = true;

        // Check if current node is one of the end nodes
        if (this.endNodes.some(endNode => currentNode.id === endNode.id)) {
            console.log("[A*] Reached end node:", currentNode.id);
            this.shortestPath = currentNode;
            this.finished = true; // Stop algorithm immediately
        }
      

        for(const neighbor of currentNode.neighbors) {
            const neighborNode = neighbor.node;
            const edge = neighbor.edge;
            const newDistance = currentNode.distanceFromStart + Math.hypot(
                neighborNode.longitude - currentNode.longitude,
                neighborNode.latitude - currentNode.latitude
            );

            if(newDistance < neighborNode.distanceFromStart) {
                neighborNode.distanceFromStart = newDistance;
                neighborNode.referer = currentNode;
                neighborNode.distanceToEnd = this.calculateMinDistance(neighborNode, this.endNodes);
                neighborNode.totalDistance = neighborNode.distanceFromStart + neighborNode.distanceToEnd;

                if(!this.openList.includes(neighborNode)) {
                    this.openList.push(neighborNode);
                }
            }
        }

        this.closedList.push(currentNode);
        return [...currentNode.neighbors.map(n => n.node), currentNode];
    }

    get finished() {
        return this._finished || (this.shortestPath !== null);
    }

    getShortestPath() {
        return this.shortestPath;
    }
}

export default AStar;















// import PathfindingAlgorithm from "./PathfindingAlgorithm";

// class AStar extends PathfindingAlgorithm {
//     constructor() {
//         super();
//         this.openList = [];
//         this.closedList = [];
//     }

//     start(startNode, endNode) {
//         super.start(startNode, endNode);
//         this.openList = [this.startNode];
//         this.closedList = [];
//         this.startNode.distanceFromStart = 0;
//         this.startNode.distanceToEnd = 0;
//     }

//     nextStep() {
//         if(this.openList.length === 0) {
//             this.finished = true;
//             return [];
//         }

//         const updatedNodes = [];
//         const currentNode = this.openList.reduce((acc, current) => current.totalDistance < acc.totalDistance ? current : acc, this.openList[0]);
//         this.openList.splice(this.openList.indexOf(currentNode), 1);
//         currentNode.visited = true;
//         const refEdge = currentNode.edges.find(e => e.getOtherNode(currentNode) === currentNode.referer);
//         if(refEdge) refEdge.visited = true;

//         // Found end node
//         if(currentNode.id === this.endNode.id) {
//             this.openList = [];
//             this.finished = true;
//             return [currentNode];
//         }

//         for(const n of currentNode.neighbors) {
//             const neighbor = n.node;
//             const edge = n.edge;
//             const neighborCurrentCost = currentNode.distanceFromStart + Math.hypot(neighbor.longitude - currentNode.longitude, neighbor.latitude - currentNode.latitude);

//             // Fill edges that are not marked on the map
//             if(neighbor.visited && !edge.visited) {
//                 edge.visited = true;
//                 neighbor.referer = currentNode;
//                 updatedNodes.push(neighbor);
//             }

//             if(this.openList.includes(neighbor)) {
//                 if(neighbor.distanceFromStart <= neighborCurrentCost) continue;
//             }
//             else if(this.closedList.includes(neighbor)) {
//                 if(neighbor.distanceFromStart <= neighborCurrentCost) continue;
//                 this.closedList.splice(this.closedList.indexOf(neighbor), 1);
//                 this.openList.push(neighbor);
//             }
//             else {
//                 this.openList.push(neighbor);
//                 neighbor.distanceToEnd = Math.hypot(neighbor.longitude - this.endNode.longitude, neighbor.latitude - this.endNode.latitude);
//             }

//             neighbor.distanceFromStart = neighborCurrentCost;
//             neighbor.referer = currentNode;
//             neighbor.parent = currentNode;
//         }

//         this.closedList.push(currentNode);

//         return [...updatedNodes, currentNode];
//     }
// }

// export default AStar;