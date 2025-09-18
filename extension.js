(function(ext) {
    ext._shutdown = function() {};
    ext._getStatus = function() { return {status: 2, msg: 'Ready'}; };

    // Internal storage for clone variables
    const cloneStore = {};

    // Utility: register a clone
    ext.registerClone = function(spriteName, cloneId, variables) {
        if (!cloneStore[spriteName]) cloneStore[spriteName] = {};
        cloneStore[spriteName][cloneId] = {...variables};
    };

    // Boolean: check if any clone of a sprite has var = value
    ext.touchingCloneVariable = function(spriteName, varName, valueVar) {
        if (!cloneStore[spriteName]) return false;
        for (const cloneId in cloneStore[spriteName]) {
            const cloneVars = cloneStore[spriteName][cloneId];
            if (cloneVars[varName] == valueVar) return true;
        }
        return false;
    };

    // Reporter: get a variable from a random clone
    ext.getCloneVariable = function(spriteName, varName1, idVarName, varName2) {
        if (!cloneStore[spriteName]) return '';
        const cloneIds = Object.keys(cloneStore[spriteName]);
        if (cloneIds.length === 0) return '';

        // Pick a random clone
        const chosenId = cloneIds[Math.floor(Math.random() * cloneIds.length)];
        const cloneVars = cloneStore[spriteName][chosenId];
        return cloneVars[varName2] || '';
    };

    // Block definitions
    var descriptor = {
        blocks: [
            ['b', "touching %m.sprites's clone where %m.cloneVars = %v", "touchingCloneVariable", "Sprite1", "var1", "valueVar"],
            ['r', "%m.sprites's clone %m.cloneVars (%v's %v)", "getCloneVariable", "Sprite1", "var1", "cloneID", "innerVar"]
        ],
        menus: {
            sprites: ['Sprite1','Sprite2','every sprites'],
            cloneVars: ['var1','var2']
        }
    };

    ScratchExtensions.register('Clone+ Utils', descriptor, ext);
})();
