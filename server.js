import express from 'express'
import cors from 'cors'

import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()

const corsOptions = {
	origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
	credentials: true,
}

app.use(express.static('public'))
app.use(cors(corsOptions))

const port = 3030

// Bug CRUDL

app.get('/api/bug', async (req, res) => {
	try {
		const bugs = await bugService.query()
		res.send(bugs)
	} catch (err) {
		res.status(400).send(err)
	}
})

app.get('/api/bug/save', async (req, res) => {
	const { _id, title, severity } = req.query
	const bugToSave = { _id, title, severity: +severity }

	try {
		const savedBug = await bugService.save(bugToSave)
		res.send(savedBug)
	} catch (err) {
		res.status(400).send(err)
	}
})

app.get('/api/bug/:bugId', async (req, res) => {
	const { bugId } = req.params

	try {
		const bug = await bugService.getById(bugId)
		res.send(bug)
	} catch (err) {
		res.status(400).send(err)
	}
})

app.get('/api/bug/:bugId/remove', async (req, res) => {
	const { bugId } = req.params

	try {
		await bugService.remove(bugId)
		res.send('OK')
	} catch (err) {
		res.status(400).send(`Couldn't remove bug`)
	}
})

app.listen(port, () => {
	loggerService.info(`Example app listening on port ${port}`)
})
