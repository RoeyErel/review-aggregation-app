import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/StreamCard/MovieCard'
import Cast from '../components/StreamCard/Cast'
//import Review from '../components/StreamCard/Review'

const Stream = () => {
    const { type, id } = useParams('')
    const [Movie, setMovie] = useState(false)

    const fetchStream = async (type, id) => {
        const details = await fetch('https://api.themoviedb.org/3/'+type+'/'+id+'?api_key='+process.env.REACT_APP_API_KEY+'&append_to_response=videos')
        const data = await details.json()
        setMovie(data) 
    }

    useEffect(() =>{
        fetchStream(type, id)
    },[type, id])

    return (
        <div id='Stream-Header' className='flex flex-col justify-center overflow-y-auto items-center w-full h-full absolute'>
            <img id='bg-img' className='w-full h-full object-cover absolute' src={`https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}`} alt={Movie?.title}/>
            <div id='bg-img-filter' className=' bg-gradient-to-t from-[#000500] to-black/70 relative top-0 left-0 w-full h-full'></div>
            <div className='w-[90%] h-full absolute'>
                <MovieCard streamIndex={id} StreamTV={type} />
                <Cast rowID='11' title='Cast' index={id} streamType={type} />
            </div>
        </div>
    )
}

export default Stream