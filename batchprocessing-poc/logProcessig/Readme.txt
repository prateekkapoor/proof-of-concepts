--gcloud commands
gcloud auth list
gcloud init
gcloud config set account 'first-firestore'
gcloud config set project  'first-firestore'
gcloud auth login

--command to get get read logs
gcloud logging read 'resource.type="cloud_function"
resource.labels.function_name="batchService-settlement"
severity =INFO
textPayload:transaction
timestamp >= "2019-07-25T00:00:00Z"
timestamp <= "2019-07-25T23:59:00Z"' >setlle.log

-- command to get stats
grep -nr textPayload: setlle.log | awk -F ":" '{print $3}'|awk -F" " '{h[$1]++}; END { for(k in h) print k, h[k] }'