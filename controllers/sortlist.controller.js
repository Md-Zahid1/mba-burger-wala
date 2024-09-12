


export const sortlist = async (req, res, next) => {
    try {
        

    } catch (err) {
        return res.status(500).json({
            error: {
                message: err.message,
                error: err
            }
        });
    }
}