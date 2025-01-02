import DiscussionBlock from './DiscussionBlock'

const Discussions = ({ discussions }: { discussions: Discussion[] }) => {
    return (
        <div className='ml-8'>
            {discussions?.map(discussion => (
                <DiscussionBlock
                    key={discussion.id}
                    discussion={discussion}
                />
            ))}
        </div>
    )
}

export default Discussions
