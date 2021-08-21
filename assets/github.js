var api_url = "https://api.github.com";
var repos   = [];
var commits = {};
var pending = 0;

function reposCallback(data) {
    data.data.sort(function(r0, r1) {
        return new Date(r1.updated_at) - new Date(r0.updated_at);
    });

    for (var i in data.data) {
        var r = data.data[i];
        if (!r.fork && r.description) {
            repos.push(r);
            commits[r.name] = [];
        }
    }

    pending = repos.length;

    for (var i = 0; i < pending; i++) {
        var url = api_url + '/repos/wg/' + repos[i].name + '/commits';
        $("body").append('<script src="' + url + '?sha=master&callback=commitsCallback"></script>');
    }
}

function commitsCallback(data) {
    var c    = data.data[0].commit;
    var repo = c.url.split('/')[5];

    for (var i = 0; i < data.data.length && i < 2; i++) {
        commits[repo].push(data.data[i]);
    }

    if (--pending == 0) update();
}

function update() {
    var content = '<ul>';

    for (var i in repos) {
        var r = repos[i];

        content += '<li id="' + r.name + '">' +
                   '<a href="' + r.html_url + '">' + r.name + '</a>' +
            '<a href="' + r.html_url + '">' + r.description + '</a>';

        for (var j in commits[r.name]) {
            var c = commits[r.name][j];
            var date = c.commit.author.date.substring(0, 10);
            var hash = c.sha;

            content += '<span class="commit">' +
                       '<span class="date">' + date + '</span>' +
                       '<span class="sha1">' + hash + '</span>' +
                       c.commit.message +
                '</span>';
        }

        content += '</li>';
    }

    $('#code ul').replaceWith(content + '</ul>');
}
