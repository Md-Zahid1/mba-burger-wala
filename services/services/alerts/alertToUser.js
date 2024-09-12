import { alertUserNotification } from "./alertUserNotification.js"

export const alertToUser = (type, user) => {

    const alert = alertUserNotification[type]
    if (alert.includes("{{businessName}}")) {
        alert = alert.replace("{{businessName}}", vender.businessName)
    }

    return alert

}

export const alertToVender = (type, vender) => {

    const alert = alertUserNotification[type]
    if (alert.includes("{{businessName}}")) {
        alert = alert.replace("{{businessName}}", vender.businessName)
    }

    return ` <div style="font-family: Arial, sans-serif;border: 2px solid;width: 100%;padding: 4px;">${alert}</div>`

}