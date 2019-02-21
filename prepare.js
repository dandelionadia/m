const { spawnSync } = require('child_process');

spawnSync('git', ['remote', 'remove', 'origin']);
