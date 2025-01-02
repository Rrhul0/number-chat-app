import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
app.use(express.text({ type: '*/*' }))
app.use(cors())

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const prisma = new PrismaClient()

app.post('/start', async (req, res) => {
    const number = req.body
    if (isNaN(number)) {
        return res.status(400).send('Invalid number')
    }

    try {
        const newDiscussion = await prisma.discussion.create({
            data: {
                number: parseInt(number),
                result: parseInt(number)
            }
        })
        res.status(201).json(newDiscussion)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create discussion' })
    }
})

app.post('/respond/:id', async (req, res) => {
    const { id } = req.params
    const respondString = req.body // like '+1'
    const operation = respondString[0]
    const number = parseInt(respondString.slice(1))
    try {
        const discussion = await prisma.discussion.findUnique({
            where: { id }
        })

        if (!discussion) {
            return res.status(404).send('Discussion not found')
        }

        let result
        switch (operation) {
            case '+':
                result = discussion.result + number
                break
            case '-':
                result = discussion.result - number
                break
            case '*':
                result = discussion.result * number
                break
            case '/':
                if (number === 0) {
                    return res.status(400).send('Cannot divide by zero')
                }
                result = Math.abs(discussion.result / number)
                break
            default:
                return res.status(400).send('Invalid operation')
        }

        const response = await prisma.discussion.create({
            data: {
                number,
                result,
                parentId: id,
                operation: respondString
            }
        })

        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({ error: 'Failed to respond to discussion' })
    }
})

app.get('/discussions', async (req, res) => {
    try {
        const discussions = await prisma.discussion.findMany({
            include: {}
        })
        const createTree = (discussions, parentId = null) => {
            return discussions
                .filter(discussion => discussion.parentId === parentId)
                .map(discussion => ({
                    ...discussion,
                    replies: createTree(discussions, discussion.id)
                }))
        }

        const discussionTree = createTree(discussions)
        res.json(discussionTree)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch discussions' })
    }
})
