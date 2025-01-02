import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { newDiscussionFunction, queryClient } from '../utils/queryUtils'

const NewDiscussion = () => {
    const [isInputOpen, setIsInputOpen] = React.useState(false)
    const mutation = useMutation({
        mutationFn: newDiscussionFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['discussions'] })
            setIsInputOpen(false)
        }
    })
    if (isInputOpen) {
        return (
            <form onSubmit={mutation.mutate}>
                <input
                    type='text'
                    name='message'
                    placeholder='Message'
                    className='border border-gray-300'
                />
                <button
                    type='submit'
                    className='text-blue-500 font-bold'
                >
                    Start
                </button>
            </form>
        )
    }
    return (
        <button
            className='text-blue-500 font-bold'
            onClick={() => setIsInputOpen(true)}
        >
            Start new discussion
        </button>
    )
}

export default NewDiscussion
