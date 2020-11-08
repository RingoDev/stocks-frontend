
```
docker run \
--name vue1 \
--link spring1 \
-d \
-p 80:80 \
-p 443:443 \
-p 444:444 \
-p 8443:8443 \
--label=com.centurylinklabs.watchtower.enable=true \
-t ringodev/vue-stocks-frontend
```
