var input = [
    {
        startDate : ISODate("2015-09-07T00:00:00.367Z"),
        endDate : ISODate("2015-09-08T00:00:00.367Z"),
        qudao: ["twyxyandroid","twyxyios","bjxxt"],
    },
    {
        startDate : ISODate("2015-09-08T00:00:00.367Z"),
        endDate : ISODate("2015-09-09T00:00:00.367Z"),
        qudao: ["twyxyandroid","twyxyios","bjxxt"],
    },
    {
        startDate : ISODate("2015-09-09T00:00:00.367Z"),
        endDate : ISODate("2015-09-10T00:00:00.367Z"),
        qudao: ["twyxyandroid","twyxyios","bjxxt"],
    },
    {
        startDate: ISODate("2015-09-10T00:00:00.367Z"),
        endDate: ISODate("2015-09-11T00:00:00.367Z"),
        qudao: ["twyxyandroid", "twyxyios", "bjxxt"],
    },
    {
        startDate: ISODate("2015-09-11T00:00:00.367Z"),
        endDate: ISODate("2015-09-12T00:00:00.367Z"),
        qudao: ["twyxyandroid", "twyxyios", "bjxxt"],
    },
    {
        startDate: ISODate("2015-09-12T00:00:00.367Z"),
        endDate: ISODate("2015-09-13T00:00:00.367Z"),
        qudao: ["twyxyandroid", "twyxyios", "bjxxt"],
    },
    {
        startDate: ISODate("2015-09-13T00:00:00.367Z"),
        endDate: ISODate("2015-09-14T00:00:00.367Z"),
        qudao: ["twyxyandroid", "twyxyios", "bjxxt"],
    },
    {
        startDate: ISODate("2015-09-07T00:00:00.367Z"),
        endDate: ISODate("2015-09-14T00:00:00.367Z"),
        qudao: ["twyxyandroid", "twyxyios", "bjxxt"],
    }
];


(function (input) {
    input.forEach(function(item) {
        var startDate = item.startDate;
        var endDate = item.endDate;
        var q = item.qudao;

        var eventKeyList = [
            //todo m.yangcong345.com 登入的event
            // webtracks表 matrix-yangcong-prod
            { "eventName": "enterMobileSite"},

            //todo 下载按钮的event 重写
            // mobileapk   matrix-yangcong-prod
            // { "eventKey": "clickLandingPageSignUp"}
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
                eventItem.localetime = {"$gte": startDate, "$lte": endDate};
                pv = db.mobile_web_tracks.aggregate([
                    {"$match": {"eventValue.q": qudao} },
                    {"$match": eventItem }
                ]);
                output.push(pv.result.length);

                print(output[0] + "        PV: " + output[1]);
            });
        });
    });
})(input);
