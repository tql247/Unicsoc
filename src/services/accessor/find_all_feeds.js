const FeedModel = require("../../models/Feed");
const connect = require("./connection");
const mongoose = require('mongoose');

async function find_all_feed(index) {
    try {
        await connect();

        return await FeedModel.aggregate([
            {
                $lookup: {
                    from: "account",
                    localField: "uploader_id",    // field in the orders collection
                    foreignField: "_id",
                    as: "uploader_id"
                }
            },
            {
                $unwind: '$uploader_id'
            },
            {
                $project: {
                    "uploader_id.password": 0,
                    "uploader_id.token": 0
                }
            },
            {
                $lookup: {
                    from: "comment",
                    let: {"feed_id": "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ["$$feed_id", "$feed"]},
                                    ]
                                },
                                deleted_at: {
                                    $exists: false
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "account",
                                let: {"commenter_id": "$commenter"},
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$_id", "$$commenter_id"]
                                            }
                                        }
                                    }
                                ],
                                as: "commenter"
                            }
                        },
                        {
                            $unwind: '$commenter'
                        }
                    ],
                    as: "comments",
                }
            },
            {
                $match: {
                    deleted_at: {
                        $exists: false
                    }
                }
            },
            {
                $project: {
                    "uploader_id.password": 0,
                    "uploader_id.token": 0
                }
            },
            {
                $sort: {'created_at': -1}
            },
            {
                $skip: (index - 1) * 10
            },
            {
                $limit: 10
            }
        ])
    } catch (e) {
        throw e
    } finally {
        await mongoose.connection.close()
    }
}


module.exports = find_all_feed
