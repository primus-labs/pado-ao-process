import {message, result} from "@permaweb/aoconnect"
import {NODE_PROCESS} from "./constants"
import {getComputationProviderWallet, getExpectedMessage, getTag, ComputationProviderWallet} from "./utils"

export async function testAddWhiteList(address: string, computationProviderWallet: ComputationProviderWallet) {
    let action = "AddWhiteList"
    let msgId = await message({
        "process": NODE_PROCESS,
        "signer": computationProviderWallet.signer,
        "tags": [
            {"name": "Action", "value": action},
            {"name": "Address", "value": address},
        ]
    })

    let Result = await result({
        "message": msgId,
        "process": NODE_PROCESS,
    })
    if (Result.Error) {
        console.log(Result.Error)
    }
    let Messages = Result.Messages
    if (getTag(Messages[0], "Error")) {
        throw getTag(Messages[0], "Error")
    }
    return Messages[0].Data
}

export async function testGetWhiteList(computationProviderWallet: ComputationProviderWallet) {
    let action = "GetWhiteList"
    let msgId = await message({
        "process": NODE_PROCESS,
        "signer": computationProviderWallet.signer,
        "tags": [
            {"name": "Action", "value": action},
        ],
    })

    let Result = await result({
        "message": msgId,
        "process": NODE_PROCESS,
    })
    if (Result.Error) {
        console.log(Result.Error)
    }
    let Messages = Result.Messages
    if (getTag(Messages[0], "Error")) {
        throw getTag(Messages[0], "Error")
    }
    console.log("white list: ", Messages[0].Data)
    return Messages[0].Data
}

export async function testRemoveWhiteList(address: string, computationProviderWallet: ComputationProviderWallet) {
    let action = "RemoveWhiteList"
    let msgId = await message({
        "process": NODE_PROCESS,
        "signer": computationProviderWallet.signer,
        "tags": [
            {"name": "Action", "value": action},
            {"name": "Address", "value": address},
        ]
    })
    let Result = await result({
        "message": msgId,
        "process": NODE_PROCESS,
    })
    if (Result.Error) {
        console.log(Result.Error)
    }
    let Messages = Result.Messages
    if (getTag(Messages[0], "Error")) {
        throw getTag(Messages[0], "Error")
    }
    return Messages[0].Data
}
async function testRegistry(name: string, computationProviderWallet:ComputationProviderWallet) {
    let action = "Register"
    let publicKey = "public key"
    let desc = Date() 

    let msgId = await message({
        "process": NODE_PROCESS,
        "signer": computationProviderWallet.signer,
        "tags" : [
            {"name": "Action", "value": action},
            {"name": "Name", "value": name},
            {"name": "Desc", "value": desc},
        ],
        "data": publicKey
    });

    let Result = await result({
        "message": msgId,
        "process": NODE_PROCESS,
    });
    if (Result.Error) {
        console.log(Result.Error)
    }
    let Messages = Result.Messages
    if (getTag(Messages[0], "Error")) {
        throw getTag(Messages[0], "Error")
    }
    // console.log("register res: ", Messages);
    return Messages[0].Data
}
export async function testGetAllNodes(computationProviderWallet: ComputationProviderWallet) {
    let action = "Nodes"
    
    let msgId = await message({
        "process": NODE_PROCESS,
        "signer": computationProviderWallet.signer,
        "tags": [
            {"name": "Action", "value": action},
        ]
    });
    let Result = await result({
        "message": msgId,
        "process": NODE_PROCESS,
    });
    if (Result.Error) {
        console.log(Result.Error)
    }
    let Messages = Result.Messages
    if (getTag(Messages[0], "Error")) {
        throw getTag(Messages[0], "Error")
    }
    // console.log("all process: ", Messages)
    return Messages[0].Data
}

async function testGetNodeByName(name: string, computationProviderWallet: ComputationProviderWallet) {
    let action = "GetNodeByName"

    let msgId = await message({
        "process": NODE_PROCESS,
        "signer": computationProviderWallet.signer,
        "tags": [
            {"name": "Action", "value": action},
            {"name": "Name", "value": name},
        ]
    });
    let Result = await result({
        "message": msgId,
        "process": NODE_PROCESS,
    });
    if (Result.Error) {
        console.log(Result.Error)
    }
    let Messages = Result.Messages
    if (getTag(Messages[0], "Error")) {
        throw getTag(Messages[0], "Error")
    }
    return Messages[0].Data
}
export async function testVerifyComputeNodes(names: string[], indices: number[], computationProviderWallet: ComputationProviderWallet) {
    let action = "VerifyComputeNodes"

    let computeNodeList = []
    for (let i = 0; i < names.length; i++) {
        let node = {"name": names[i], "index": indices[i]}
        computeNodeList.push(node)
    }

    let computeNodes = JSON.stringify(computeNodeList)

    let msgId = await message({
        "process": NODE_PROCESS,
        "signer": computationProviderWallet.signer,
        "tags": [
            {"name": "Action", "value": action},
            {"name": "ComputeNodes", "value": computeNodes},
        ],
    });
    let Result = await result({
        "process": NODE_PROCESS,
        "message": msgId,
    })
    if (Result.Error) {
        throw Result.Error
    }
    let Messages = Result.Messages
    let Message = await getExpectedMessage(Messages, computationProviderWallet.address)
    if (getTag(Message, "Error")) {
        throw getTag(Message, "Error")
    }
    return Message.Data

}

async function testDelete(name: string, computationProviderWallet: ComputationProviderWallet) {
    let action = "Delete"

    let msgId = await message({
        "process": NODE_PROCESS,
        "signer": computationProviderWallet.signer,
        "tags": [
            {"name": "Action", "value": action},
            {"name": "Name", "value": name},
        ],
    });
    let Result = await result({
        "message": msgId,
        "process": NODE_PROCESS,
    });
    if (Result.Error) {
        console.log(Result.Error)
    }
    let Messages = Result.Messages
    let Message = await getExpectedMessage(Messages, computationProviderWallet.address)
    if (getTag(Message, "Error")) {
        throw getTag(Message, "Error")
    }
    return Message.Data
}

export async function registerAllNodes(names: string[], computationProviderWallet: ComputationProviderWallet) {
    for (let name of names) {
        let aos = await testRegistry(name, computationProviderWallet);
        console.log(`register ${name} result: ${aos}`)
    }
}

async function getAllNodesByName(names: string[], computationProviderWallet: ComputationProviderWallet) {
    for (let name of names) {
        let res = await testGetNodeByName(name, computationProviderWallet.signer)
        console.log(`get node by name ${name} result: ${res}`)
    }
}

export async function deleteAllNodes(names: string[], computationProviderWallet: ComputationProviderWallet) {
    for (let name of names) {
        let res = await testDelete(name, computationProviderWallet);
        console.log(`delete ${name} result: ${res}`)
    }
}

export async function main() {
    let computationProviderWallet = await getComputationProviderWallet();

    let nodes = ["js_aos", "js_aos2", "js_aos3"];
    await registerAllNodes(nodes, computationProviderWallet)

    let allProcess = await testGetAllNodes(computationProviderWallet);
    console.log("allProcess: ", allProcess)

    await getAllNodesByName(nodes, computationProviderWallet)

    await deleteAllNodes(nodes, computationProviderWallet)
}

// main()
