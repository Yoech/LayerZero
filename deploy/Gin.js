const {getEndpointId} = require("../utils/network");
module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    // get the Endpoint address
    const endpoint = await ethers.getContract("Endpoint")

    console.log("[GIN]deployer=", deployer)
    console.log("[GIN]getEndpointId=", getEndpointId())
    console.log("[GIN]endpoint=", endpoint)

    await deploy("GIN", {
        from: deployer,
        args: [endpoint.address],
        log: true,
        waitConfirmations: 1,
    })
}

module.exports.tags = ["GIN"]
module.exports.dependencies = ["Endpoint"]