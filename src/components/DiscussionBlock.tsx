import React from 'react'
import ChatBox from './ChatBox'
import Discussions from './Discussions'

const DiscussionBlock = ({ discussion }: { discussion: Discussion }) => {
    const [isChatBoxOpen, setIsChatBoxOpen] = React.useState(false)
    return (
        <div key={discussion.id}>
            <div className='border rounded-md border-stone-500 p-2 mb-2'>
                <div className='text-purple-500 font-semibold'>
                    {!discussion.parentId && 'Discussion'}
                </div>
                <div>{discussion.id}</div>
                <div>
                    {new Date(discussion.createdAt).toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                        hour12: false
                    })}
                </div>
                <div>{discussion?.operation}</div>
                <div>Result {discussion.result}</div>
                {isChatBoxOpen ? (
                    <ChatBox
                        id={discussion.id}
                        onSubmit={() => setIsChatBoxOpen(false)}
                    />
                ) : (
                    <button
                        className='text-blue-600'
                        onClick={() => setIsChatBoxOpen(o => !o)}
                    >
                        Reply
                    </button>
                )}
            </div>
            {discussion.replies && (
                <Discussions discussions={discussion.replies} />
            )}
        </div>
    )
}

export default DiscussionBlock
