# Stocks-WebApp

## Frontend

* Give a more specific top and bottom chart margin dependent on stock area not hardcoded -5 and 5
* Remove unneeded navbar items
* Add Chart Option for half a year and a year
* make tooltips more specific (Date)

### Deploy

#### setup Linode Server Instance

* enable nginx to use https

run nginx with 

ro = read-only



```
docker run \
--name vue1 \
--link spring1 \
--link push1 \
-d \
-v /etc/letsencrypt/live/www.ringodev.xyz:/etc/nginx/ssl/live/www.ringodev.xyz:ro \
-v /etc/letsencrypt/archive/www.ringodev.xyz:/etc/nginx/ssl/archive/www.ringodev.xyz:ro \
-p 80:80 \
-p 443:443 \
-p 444:444 \
-p 8443:8443 \
--label=com.centurylinklabs.watchtower.enable=true \
-t ringodev/vue-stocks-frontend
```
