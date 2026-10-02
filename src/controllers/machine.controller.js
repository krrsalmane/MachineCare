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


export const getMachines = async (req , res) =>{
    try {
        const filter = {};

        if(req.query.workshop){
            filter.workshop = req.query.workshop;
        }

        if(req.query.status){
            filter.status = req.query.status
        }

        const machines = await Machine.find(filter);
        res.json(machines)
    }catch (error) {
        res.status(500).json({ message:  error.message})
    }
}


export const getMachine = async (req, res) => {
    try{
        const machine = await Machine.findById(req.params.id)

        if(!machine){
            return res.status(404).json({ message: "Machine not found"})
        }
        res.json(machine)
    }catch(error) {
        res.status(400).json({ message: "Invalid machine ID"})
    }
}


export const updateMachine = async (req , res) => {

    try{
        const machine =  await Machine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        )
        if(!machine){
            return res.status(404).json({ message: "Machine not found"})
        }res.json(machine)
        }
        catch(error){
            res.status(400).json({ message: error.message})
        }
}



export const deleteMachine =  async (req, res) =>{
    try{
        const machine = await Machine.findByIdAndDelete(req.params.id)

        if(!machine){
            return res.status(404).json({ message: "Machine not found"})
        }
        res.json({message: "Machine deleted successfully"})
    }
    catch (error)
    {
        res.status(400).json({ message:  error.message})
    }
}