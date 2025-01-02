import { useQuery } from '@tanstack/react-query'
import { discusstionsQueryOptions } from './utils/queryUtils'
import Discussions from './components/Discussions'
import NewDiscussion from './components/NewDiscussion'

function App() {
    const { data } = useQuery(discusstionsQueryOptions)
    if (!data) return <div>Loading...</div>

    return (
        <div className='p-4 flex flex-col gap-8'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold'>Discussions</h1>
                <NewDiscussion />
            </div>
            <Discussions
                discussions={data}
                topLevel
            />
        </div>
    )
}

export default App
