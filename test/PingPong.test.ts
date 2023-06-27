import {expect} from "chai";
import {ethers} from "hardhat";
import {Contract} from "ethers";

describe("Test>>>PingPong", function () {
    let contract: Contract

    before(async function () {
        await async function () {
            const [owner, otherAccount] = await ethers.getSigners()
            console.log("owner:" + owner.address)
            console.log("_isSigner:" + owner._isSigner)
            console.log("getChainId:" + (await owner.getChainId()))
            console.log("getAddress:" + (await owner.getAddress()))
            console.log("getGasPrice:" + (await owner.getGasPrice()))
            let freeData = await otherAccount.getFeeData()
            console.log("gasPrice:" + freeData.gasPrice)
            console.log("lastBaseFeePerGas:" + freeData.lastBaseFeePerGas)
            console.log("maxFeePerGas:" + freeData.maxFeePerGas)
            console.log("maxPriorityFeePerGas:" + freeData.maxPriorityFeePerGas)
            console.log("-------------------------")
            console.log("otherAccount:" + otherAccount.address)
            console.log("_isSigner:" + otherAccount._isSigner)
            console.log("getChainId:" + (await otherAccount.getChainId()))
            console.log("getAddress:" + (await otherAccount.getAddress()))
            console.log("getGasPrice:" + (await otherAccount.getGasPrice()))
            freeData = await otherAccount.getFeeData()
            console.log("gasPrice:" + freeData.gasPrice)
            console.log("lastBaseFeePerGas:" + freeData.lastBaseFeePerGas)
            console.log("maxFeePerGas:" + freeData.maxFeePerGas)
            console.log("maxPriorityFeePerGas:" + freeData.maxPriorityFeePerGas)
            console.log("-------------------------")

            const factory = await ethers.getContractFactory("PingPong")
            // ganache8545-Endpoint
            // let endpoint = await ethers.getSigner("0x38C94B417f0A2cB97A92999d003EFBE836B6037C");
            // // ganache8546-Endpoint
            let endpoint = await ethers.getSigner("0xE579274F852A844e1ACbf67ec2885751c8EFb4F7");
            contract = await factory.deploy(endpoint.address)

            let deployed = await contract.deployed()
            // console.log("deployed>>>>>", deployed)
            console.log("-------------------------")
            console.log("contracts.address:" + contract.address)
            console.log("deployed.address:" + deployed.address)
        }()
    })

    it("Test>>>Method>>>ping", async function () {
        console.log("aaaaa")
        let target = await ethers.getSigner("0xE579274F852A844e1ACbf67ec2885751c8EFb4F7");
        let tx = await contract.ping(1338,target.address,10)
        console.log("bbbbb")
        let ret = await tx.wait()
        console.log("-------------------------")
        console.log("from-->" + ret.from) // wallet.account.0
        console.log("to-->" + ret.to) // contract addr
        console.log("gasUsed-->" + ret.gasUsed) // gas used
        console.log("blockNumber-->" + ret.blockNumber) // block no
        console.log("blockHash-->" + ret.blockHash) // block hash
        console.log("txHash-->" + ret.transactionHash) // tx hash
        console.log("status-->" + ret.status)
        console.log("type-->" + ret.type)
        console.log("confirmations-->" + ret.confirmations)
        console.log("byzantium-->" + ret.byzantium)
        console.log("-------------------------")
        expect(await contract.Get()).to.equal(1)
    })
})