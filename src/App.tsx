import { useQuery } from '@tanstack/react-query'
import { discusstionsQueryOptions } from './utils/queryUtils'
import Discussions from './components/Discussions'

function App() {
    const { data } = useQuery(discusstionsQueryOptions)
    console.log(data)
    if (!data) return <div>Loading...</div>

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>Discussions</h1>
            <Discussions discussions={data} />
        </div>
    )
}

export default App
