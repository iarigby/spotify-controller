import {Client} from "spotify-api.js";
import {redirect, RedirectType} from "next/navigation";
import * as querystring from "querystring";
import {tempStorage} from "@/tempStorage";


const clientParams = {
    clientID: process.env.SPOTIFY_CLIENT_ID!,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    redirectURL: 'http://localhost:3000/spotify/cb'
}


interface Tokens {
    token: string,
    refreshToken: string
}

const scopes = [
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'app-remote-control',
    'streaming',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public',
    'user-read-playback-position',
    'user-library-modify',
    'user-library-read'
]

export const retrieveAndSaveToken = async (code: string) => {
    const client = await Client.create({
        token: {...clientParams,
            code: code
        }
    });
    tempStorage.setItem('token', {token: client.token, refreshToken: client.refreshMeta!.refreshToken!})
}


export async function getSpotifyClient() {
    const tokens = tempStorage.getItem<Tokens>('token');
    if (!tokens) {
        return authorizeSpotify();
    }
    const {token, refreshToken} = tokens;
    const client = await Client.create({
        refreshToken: true,
        token: {...clientParams,
            token: token,
            refreshToken: refreshToken
        },
        userAuthorizedToken: true,
        onRefresh() {
            tempStorage.setItem('token', {token: client.token, refreshToken: client.refreshMeta!.refreshToken!})
            console.log(`Token has been refreshed. New token: ${client.token}!`);
        }
    });
    return client;
}

const authorizeSpotify = () => {
    // const stateKey = 'spotify_auth_state';
    // const state = generateRandomString(16);

    return redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientParams.clientID,
            scope: scopes.join(' '),
            redirect_uri: clientParams.redirectURL,
            // state: state
        }), RedirectType.replace);
}
