        var ajax = {};
        var questions = [];
        var questionsResponses = [];
        
        ajax.x = function() {
            if (typeof XMLHttpRequest !== 'undefined') {
                return new XMLHttpRequest();
            }
            var versions = [
                "MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"
            ];

            var xhr;
            for (var i = 0; i < versions.length; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                } catch (e) {}
            }
            return xhr;
        };

        ajax.send = function(url, callback, method, data, async) {
            var x = ajax.x();
            x.open(method, url, async);
            x.onreadystatechange = function() {
                if (x.readyState == 4) {
                    if (x.status == 200) {
                        callback(x.responseText)
                    } else {
                        //TODO
                    }
                }
            };
            if (method == 'POST') {
                x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
            x.send(data)
        };

        ajax.get = function(url, data, callback, async) {
            var query = [];
            for (var key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            ajax.send(url + '?' + query.join('&'), callback, 'GET', null, async)
        };

        ajax.post = function(url, data, callback, async) {
            var query = [];
            for (var key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            ajax.send(url, callback, 'POST', query.join('&'), async)
        };