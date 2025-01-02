type Discussion = {
    number: number
    id: string
    result: number
    operation: string | null
    createdAt: string
    parentId: string | null
    replies: Discussion[]
}
