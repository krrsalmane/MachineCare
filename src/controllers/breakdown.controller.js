import Breakdown from "../models/Breakdown";



export const createBreakdown = async (req, res) => {
    try {
        const breakdown = await Breakdown.create(req.body);

        res.status(201).json(breakdown);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};