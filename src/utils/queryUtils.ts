import { QueryClient, queryOptions } from '@tanstack/react-query'

export const queryClient = new QueryClient()

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const discusstionsQueryOptions = queryOptions({
    queryKey: ['discussions'],
    queryFn: async () => {
        const response = await fetch(BACKEND_URL + '/discussions')
        return response.json() as Promise<Discussion[]>
    },
    staleTime: 1000 * 60 * 5
})

export const mutationFunction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const id = formData.get('id')
    const message = formData.get('message')
    return fetch(BACKEND_URL + '/respond/' + id, {
        method: 'POST',
        body: message
    })
}
