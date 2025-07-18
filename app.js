//PURE.js template init
var directive = {
    ".counter": function () {
        return this.mulheres.length;
    },
    article: {
        "mulher<-mulheres": {
            "@data-twitter": "mulher.twitter",
            h3: "mulher.name",

            ".tags li": {
                "tag<-mulher.interests": {
                    ".": "tag",
                },
            },

            ".location": "mulher.location",
            "img.photo@alt": "mulher.name",
            "img.photo@src": function () {
                return this.photo || "img/logo.svg";
            },
            ".fb a@href": "https://facebook.com/#{mulher.fb}",
            ".fb@class": function () {
                return this.fb ? "" : "hidden";
            },
            ".twitter a@href": "https://twitter.com/#{mulher.twitter}",
            ".twitter @class": function () {
                return this.twitter ? "" : "hidden";
            },
            ".github a@href": "https://github.com/#{mulher.github}",
            ".github @class": function () {
                return this.github ? "" : "hidden";
            },
            ".linkedin a@href":
                "https://www.linkedin.com/in/#{mulher.linkedin}",
            ".linkedin @class": function () {
                return this.linkedin ? "" : "hidden";
            },
            ".behance a@href": "https://www.behance.net/#{mulher.behance}",
            ".behance @class": function () {
                return this.behance ? "" : "hidden";
            },
            ".site a@href": "#{mulher.site}",
            ".site @class": function () {
                return this.site ? "" : "hidden";
            },
        },
    },
};

$(function () {
    $.get("mulheres.json", { crossDomain: true }, function (data) {
        $p("main").render(data, directive);
        enableSearch();
    });
});

function enableSearch() {
    var $search = $(".search"),
        $cards = $(".card-custom"),
        filter;

    $search.keyup(function (e) {
        filter = this.value;
        filterCards($cards, filter);
    });
    $search.focus();
}

var filterCards = debounce(function ($cards, filter) {
    var $filteredOutCards = $cards
        .find(
            "h3:not(:Contains(" +
                filter +
                "))," +
                "p:not(:Contains(" +
                filter +
                "))," +
                "li:not(:Contains(" +
                filter +
                "))"
        )
        .parents(".card-custom");

    var $filteredCards = $cards
        .find(
            "h3:Contains(" +
                filter +
                ")," +
                "p:Contains(" +
                filter +
                ")," +
                "li:Contains(" +
                filter +
                ")"
        )
        .parents(".card-custom");

    $filteredOutCards.hide();
    $filteredCards.show();
}, 200);

// Cria um Contains para que ele seja case-insensitive e ignore acentuação
jQuery.expr[":"].Contains = function (element, i, arrFilter) {
    var textContent = removeAccents(element.textContent || ""),
        innerText = removeAccents(element.innerText || ""),
        filter = removeAccents(arrFilter[3] || "");

    return (textContent || innerText).indexOf(filter) >= 0;
};

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function removeAccents(text) {
    return text
        .replace(/&amp;/g, "&")
        .replace(/&aacute;/g, "a")
        .replace(/&eacute;/g, "e")
        .replace(/&iacute;/g, "i")
        .replace(/&oacute;/g, "o")
        .replace(/&uacute;/g, "u")
        .replace(/&ccedil;/g, "c")
        .replace(/&atilde;/g, "a")
        .replace(/&otilde;/g, "o")
        .replace(/ç/g, "c")
        .replace(/[áàãÁ]/g, "a")
        .replace(/[éèêÉ]/g, "e")
        .replace(/[íîÍ]/g, "i")
        .replace(/[óòôõÓ]/g, "o")
        .replace(/[úùûÚ]/g, "u")
        .toLowerCase();
}
