import React from 'react'
import ChatBox from './ChatBox'
import Discussions from './Discussions'

const DiscussionBlock = ({ discussion }: { discussion: Discussion }) => {
    const [isChatBoxOpen, setIsChatBoxOpen] = React.useState(false)
    return (
        <div key={discussion.id}>
            <div>{discussion.id}</div>
            <div>{discussion.createdAt.toLocaleString()}</div>
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
            {discussion.replies && (
                <Discussions discussions={discussion.replies} />
            )}
        </div>
    )
}

export default DiscussionBlock
