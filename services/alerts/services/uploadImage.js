import multer from 'multer';
import path from "path"
import fs from "fs"


export const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        let { dir } = request.query;
        let dirName = 'uploads/'

        if (dir) {
            dirName += dir.indexOf("/") > -1 ? dir : `${dir}/`;
        }

        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName.replace(/\s+/g, '_'), { recursive: true });
        }
        callback(null, dirName.replace(/\s+/g, '_'))
    },

    filename: (req, file, callback) => {

        console.log("file", file)
        const uniqueName = `${path.parse(file.originalname).name}_${Date.now()}${path.extname(file.originalname)}`;
        console.log("uniqueName", uniqueName)
        // 3746674586-836534453.png
        callback(null, uniqueName.replace(/\s+/g, '_'));
    }
})

export const fileFilter = (request, file, callback) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/svg' ||
        file.mimetype === 'image/webp'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}


const handleMultipartData = multer({
    storage: fileStorage,
    limits: { fileSize: 1000000 * 5 },
    fileFilter
}).single('image'); // 5mb


export const uploadImages = async (req, res) => {

    const uploadPromise = (req, res) => new Promise((resolve, reject) => {
        console.log("promsimage")
        handleMultipartData(req, res, async (err) => {
            if (err) {
                reject(err);
            }
            console.log("files", req.files)
            console.log('file', req.file)
            resolve(req.file)
        })
    })
    const result = await uploadPromise(req, res);
    console.log("imgresult", result)
    return result
}