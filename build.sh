hash=`git rev-parse HEAD`
echo $hash
echo $BUILD_ID
docker build . -t customer-ui:$hash
docker tag customer-ui:$hash arytic.azurecr.io/customer-ui:$hash
docker tag arytic.azurecr.io/customer-ui:$hash arytic.azurecr.io/customer-ui:$BUILD_ID
echo $D_PASSWORD | docker login arytic.azurecr.io -u $D_USERNAME --password-stdin
docker push arytic.azurecr.io/customer-ui:$BUILD_ID