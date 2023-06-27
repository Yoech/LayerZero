const {CHAIN_ID, CHAIN_STAGE, ChainStage} = require("@layerzerolabs/lz-sdk")

function getEndpointId() {
    if (isLocalhost()) {
        return 1337
    }
    console.log("hre:", hre.network.name)
    console.log("CHAIN_ID:", CHAIN_ID)
    return CHAIN_ID[hre.network.name]
}

function isLocalhost() {
    return hre.network.name === "localhost" || hre.network.name === "hardhat" || hre.network.name.substring(0, 7) == "ganache"
}

function isTestnet() {
    return (
        hre.network.name === "localhost" ||
        hre.network.name === "hardhat" ||
        hre.network.name.substring(0, 7) == "ganache" ||
        CHAIN_STAGE[hre.network.name] === ChainStage.TESTNET ||
        CHAIN_STAGE[hre.network.name] === ChainStage.TESTNET_SANDBOX
    )
}

module.exports = {
    getEndpointId,
    isTestnet,
    isLocalhost,
}
