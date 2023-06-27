const CONFIG = require("../constants/config.json")
const { isTestnet, getEndpointId} = require("../utils/network")

function getDependencies() {
    let rtn = ["Endpoint"]
    if (isTestnet()) {
        rtn = rtn.concat(["RelayerStaking"])
        rtn = rtn.concat(["LayerZeroOracleMock"])
        rtn = rtn.concat(["LayerZeroTokenMock"])
        console.log("[ULN]rtn:",rtn)
    }
    return rtn
}

module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    const endpoint = await ethers.getContract("Endpoint")
    console.log("[ULN]endpoint:",endpoint.address)

    const { address } = await deploy("UltraLightNode", {
        from: deployer,
        args: [endpoint.address],
        // if set it to true, will not attempt to deploy
        // even if the contract deployed under the same name is different
        skipIfAlreadyDeployed: true,
        log: true,
        waitConfirmations: 1,
    })

    if (isTestnet()) {
        const oracle = await ethers.getContract("LayerZeroOracleMock")
        await (await oracle.setUln(address)).wait()
        const layerZeroToken = await deployments.get("LayerZeroTokenMock")
        const ultraLightNode = await ethers.getContract("UltraLightNode")
        await (await ultraLightNode.setLayerZeroToken(layerZeroToken.address)).wait()
    }
}

module.exports.tags = ["UltraLightNode", "test"]
module.exports.dependencies = getDependencies()