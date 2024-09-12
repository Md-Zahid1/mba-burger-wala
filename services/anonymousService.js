import { AnonymousModal } from "../models/AnonymousModal.js";
import requestIp from 'request-ip';


export const vendersViewsUpdate = async (req, venderId) => {
    try {
        console.log("venderId", venderId)

        if (venderId) {
            const clientIp = requestIp.getClientIp(req);
            const viewVender = await AnonymousModal.findOne({ ipAddress: clientIp, viewVender: { "$in": venderId } });
            console.log("viewVender", viewVender)

            if (!viewVender) {
                const details = await AnonymousModal.findOneAndUpdate({ ipAddress: clientIp },
                    {
                        ipAddress: clientIp,
                        $push: {
                            viewVender: {
                                $each: [venderId],
                                $position: 0
                            }
                        }
                    }, { new: true, upsert: true }
                )
            }
        }
    } catch (err) {
        console.log("err", err)
        return null
    }
}
