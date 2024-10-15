import { utilService } from "./util.service.js"
import { loggerService } from "./logger.service.js"

export const bugService = {
    query,
    getById,
    remove,
    save,
}

const bugs = utilService.readJsonFile('./data/bug.json')

async function query() {
    try {
        return bugs
    } catch (err) {
        loggerService.error(err)
        throw `Couldn't get bugs...`
    }
}

async function getById(bugId) {
    try {
        const bug = bugs.find(bug => bug._id === bugId)
        if (!bug) throw `Couldn't get bug...`
        return bug
    } catch (err) {
        loggerService.error(err)
        throw `Couldn't get bug...`
    }
}

async function remove(bugId) {
    try {
        const idx = bugs.findIndex(bug => bug._id === bugId)
        if (idx === -1) throw `Bad bug Id`

        bugs.splice(idx, 1)
        _saveBugs()
    } catch (err) {
        loggerService.error(err)
        throw `Couldn't remove bug`
    }
}

async function save(bugToSave) {

    try {
        if (bugToSave._id) {
            const idx = bugs.findIndex(bug => bug._id === bugToSave._id)
            if (idx === -1) throw `Bad bug Id`

            bugs.splice(idx, 1, bugToSave)
        } else {
            bugToSave._id = utilService.makeId()
            bugs.push(bugToSave)
        }
        _saveBugs()
    } catch (err) {
        loggerService.error(err)
        throw `couldn't save bug`
    }
    return bugToSave
}

async function _saveBugs() {
    utilService.writeJsonFile('./data/bug.json', bugs)
}