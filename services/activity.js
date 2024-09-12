import { ActivityModal } from "../models/ActivityModal.js";

export const addActivity = async (actionOn, action, id) => {

    const message = activityActions[actionOn].action[action].message;

    const idName = activityActions[actionOn].id


    const data = await ActivityModal.create({
        message,
        action,
        actionOn,
        [idName]: id
    })

}


const activityActions = {
    user: {
        id: "userId",
        action: {
            register: {
                message: "User Registered"
            },
            otpVerify: {
                message: "Otp Verified"
            },
            update: {
                message: "User Updated"
            },
            delete: {
                message: "User Deleted"
            },
            publish: {
                message: "User Published"
            }
        }
    },

    category: {
        id: "categoryId",
        action: {
            create: {
                message: "Category Created"
            },
            update: {
                message: "Category Updated"
            },
            delete: {
                message: "Category Deleted"
            },
            publish: {
                message: "Category Published"
            }
        }
    },


    destination: {
        id: "destinationId",
        action: {
            create: {
                message: "Destination Created"
            },
            update: {
                message: "Destination Updated"
            },
            delete: {
                message: "Destination Deleted"
            },
            publish: {
                message: "Destination Published"
            }
        }
    },

    enquiry: {
        id: "enquiryId",
        action: {
            create: {
                message: "Enquiry Created"
            },
            update: {
                message: "Enquiry Updated"
            },
            delete: {
                message: "Enquiry Deleted"
            },
            publish: {
                message: "Enquiry Published"
            }
        }
    },

    metroCity: {
        id: "metroCityId",
        action: {
            create: {
                message: "MetroCity Created"
            },
            update: {
                message: "MetroCity Updated"
            },
            delete: {
                message: "MetroCity Deleted"
            },
            publish: {
                message: "MetroCity Published"
            }
        }
    },


    portfolio: {
        id: "portfolioId",
        action: {
            create: {
                message: "Portfolio Created"
            },
            update: {
                message: "Portfolio Updated"
            },
            delete: {
                message: "Portfolio Deleted"
            },
            publish: {
                message: "Portfolio Published"
            }
        }
    },


    rating: {
        id: "rattingId",
        action: {
            create: {
                message: "Rating Created"
            },
            update: {
                message: "Rating Updated"
            },
            delete: {
                message: "Rating Deleted"
            },
            publish: {
                message: "Rating Published"
            }
        }
    },


    staticPage: {
        id: "staticPageId",
        action: {
            create: {
                message: "StaticPage Created"
            },
            update: {
                message: "StaticPage Updated"
            },
            delete: {
                message: "StaticPage Deleted"
            },
            publish: {
                message: "StaticPage Published"
            }
        }
    },


    support: {
        id: "supportId",
        action: {
            create: {
                message: "Support Created"
            },
            update: {
                message: "Support Updated"
            },
            delete: {
                message: "Support Deleted"
            },
            publish: {
                message: "Support Published"
            }
        }
    },


    vender: {
        id: "venderId",
        action: {
            otpVerify: {
                message: "Otp Verified"
            },
            create: {
                message: "Vendor Created"
            },
            update: {
                message: "Vendor Updated"
            },
            delete: {
                message: "Vendor Deleted"
            },
            publish: {
                message: "Vendor Published"
            }
        }
    },


}