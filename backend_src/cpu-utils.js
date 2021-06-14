const os = require('os')
const cpus = os.cpus()
const loadAvg = os.loadavg()
const userInfo = os.userInfo()
const networkInterfaces = os.networkInterfaces()
console.log(cpus);
console.log(loadAvg);
console.log(userInfo);
console.log(networkInterfaces);

const getMinLoadAverage = () => {
    const cpus = os.cpus()
    const loadAvg = os.loadavg()
    return loadAvg[0]/cpus.length
}

module.exports = {getMinLoadAverage}