const FeedModel = require("../../models/Feed");
const connect = require("./connection");
const mongoose = require('mongoose');

async function find_all_feed_by_account(index, uploader_id) {
    try {
        await connect();
        return await FeedModel.aggregate([
            {
                $lookup: {
                    from: "account",
                    let: {"uploader": "$uploader_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ["$$uploader", uploader_id]},
                                        {$eq: ["$$uploader", "$_id"]}
                                    ]
                                }
                            }
                        }
                    ],
                    as: "uploader_id"
                }
            },
            {
                $unwind: '$uploader_id'
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
                $project: {
                    "uploader_id.password": 0,
                    "uploader_id.token": 0
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
                $sort: {'created_at': -1}
            },
            {
                $skip: (index-1)*10
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


module.exports = find_all_feed_by_account
