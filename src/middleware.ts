import {NextRequest, NextResponse} from "next/server";
import {stackServerApp} from "@/stack";

export function middleware(request: NextRequest) {

    const user = stackServerApp.getUser();
    if (!user) {
        return NextResponse.redirect(new URL('/handler/sign-in', request.url));
    }
    return NextResponse.next();

}