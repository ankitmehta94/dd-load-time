aws s3 cp build/static/js/ys-survey.js s3://ys.survey/  --acl public-read
aws s3 cp build/static/css/ys-survey.css s3://ys.survey/ --acl public-read
echo "uploaded"