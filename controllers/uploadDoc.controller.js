import { uploadImages } from "../services/uploadImage.js"
export const imageUploadCont = async (req, res, next) => {

    const image = await uploadImages(req, res)
    if (!image) {
        return res.status(404).json({ message: "Image Not Found" })
    }
    res.status(200).json({ result: { url: `${process.env.BACKEND_URL}/${image.path}` } })
}