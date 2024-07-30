import {NextRequest, NextResponse} from "next/server";
import {retrieveAndSaveToken} from "@/spotifyClient";
import {redirect} from "next/navigation";


export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code');
    if (code) {
        await retrieveAndSaveToken(code);
        redirect('/');
    }
    return new NextResponse(JSON.stringify({error: 'something wrong with spotify api'}));
}