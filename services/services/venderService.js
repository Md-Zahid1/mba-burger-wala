import { PublishVenderModel } from "../models/PublishVenderModal.js";
import { VenderModel } from "../models/VenderModel.js";
import parseObject from "../utils/queryType.js";

export const filterVenders = async (queryData) => {
    try {
        let { rating, ...query } = parseObject(queryData.filter)
        console.log("rate", rating)
        console.log("rest", query)
        const filter = [];
        if (query) {
            filter.push(query)
        }
        if (queryData.search) {
            filter.push({
                $or: [
                    { businessName: { '$regex': queryData.search, '$options': 'i' } },
                    { contactPerson: { '$regex': queryData.search, '$options': 'i' } },
                ]
            })
        }
        // filter.push({ minPrice: { '$lt': { $toInt: "11233" } } })
        console.log("filter", filter)
        const venders = await VenderModel.aggregate(
            [
                {
                    $match: filter?.length ? { $and: filter } : {}
                },

                {
                    $lookup: {
                        from: "categories",
                        as: "categories",
                        "let": { "categories": "$catogories" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": {
                                        "$eq":
                                            ["$_id", "$$categories"]
                                    }
                                }
                            },

                        ]
                    }
                },

                {
                    $lookup: {
                        from: "rattings",
                        as: "rating",
                        "let": { "venderId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": {
                                        "$eq":
                                            ["$venderId", "$$venderId"]
                                    }
                                }
                            },
                            {
                                $group: { _id: null, rate: { $avg: "$rate" } }
                            },
                        ]
                    }
                },
                {
                    $unwind:
                    {
                        path: "$rating",
                        preserveNullAndEmptyArrays: true
                    }
                },
                ...(rating ? [{
                    $match: { "rating.rate": rating }
                }] : [])
            ]
        ).paginateExec(queryData)
        if (!venders) {
            return null
        }

        return venders

    } catch (err) {
        console.log("err", err)
        return null
    }
}

export const updaeVendersViews = async (req, slug) => {
    try {
        if (slug) {

            console.log(req.sessionID, "req.sessionID");
            console.log(

                (req.session[req.sessionID] && req.session[req.sessionID].visitedVender && req.session[req.sessionID].visitedVender[slug]),
                "------------viiiiiiii----------------")

            if (!(req.session.visitedVender && req.session.visitedVender[slug])) {
                await PublishVenderModel.findOneAndUpdate({ slug }, { $inc: { views: 1 } });
                if (req.session.visitedVender) {
                    console.log("-----dddd----if-----------", req.session[req.sessionID]);
                    req.session.visitedVender[slug] = 1
                } else {
                    console.log("-----dddd-----else-----------", req.session[req.sessionID]);
                    //  req.session.visitedVender= { [slug]: 1 };	
                    console.log("-----dddd-----else aftrt-----------", req.session);
                }
                // req.session.save();
            } else {
                console.log("se----------------------------------", req.session);
            }
        }
    } catch (err) {
        console.log("err", err)
        return null
    }
}
