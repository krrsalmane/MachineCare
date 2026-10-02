import express from "express";


import {
   
    createMachine,
    getMachines,
    getMachine,
    updateMachine,
    deleteMachine


}from "../controllers/machine.controller.js"


const router = express.Router();

router.post("/" ,createMachine);
router.get("/", getMachines);
router.get("/:id" , getMachine);
router.put("/:id" ,updateMachine)
router.delete("/:id" ,deleteMachine)

export default router;