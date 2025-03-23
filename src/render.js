// ...existing code...

function drawEndpoints(map, endNodes) {
    endNodes.forEach(node => {
        console.log(`Drawing endpoint: ${node.name} at (${node.latitude}, ${node.longitude})`);
        // Add your map drawing logic here
        // Example:
        // map.addMarker({
        //     latitude: node.latitude,
        //     longitude: node.longitude,
        //     title: node.name
        // });
    });
}

// ...existing code...

// Example usage:
drawEndpoints(mapInstance, ENDNODES);

// ...existing code...
