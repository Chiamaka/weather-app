# Weather App
Weather App coded in HTML, SCSS and Vanilla JS. Build tool used is Gulp
[Live Code](https://chimmy-weatherapp.surge.sh)

---
## What I learned from this project
1. Geolocation doesn't work over insecure connections. It only works over `HTTPS` and I would have learnt this if I didnt immediately push to production.
2. The first API i used is [OpenWeatherMap API](http://openweathermap.org/). Its great but the only issue is that it doesn't offer the https for free, it only offers the http API for free. So after I changed my url to `https`, another error was thrown saying `mixed content: You can't access an insecure resource over a secure connection` so I had to change this API to [Wunderground Weather API](https://wunderground.com). It's free. It worked beautifully over `https`.

I really enjoyed working on this project.
