class PathfindingAlgorithm {
    constructor() {
        this.finished = false;
    }

    /**
     * Reset internal state and initialize new pathfinding
     * @param {(import("./Node").default)} startNode 
     * @param {(import("./Node").default)} endNode 
     */
    start(startNode, endNode) {

        console.log("[Algorithm] Starting with:", {
            startNode: startNode?.id,
            endNodes: endNode?.map(n => n.id) // Log all end node IDs
        });

        this.finished = false;
        this.startNode = startNode;
        this.endNode = endNode;
    }

    // Getter
    get finished() {
      return this._finished;
    }
  
    // Setter
    set finished(value) {
      this._finished = value;
    }

    /**
     * Progresses the pathfinding algorithm by one step/iteration
     * @returns {(import("./Node").default)[]} array of nodes that were updated
     */
    nextStep() {
        return [];
    }
}

export default PathfindingAlgorithm;