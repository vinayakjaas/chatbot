import express from 'express'
import {config} from 'dotenv'
import mongoose from 'mongoose'
config()
const app=express();

//middleware
app.use(express.json())


export default app;