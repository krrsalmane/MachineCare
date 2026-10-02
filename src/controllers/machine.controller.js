import { machine } from "node:os";
import Machine from "../models/Machine.js"



export const createMachine = async (req ,res) =>{
    try{
        const machine = await Machine.create(req.body);
        res.status(201).json(machine)
    }catch (error)
    {
        res.status(400).json({ message: error.message})
    }
}