document.addEventListener("DOMContentLoaded", function (event) {
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.2.1.min.js";
    script.onload = script.onreadystatechange = function () {
        $(function () {
            $.iframe = $('iframe[src*="widget.mcf.li"]');
            $.target = null;
            $.iframe.on('load', function () {
                $.target = $("#download-button", $.iframe.contents());
                $.target.css({ "border": "solid" });
                $.iframe.scroll(scrl);
            });
            function posAdd(pos1, pos2) {
                return { left: pos1.left + pos2.left, top: pos1.top + pos2.top };
            }
            function posSub(pos1, pos2) {
                return { left: pos1.left - pos2.left, top: pos1.top - pos2.top };
            }
            function posNeg(pos) {
                return { left: -pos.left, top: -pos.top };
            }
            function addArrow(arrow, iframe) {
                $('body').append(arrow);
                $(window).scroll(function () {
                    let p_a = arrow.offset();
                    let p_b = iframe.offset();
                    if ($.target) {
                        let p_c = $.target.offset();
                        let p_c_top = Math.min(Math.max(p_c.top, 0), $.iframe.height());
                        let p_c_left = Math.min(Math.max(p_c.left, 0), $.iframe.width());
                        p_b = posAdd(p_b, p_c);
                    }
                    let p_d = posSub(p_b, p_a)
                    $.p_rad = Math.atan2(p_d.top, p_d.left);
                    arrow.css({ transform: 'rotate(' + $.p_rad + 'rad)' });
                });
            }
            addArrow($("<div style='position:fixed;width:1em;height:1em;top:0;left:0'>→</div>"), $.iframe);
            addArrow($("<div style='position:fixed;width:1em;height:1em;top:0;right:0'>→</div>"), $.iframe);
            addArrow($("<div style='position:fixed;width:1em;height:1em;bottom:0;left:0'>→</div>"), $.iframe);
            addArrow($("<div style='position:fixed;width:1em;height:1em;bottom:0;right:0'>→</div>"), $.iframe);
            let point = $("<div style='position:fixed;width:1em;height:1em;top:0;left:0'>☆</div>");
            $('body').append(point);
            function scrl() {
                let p_a = { top: -$(window).scrollTop(), left: -$(window).scrollLeft() };
                let p_b = $.iframe.offset();
                if ($.target) {
                    let p_f = {
                        top: -$.iframe.contents().scrollTop(),
                        left: -$.iframe.contents().scrollLeft()
                    };
                    let p_c = $.target.offset();
                    let p_d = {
                        top: Math.min(Math.max(p_c.top, 0), $.iframe.height()),
                        left: Math.min(Math.max(p_c.left, 0), $.iframe.width())
                    };
                    let p_g = posAdd(p_d, p_f);
                    p_b = posAdd(p_b, p_g);
                }
                point.css(posAdd(p_a, p_b));
            }
            $(window).scroll(scrl);
        });
    };

    document.body.appendChild(script);
});