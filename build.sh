hash=`git rev-parse HEAD`
echo $hash
echo $BUILD_ID
docker build . -t customerv4-ui:$hash
docker tag customerv4-ui:$hash arytic.azurecr.io/customerv4-ui:$hash
docker tag arytic.azurecr.io/customerv4-ui:$hash arytic.azurecr.io/customerv4-ui:$BUILD_ID
echo $D_PASSWORD | docker login arytic.azurecr.io -u $D_USERNAME --password-stdin
docker push arytic.azurecr.io/customerv4-ui:$BUILD_ID
