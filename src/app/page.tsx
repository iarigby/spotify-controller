'use server'

import {Button} from "@/components/ui/button";
import {getSpotifyClient} from "@/spotifyClient";


export default async function Home() {
  const client = await getSpotifyClient();
  const playlists = await client.user.getPlaylists();
  return <main>
    <div className="mx-auto flex justify-center">
      <div>
        { playlists ? JSON.stringify(playlists[0]) : 'no playlists yet'}
      </div>
      <Button>Click me</Button>
    </div>

  </main>
}
