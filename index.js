const logger = require('pino')({
        transport: {
                target: 'pino-pretty',
                options: {
                        colorize: true
                }
        }
})

const config = require("./config.json");
const input = require("./input.json");

const set = (obj, path, value) => {
        if (Object(obj) !== obj) return obj; 
        if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []; 
        path.slice(0,-1).reduce((a, c, i) => 
             Object(a[c]) === a[c] 
                 ? a[c] 
                 : a[c] = Math.abs(path[i+1])>>0 === +path[i+1] 
                       ? [] 
                       : {},
             obj)[path[path.length-1]] = value; 
        return obj;
};

Object.keys(input).forEach(key => {
        try {
            logger.info(`Handling ${key}...`);
            set(input,key,input[key]);    
            logger.info(`Handling ${key} successfully!`);
        } catch (error) {
            logger.error(`Error when handling ${key}..`);    
        }
})
console.log(JSON.stringify(config));


