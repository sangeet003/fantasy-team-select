"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var players = [
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 },
            { id: 1, name: 'Mr. Nice', type: 'Mid-Fielder', cost: 300000 }
        ];
        return { players: players };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map