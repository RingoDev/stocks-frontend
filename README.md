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

```
docker run --name=vue1 -v /etc/letsencrypt/live/www.ringodev.xyz /etc/nginx/ssl/ -p 80:80 -p 443:443
```
