export const createStaticksFiles = async (req, res, next) => {
    try {
        const {
            image,
        } = req.body;

        const createStaticksFiles = {
            image
        }

        const data = await StaticksFilesModel.create(createStaticksFiles)
        return res.status(201).json({
            message: "StaticFiles Created Successfully",
            result: data
        })
    } catch (err) {
        return res.status(500).json({
            error: {
                message: err.message,
                error: err
            }
        })
    }
}