import { StaticDataModal } from "../models/StaticDataModal.js";


export const createStaticData = async (req, res, next) => {
    try {
        const {
            name,
            staticData
        } = req.body;

        const createStaticData = {
            name,
            staticData
        }
        const data = await StaticDataModal.create(createStaticData)
        return res.status(201).json({
            success: true,
            message: "createStaticData created successfully",
            result: { data: data }
        })
    } catch (err) {
        return res.status(500).json({ error: { message: err.message } })
    }
}



export const getStaticData = async (req, res, next) => {
    try {
        const staticData = await StaticDataModal.find()
        if (!staticData) {
            return res.status(401).json({ message: "staticData not exist!" });
        }
        return res.json(staticData);

    } catch (err) {
        res.status(500).json({ error: { message: err.message } })
    }
}


export const updateStaticData = async (req, res, next) => {

    try {
        const {
            name,
            sluge,
            staticData,
        } = req.body;

        const updateStaticData = {
            name,
            sluge,
            staticData
        };
        console.log('updateStaticData', updateStaticData)

        await StaticDataModal.findByIdAndUpdate(req.body._id, updateStaticData)
        console.log('updateStaticData', updateStaticData)

        return res.status(201).json({
            success: true,
            messege: "updateStaticData updated Seccessfuly"
        })
    } catch (err) {
        return res.status(401).json({ error: { message: err.message } })
    }
}


export const deleteStaticData = async (req, res, next) => {
    try {
        const staticData = await StaticDataModal.findOneAndDelete(req.body._id);
        if (!staticData) {
            return res.status(500).json({ message: "Nothing to delete" });
        }
        res.json(staticData)
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
}

