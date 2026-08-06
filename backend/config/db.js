import mongoose from 'mongoose'

const RETRY_MS = 10_000

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err){
        // keep the server alive and retry — the platform health check stays
        // green and the API recovers as soon as the database is reachable
        console.error(`MongoDB connection failed: ${err.message} — retrying in ${RETRY_MS / 1000}s`)
        setTimeout(connectDB, RETRY_MS)
    }
}

export default connectDB
