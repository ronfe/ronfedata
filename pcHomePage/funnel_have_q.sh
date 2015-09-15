echo `date`

qList="sem1 sem2 seo1 lzx bjxxt fywk cyxt twsm twsmcce"


for q in $qList
do
    echo "start $q"
    mongo localhost:27017/yangcong-prod25 --eval "var q = '$q'" funnel_have_q.js > tmp/$q.log
    echo "finish $q"
    echo `date`
done

echo "end ---"
echo `date`