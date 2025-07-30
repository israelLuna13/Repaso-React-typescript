import { BrowserRouter,Route,Routes } from "react-router-dom";
import App from "./App";
import Layout from "./layout/Layout";
import { PageArtists } from "./views/PageArtists";
import { PageAlbums } from "./views/PageAlbums";
import { PageSongs } from "./views/PageSongs";
import PageArtistsNew from "./views/artists/PageArtistsNew";
import PageAlbumsNew from "./views/albums/PageAlbumsNew";
import { PageSongsNew } from "./views/songs/PageSongsNew";

export default function Router(){

    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route element={<Layout/>}>
                        <Route  path="/"  element={<App/>}/>
                        <Route  path="/artists"  element={<PageArtists/>}/>
                         <Route  path="/artists/new"  element={<PageArtistsNew/>}/>
                        <Route  path="/albums"  element={<PageAlbums/>}/>
                        <Route  path="/albums/new"  element={<PageAlbumsNew/>}/>
                        <Route path="/songs" element={<PageSongs/>}/>
                         <Route path="/songs/new" element={<PageSongsNew/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
        
        </>
    )

}