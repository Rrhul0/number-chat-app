import { useMutation } from '@tanstack/react-query'
import { mutationFunction, queryClient } from '../utils/queryUtils'

const ChatBox = ({ id, onSubmit }: { id: string; onSubmit: () => void }) => {
    const mutation = useMutation({
        mutationFn: mutationFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['discussions'] })
            onSubmit()
        }
    })
    return (
        <form onSubmit={mutation.mutate}>
            <input
                type='hidden'
                value={id}
                name='id'
            />
            <input
                type='text'
                name='message'
                placeholder='Type your message here...'
                autoFocus
            />
        </form>
    )
}

export default ChatBox
