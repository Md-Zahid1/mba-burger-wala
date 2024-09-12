export const aleartNote = (type, vender) => {

    const noteAleart = aleartNoteMassage[type];
    if (noteAleart?.includes("{{businessName}}")) {
        noteAleart = noteAleart.replace("{{businessName}}", vender.businessName)
    }

    return noteAleart ?? "";

}


const aleartNoteMassage = {
    Register: "Thank You For Submitting Your Detail Will Update You Soon",
    Review: "We Are Review Your Detail And Inform You Soon",
    Updation: "You Are Requested To Modify Detail For More Information Check Your Email",
}
