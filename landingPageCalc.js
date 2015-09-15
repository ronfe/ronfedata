/* robomongo脚本
*  在robo执行后会得到两段结果，粘贴结果到某一文件
*  执行 python transUrlSendMmai.py
* */

//todo 由于数据量过大，需要dump指定日期范围内的表到本地跑
//todo dump条件 {"url": {"$regex": /vs\.yangcong/}} 最好指定日期范围
//todo 有新数据后打开一下注释部分
//todo 这样的数据结构主要是为了照顾不同的日期

var input = [
    {
        startDate : ISODate("2015-09-07T00:00:00.367Z"),
        endDate : ISODate("2015-09-08T00:00:00.367Z"),
        qudao: ["twyxyandroid","twyxyios","bjxxt"],
        from: "mobile"
    },
    {
        startDate : ISODate("2015-09-08T00:00:00.367Z"),
        endDate : ISODate("2015-09-09T00:00:00.367Z"),
        qudao: ["twyxyandroid","twyxyios","bjxxt"],
        from: "mobile"
    },
    {
        startDate : ISODate("2015-09-09T00:00:00.367Z"),
        endDate : ISODate("2015-09-10T00:00:00.367Z"),
        qudao: ["twyxyandroid","twyxyios","bjxxt"],
        from: "mobile"
    },
    {
        startDate: ISODate("2015-09-10T00:00:00.367Z"),
        endDate: ISODate("2015-09-11T00:00:00.367Z"),
        qudao: ["twyxyandroid", "twyxyios", "bjxxt"],
        from: "mobile"
    },
    {
        startDate: ISODate("2015-09-11T00:00:00.367Z"),
        endDate: ISODate("2015-09-12T00:00:00.367Z"),
        qudao: ["twyxyandroid", "twyxyios", "bjxxt"],
        from: "mobile"
    },
    {
        startDate: ISODate("2015-09-12T00:00:00.367Z"),
        endDate: ISODate("2015-09-13T00:00:00.367Z"),
        qudao: ["twyxyandroid", "twyxyios", "bjxxt"],
        from: "mobile"
    },
    {
        startDate: ISODate("2015-09-13T00:00:00.367Z"),
        endDate: ISODate("2015-09-14T00:00:00.367Z"),
        qudao: ["twyxyandroid", "twyxyios", "bjxxt"],
        from: "mobile"
    },
    {
        startDate: ISODate("2015-09-07T00:00:00.367Z"),
        endDate: ISODate("2015-09-14T00:00:00.367Z"),
        qudao: ["twyxyandroid", "twyxyios", "bjxxt"],
        from: "mobile"
    }
];

(function (input) {
    input.forEach(function(item) {
        var startDate = item.startDate;
        var endDate = item.endDate;
        var from_end = item.from;
        var q = item.qudao;

        var eventKeyList = [
            { "eventKey": "clickLandingChapter", "header.currentName": {"$regex": /^\/[^(chapter)]/}},  // header.currentpage
            { "eventKey": "clickLandingChapter", "header.currentName": "/chapter-list.html"},  // header.currentpage
            { "eventKey": "clickLandingPageSignUp"},
            { "eventKey": "clickNestedVideo"},
            { "eventKey": "enterTopicsLandingPage"},
            { "eventKey": "endLandingShareVideo"},
            { "eventKey": "pauseLandingShareVideo"},
            { "eventKey": "clickLandingShareWeibo"},
            { "eventKey": "clickLandingShareQZone"},
            { "eventKey": "clickLandingShareQQ"},
            { "eventKey": "clickLandingShareVideoZone"},
            { "eventKey": "clickTopicsToggle"},
            { "eventKey": "playLandingShareVideo"}, // header.from=pc //header.currentPage
            { "eventKey": "clickMobileDownloadBtn"},
            { "eventKey": "enterLandingPage"},
            { "eventKey": "clickLandingPageSignUp"}
        ];

        q.forEach(function (qudao) {
            print("=====================================")
            print("q : " + qudao);
            print("date start  " + item.startDate);
            print("date end    " + item.endDate);
            print("=====================================")
            eventKeyList.forEach(function (eventItem) {
                var output = [];
                output.push(eventItem.eventKey)
                eventItem.createdBy = {"$gte": startDate, "$lte": endDate};
                eventItem.from = from_end;
                pv = db.points.aggregate([
                    {"$match": {"header.q": qudao} },
                    {"$match": eventItem }
                ]);
                output.push(pv.result.length);

                uv = db.points.aggregate([
                    {"$match": {"header.q": qudao} },
                    {"$match": eventItem },
                    {"$group": {
                        "_id": '$user'
                    }}
                ]);
                output.push(uv.result.length);

                print(output[0] + "        PV/UV: " + output[1] + "/" + output[2])
            });

        });
    });
})(input);


