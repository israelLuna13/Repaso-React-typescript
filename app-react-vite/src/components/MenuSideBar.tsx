import MenuRoute from "./MenuRoute"

const musicNavigation = [
    {url:'/artists',text:'Artists',blank:false},
    {url:'/albums',text:'Albums',blank:false},
    {url:'/songs',text:'Songs',blank:false},
    {url:'/playlists',text:'Playlists',blank:false},
    {url:'/playlists-songs',text:'Playlists Songs',blank:false},
    {url:'/likes',text:'Likes',blank:false},
    {url:'/play-history',text:'Play History',blank:false},
    {url:'/purchases',text:'Purchases',blank:false}

]
export default function MenuSideBar(){
    return(
        <>
        <div className="space-y-3">
            <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">Navigation</p>
            <nav className="flex flex-col">
                {musicNavigation.map(link =>(
                    <MenuRoute key={link.url} link={link}/>
                ))}
            </nav>
        </div>
       
        
        </>
    )
}