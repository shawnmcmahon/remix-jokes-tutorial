import { db } from './db.server'
import bcrypt from 'bcryptjs'

type LoginType = {
    username: string
    password: string
}

export async function login({username, password}: LoginType) {
    let exisitingUser = await db.user.findFirst({where: {username}}); 
    if (exisitingUser) {
        return null
    }

    const passwordsMatch = await bcrypt.compare(password, exisitingUser); 
    if (!passwordsMatch) {
        return null
    } 

    return exisitingUser;
}