/* Part.2 PC */
/* 由于需求是各个页面的数据，挑选出各个页面的共同元素开始匹配 */

var pcEventList = [
    {"eventKey": "enterLandingPage"},//页面访问
    {"eventKey": "playLandingShareVideo"},//视频被播放
    {"eventKey": "clickLandingPageSignUp"},//注册被点击
    {"eventKey": "clickLandingShareSideBtn"},//更多免费被点击
    {"eventKey": "clickLandingShareQQ"},
    {"eventKey": "clickLandingShareQZone"},
    {"eventKey": "clickLandingShareWeibo"}
];

var inputPc = [
    {
        startDate: ISODate("2015-09-07T00:00:00.367Z"),
        endDate: ISODate("2015-09-08T00:00:00.367Z"),
        qudao: ["lzx", "bjxxt", "fywk", "cyxt", "twsm", "twsmcce", "sem1", "sem2", "seo1"],
        from: "pc"
    },
    {
        startDate: ISODate("2015-09-08T00:00:00.367Z"),
        endDate: ISODate("2015-09-09T00:00:00.367Z"),
        qudao: ["lzx", "bjxxt", "fywk", "cyxt", "twsm", "twsmcce", "sem1", "sem2", "seo1"],
        from: "pc"
    },
    {
        startDate: ISODate("2015-09-09T00:00:00.367Z"),
        endDate: ISODate("2015-09-10T00:00:00.367Z"),
        qudao: ["lzx", "bjxxt", "fywk", "cyxt", "twsm", "twsmcce", "sem1", "sem2", "seo1"],
        from: "pc"
    },
    {
        startDate: ISODate("2015-09-11T00:00:00.367Z"),
        endDate: ISODate("2015-09-12T00:00:00.367Z"),
        qudao: ["lzx", "bjxxt", "fywk", "cyxt", "twsm", "twsmcce", "sem1", "sem2", "seo1"],
        from: "pc"
    },
    {
        startDate: ISODate("2015-09-12T00:00:00.367Z"),
        endDate: ISODate("2015-09-13T00:00:00.367Z"),
        qudao: ["lzx", "bjxxt", "fywk", "cyxt", "twsm", "twsmcce", "sem1", "sem2", "seo1"],
        from: "pc"
    },
    {
        startDate: ISODate("2015-09-13T00:00:00.367Z"),
        endDate: ISODate("2015-09-14T00:00:00.367Z"),
        qudao: ["lzx", "bjxxt", "fywk", "cyxt", "twsm", "twsmcce", "sem1", "sem2", "seo1"],
        from: "pc"
    },
    {
        startDate: ISODate("2015-09-07T00:00:00.367Z"),
        endDate: ISODate("2015-09-14T00:00:00.367Z"),
        qudao: ["lzx", "bjxxt", "fywk", "cyxt", "twsm", "twsmcce", "sem1", "sem2", "seo1"],
        from: "pc"
    }
];


(function (nDateqFrom) {

    nDateqFrom.forEach(function (dateqFrom) {
        print("=================================================")
        print("Date start: " + dateqFrom.startDate);
        print("Date end: " + dateqFrom.endDate);
        print("=================================================")
        var startDate = dateqFrom.startDate;
        var endDate = dateqFrom.endDate;
        var q = dateqFrom.qudao;

        q.forEach(function (qudao) {
            print("=================================================")
            print("  q : " + qudao);
            print("=================================================")
            pcEventList.forEach(function (event) {

                try {

                    var eventKey = event.eventKey;
                    print(' \n -------------------  event : ' + eventKey + "  -----------------\n \n");

                    var stuff = db.points.aggregate([
                        {"$match": {
                            // need date
                            createdBy : {"$gte": startDate, "$lte": endDate},
                            "header.q": qudao
                        }},
                        {"$match": {
                            "header.currentName": {"$regex": /^\/[^(chapter)]/},
                            "eventKey": eventKey
                        }},
                        {"$project": {
                            "videoName": "$header.currentName",
                            "event": "$eventKey"
                        }},
                        //add into id then group count pv
                        {"$group": {
                            "_id": {"event": "$event", "video": "$videoName"},
                            "count": {"$sum": 1}
                        }},
                        {"$project": {
                            "evBind": {
                                "video": "$_id.video",
                                "count": "$count"
                            }
                        }},
                        {"$group": {
                            "_id": "$_id.event",
                            "total": {"$push": "$evBind"}
                        }}
                    ]);

                    stuff.result[0].total.forEach( function(unitEvBind){
                        print(unitEvBind.video + ' : ' + unitEvBind.count + ' (PV)');
                    });

                    print('done');
                }
                catch (err) {
                    print(' \n -------------------  event : ' + eventKey + " NO DATA  ---------\n \n");
                }
            });
        });
    });
})(inputPc);
