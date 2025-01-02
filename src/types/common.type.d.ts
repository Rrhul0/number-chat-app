type Discussion = {
    number: number
    id: string
    result: number
    operation: string | null
    createdAt: Date
    parentId: string | null
    replies: Discussion[]
}
