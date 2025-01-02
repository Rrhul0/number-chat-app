import DiscussionBlock from './DiscussionBlock'

const Discussions = ({
    discussions,
    topLevel = false
}: {
    discussions: Discussion[]
    topLevel?: boolean
}) => {
    if (topLevel)
        discussions.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
    return (
        <div className={`flex flex-col ${topLevel ? 'gap-4' : 'gap-2 ml-8'}`}>
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
