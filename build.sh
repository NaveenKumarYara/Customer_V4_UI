hash=`git rev-parse HEAD`
docker build . -t customer-ui:$hash
docker tag customer-ui:$hash arytic.azurecr.io/customer-ui:$hash
echo $D_PASSWORD | docker login arytic.azurecr.io -u $D_USERNAME --password-stdin
docker push arytic.azurecr.io/customer-ui:$hash