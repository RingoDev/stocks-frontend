if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/' })
        .then(function(reg) {
            //console.log('Service Worker Registered!', reg);
        })
        .catch(function(err) {
            console.log('Service Worker registration failed: ', err);
        });
}