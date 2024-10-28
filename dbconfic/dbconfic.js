import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URL

if (!MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        console.log(`RETURED FROM CACHE CONNECTION`)
        return cached.conn
    }

    if (!cached.promise) {
        console.log(`CACHE DOESN'T EXIST`)

        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose

        })
    }

    try {
        cached.conn = await cached.promise
        console.log(`CACHE DOESN'T EXIST`)

    } catch (e) {
        cached.promise = null
        console.error(`CONNECTION ERROR ${e}`)

        throw e
    }

    return cached.conn
}

export default dbConnect