(function(ext) {
    // Cleanup when unloaded
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Boolean block: touching [SPRITE]'s clone where [VAR] = [VALUE]
    ext.touchingCloneVariable = function(spriteName, varName, valueVar) {
        const value = valueVar; // Already a variable in PM
        const targets = window.vm.runtime.targets;

        for (const t of targets) {
            if ((spriteName === 'every sprites' || t.getName() === spriteName) && !t.isOriginal) {
                const v = t.lookupVariableByNameAndType(varName, 'object');
                if (v && v.value == value) return true;
            }
        }
        return false;
    };

    // Reporter block: [SPRITE]'s clone [VAR1] ([IDVAR]'s [VAR2])
    ext.getCloneVariable = function(spriteName, varName1, idVarName, varName2, callerTarget) {
        const cloneId = callerTarget.lookupVariableByNameAndType(idVarName, 'object')?.value;
        if (!cloneId) return '';

        const targets = window.vm.runtime.targets.filter(t =>
            t.getName() === spriteName && !t.isOriginal && t.cloneId == cloneId
        );

        if (targets.length === 0) return '';
        const chosen = targets[Math.floor(Math.random() * targets.length)];

        const val = chosen.lookupVariableByNameAndType(varName2, 'object');
        return val ? val.value : '';
    };

    // Block definitions
    var descriptor = {
        blocks: [
            ['b', "touching %m.sprites's clone where %m.cloneVars = %v", "touchingCloneVariable", "Sprite1", "varName", "valueVar"],
            ['r', "%m.sprites's clone %m.cloneVars (%v's %v)", "getCloneVariable", "Sprite1", "varName", "cloneID", "innerVar"]
        ],
        menus: {
            sprites: ['every sprites', 'Sprite1', 'Sprite2'], // You can fill dynamically if needed
            cloneVars: ['var1', 'var2'] // You can fill dynamically
        }
    };

    ScratchExtensions.register('Clone+ Utils', descriptor, ext);
})({});
