import Node from "./Node";

export default class Graph {
    constructor() {
        this.startNode = null;
        this.nodes = new Map();
    }

    /**
     * 
     * @param {Number} id 
     * @returns node with given Id
     */
    getNode(id) {
        return this.nodes.get(id);
    }

    /**
     * 
     * @param {Number} id node id
     * @param {Number} latitude node latitude
     * @param {Number} longitude node longitude
     * @returns {Node} created node
     */
    addNode(id, latitude, longitude) {
        const nodeId = id || `${latitude},${longitude}`; // Use coordinates as fallback ID
        const node = new Node(nodeId, latitude, longitude);
        this.nodes.set(node.id, node);
        return node;
    }
    
    getNodeByCoordinates(latitude, longitude) {
        for (const node of this.nodes.values()) {
            if (node.latitude === latitude && node.longitude === longitude) return node;
        }
        return null; // Node not found
    }
    
}