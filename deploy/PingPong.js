const {isTestnet} = require("../utils/network")

module.exports = async function ({deployments, getNamedAccounts}) {
    const {deploy} = deployments
    const {deployer} = await getNamedAccounts()
    console.log("[PingPong]deployer=", deployer)

    // get the Endpoint address
    const endpoint = await ethers.getContract("Endpoint")

    console.log("[PingPong]endpoint=", endpoint.address)

    let contract = await deploy("PingPong", {
        from: deployer,
        args: [endpoint.address],
        log: true,
        waitConfirmations: 1,
    })

    console.log("contract=>", contract.address)
}

module.exports.skip = () =>
    new Promise(async (resolve) => {
        resolve(!isTestnet())
    })

module.exports.tags = ["PingPong", "test"]
// do not make this a dependency, it will cause a redeploy
module.exports.dependencies = ["Endpoint"]