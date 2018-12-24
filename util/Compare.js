module.exports = function (x = [], y = []) {
    const splitRegex = /[+-, ?.;'\"\s()]+/;
    if (!Array.isArray(x)){
        x = x.toLocaleUpperCase().trim().split(splitRegex);
    }
    if (!Array.isArray(y)){
        y = y.toLocaleUpperCase().trim().split(splitRegex);
    }

    // console.log(X)
    // console.log(Y)

    if (x.length > y.length) {
        var t = x;
        x = y;
        y = t;
    }

    var N = n = x.length, m = y.length;

    var xhashmap = {}, yhashmap = {};
    for (var i = 0; i < n; i++) {
        if (!(x[i] in xhashmap)) {
            xhashmap[x[i]] = [];
        }
        xhashmap[x[i]].push(i);
    }

    for (var j = 0; j < m; j++) {
        if (y[j] in xhashmap) {
            if (!(y[j] in yhashmap)) {
                yhashmap[y[j]] = [];
            }
            yhashmap[y[j]].push(j);
        }
    }

    var Filter = require('./Filter');
    xhashmap = Filter(xhashmap, Object.keys(yhashmap));

    var Xt = [];
    Object.keys(xhashmap).forEach(function (key) {
        xhashmap[key].forEach(function (i) {
            Xt.push({ word: key, index: i });
        });
    });
    var Yt = [];
    Object.keys(yhashmap).forEach(function (key) {
        yhashmap[key].forEach(function (i) {
            Yt.push({ word: key, index: i });
        });
    });

    xhashmap = yhashmap = null;

    var cmp = function(a, b){
        return a['index'] - b['index'];
    }

    var X = [], Y = [];
    Xt.sort(cmp).forEach(function(key){
        X.push(key['word'])
    })
    Yt.sort(cmp).forEach(function(key){
        Y.push(key['word'])
    })
    Xt = Yt = null;

    n = X.length, m = Y.length;

    const Array2D = require('array-2d');
    var S = new Array2D(n + 1, m + 1, 0);
    var d = new Array2D(n + 1, m + 1, 0);
    // int S[][] = new int[n + 1][m + 1];
    // int d[][] = new int[n + 1][m + 1];


    for (var j = 0; j < m; j++) {
        //d[0][j] = j;
        d.set(0, j, j);
    }
    for (var i = 0; i < n; i++) {
        //d[i][0] = i;
        d.set(i, 0, i);
    }

    // d[0][0] = 0;
    d.set(0, 0, 0);

    var count = 0;

    for (var i = 1; i <= n; i++) {
        var flag = false;
        for (var j = 1; j <= m; j++) {
            // var delta = 1;

            if (X[i - 1].localeCompare(Y[j - 1], 'vn') == 0) {
                if (flag == false) {
                    count++;
                    flag = true;
                }

                d.set(i, j, d.get(i - 1, j - 1));
                // S[i][j] = S[i - 1][j - 1] + 1;
                S.set(i, j, S.get(i - 1, j - 1) + 1);

            } else {
                // S[i][j] = max(S[i - 1][j], S[i][j - 1]);
                S.set(i, j, Math.max(S.get(i - 1, j), S.get(i, j - 1)));

                d.set(i, j, 1 + Math.min(d.get(i, j - 1), d.get(i - 1, j), d.get(i - 1, j - 1)));

            }

            // d[i][j] = max(d[i - 1][j - 1] + delta, d[i - 1][j] + 1, d[i][j - 1] + 1);
            // d.set(i, j, Math.max(d.get(i - 1, j - 1) + delta, d.get(i - 1, j) + 1, d.get(i, j - 1) + 1));

        }
    }

    // return S[n][m], d[n][m]
    return { LCS: S.get(n, m), count: count, edit_distance: d.get(n, m), match_percent: Math.floor(count / N * 100) || 0 };
}