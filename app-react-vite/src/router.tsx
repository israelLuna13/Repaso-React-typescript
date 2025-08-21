import { BrowserRouter,Route,Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { PageArtists } from "./views/PageArtists";
import { PageAlbums } from "./views/PageAlbums";
import { PageSongs } from "./views/PageSongs";
import PageArtistsNew from "./views/artists/PageArtistsNew";
import PageAlbumsNew from "./views/albums/PageAlbumsNew";
import { PageSongsNew } from "./views/songs/PageSongsNew";
import { PagePlayListSong } from "./views/playlist-songs/PagePlayListSong";
import PagePlayListSongNew from "./views/playlist-songs/PagePlayListSongNew";
import PagePlayList from "./views/playlists/PagePlayList";
import PagePlayListNew from "./views/playlists/PagePlayListNew";
import PageLikes from "./views/likes/PageLikes";
import PageLikesNew from "./views/likes/PageLikesNew";
import PagePlayHistory from "./views/play-hisyory/PagePlayHistory";
import PagePlayHistoryNew from "./views/play-hisyory/PagePlayHistoryNew";
import LayoutAuth from "./layout/LayoutAuth";
import ConfirmAccount from "./views/auth/ConfirmAccount";
import { CreateAccountView } from "./views/auth/CreateAccountView";

export default function Router(){

    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route element={<LayoutAuth/>}>
                <Route path="/create-account" element={< CreateAccountView/>} />
                 <Route path="/confirm-account" element={<ConfirmAccount />} />
              </Route>
              <Route element={<Layout />}>
                <Route path="/artists" element={<PageArtists />} />
                <Route path="/artists/new" element={<PageArtistsNew />} />
                <Route path="/albums" element={<PageAlbums />} />
                <Route path="/albums/new" element={<PageAlbumsNew />} />
                <Route path="/songs" element={<PageSongs />} />
                <Route path="/songs/new" element={<PageSongsNew />} />
                <Route path="/playlists" element={<PagePlayList/>} />
                <Route path="/playlists/new" element={<PagePlayListNew />} />
                <Route path="/playlists-songs" element={<PagePlayListSong />} />
                <Route path="/playlists-songs/new" element={<PagePlayListSongNew />}
                />

                    <Route path="/play-history" element={<PagePlayHistory />} />
                <Route path="/play-history/new" element={<PagePlayHistoryNew />}
                />
                <Route path="/likes" element={<PageLikes/>}/>
                <Route path="/likes/new" element={<PageLikesNew/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );

}