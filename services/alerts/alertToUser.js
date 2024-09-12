import { alertUserNotification } from "./alertUserNotification.js"

export const alertToUser = (type, user) => {
    try {
        const alert = alertUserNotification[type]
        if (alert.includes("{{businessName}}")) {
            alert = alert.replace("{{businessName}}", vender.businessName)
        }

        return alert;
    } catch (err) {
        console.log("error", err)
        return null
    }

}

export const alertToVender = (type, vender) => {
    try {
        const alert = alertUserNotification[type]
        if (alert.includes("{{businessName}}")) {
            alert = alert.replace("{{businessName}}", vender.businessName)
        }

        return alert;
    } catch (err) {
        console.log("error", err)
    }

}