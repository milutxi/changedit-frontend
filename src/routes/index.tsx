import {LoaderFunctionArgs, useLoaderData, useSearchParams } from "react-router-dom"
import { Post } from "../types"
import PostListItem from "../components/PostListItem/PostListItem"
import Paginator from "../components/Paginator/Paginator"

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page') || 1;

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts?page=' + page, {
        headers: {
            'Accepts': 'apllication/json'
        }
    })


    const backendResponse = await response.json();

    return { page, ...backendResponse}


    // return await response.json()
    }

const Index =()=> {

    const data = useLoaderData() as { posts: Post[], totalPages: number, page: number };
    const [searchParams, setSearchParams] = useSearchParams();
    
    return (
        <div>
            {data?.posts?.map(post => <PostListItem post ={post} key={post._id}/>)}
            <Paginator 
                currentPage={data.page} 
                totalPages={data?.totalPages} 
                setPage={(page) => setSearchParams({...searchParams, page: page.toString() })}/> 
        </div>
        
        //{post.comments?.map(comment => <p>{comment.body} - {comment.author.userName}</p>)}
        
        )
    }



export default Index