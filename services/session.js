


export const saveSession = (req) => {
    return new Promise((resolve, reject) => {
        req.session.save(err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        });
    })

}



export const destroySession = (req) => {
    return new Promise((resolve, reject) => {
        req.session.save(err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        });
    })

}