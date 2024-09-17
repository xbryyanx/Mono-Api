import { Request, Response } from "express"
import { MonoCase } from "../../../data/models/monoCase.model";


export class CaseController {
    public fetchAllCases = async (req: Request, res: Response) => {
        try {
            const allCases = await MonoCase.find();
            return res.json(allCases);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching cases." });
        }
    }

    public addNewCase = async (req: Request, res: Response) => {
        try {
            const { name, description, genre, age, lat, lng } = req.body;
            const newCase = new MonoCase({
                name,
                description,
                genre,
                age,
                lat,
                lng,
            });
            await newCase.save();
            res.json(newCase);
        } catch (error) {
            res.status(400).json({ message: "Error adding the case." });
        }
    }

    public fetchCaseById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const caseDetails = await MonoCase.findById(id);
            if (!caseDetails) {
                return res.status(404).json({ message: "Case not found." });
            }
            return res.json(caseDetails);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving the case." });
        }
    }

    public modifyCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, description, genre, age, lat, lng } = req.body;
            const updatedCase = await MonoCase.findByIdAndUpdate(id, {
                name,
                description,
                genre,
                age,
                lat,
                lng,
            }, { new: true });

            if (!updatedCase) {
                return res.status(404).json({ message: "Case not found." });
            }
            return res.json(updatedCase);
        } catch (error) {
            return res.status(500).json({ message: "Error updating the case." });
        }
    }

    public removeCase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedCase = await MonoCase.findByIdAndDelete(id);
            if (!deletedCase) {
                return res.status(404).json({ message: "Case not found." });
            }
            return res.json({ message: "Case successfully deleted." });
        } catch (error) {
            return res.status(500).json({ message: "Error deleting the case." });
        }
    }

    public fetchRecentCases = async (req: Request, res: Response) => {
        try {
            const today = new Date();
            const startOfLastWeek = new Date(today);
            startOfLastWeek.setDate(today.getDate() - 7);
            startOfLastWeek.setHours(0, 0, 0, 0);
            
            const endOfLastWeek = new Date(today);
            endOfLastWeek.setHours(23, 59, 59, 999);

            const recentCases = await MonoCase.find({
                creationDate: {
                    $gte: startOfLastWeek,
                    $lte: endOfLastWeek
                }
            });

            return res.json(recentCases);
        } catch (error) {
            return res.status(500).json({ message: "Error retrieving cases from the last week." });
        }
    }
}