$sectionLinks = $(".js-section-link")
$sections = $(".js-section")

$("#photos").slick({
	arrows: false,
	speed: 0,
	infinite: false
});

$("#pages").slick({
	arrows: false,
	speed: 0,
	infinite: false
});


sectionId = window.top.location.hash.substr(1);
if (sectionId.length != 0) {
	sectionId = "#"+sectionId;
	$section = $sections.filter(sectionId);
	if ($section.length > 0) {
		$("a[href='"+sectionId+"']").addClass("active");
		$section.css("display", "flex");
	}
}
else {
	sectionId = "#home";
	$section = $sections.filter(sectionId);
	$("a[href='"+sectionId+"']").addClass("active");
	console.log("goes here");
	$section.css("display", "flex");
}

$spotifyPlayer = $("#spotify-player")
$lyrics = $("#lyrics")

function selectTrack($track) {
	$spotifyPlayer.attr("src", $track.data("src"));
	$lyrics.html($track.html())
}

$playlist = $("#playlist").children()
$track1 = $playlist.first();
selectTrack($track1);
$track1.addClass("active");

if ($playlist.length <= 1) { $(".js-music-controls").addClass("d-none"); }

$("a[href*='#']").click(function() {
	event.preventDefault();
	sectionId = $(this).attr("href");
	$section = $sections.filter(sectionId)
	if ($section.length > 0) {

		$sectionLinks.removeClass("active");
		$(this).addClass("active");

		$sections.filter(":not(" + sectionId + ")").fadeOut();
		$section.fadeIn();

		if (sectionId == "#about") { $("#pages").slick("refresh"); }
		else if (sectionId == "#gallery") { $("#photos").slick("refresh"); }

		monogramColor = $section.data("monogram-color");
		if (monogramColor) {
			var src = $("#logo--monogram").attr("src");
			src = src.substring(0, src.indexOf("monogram--")) + "monogram--" + monogramColor + ".png";
			$("#logo--monogram").attr("src", src)
		}
		else {
			var src = $("#logo--monogram").attr("src");
			src = src.substring(0, src.indexOf("monogram--")) + "monogram--blue.png";
			$("#logo--monogram").attr("src", src)
		}

		linkColor = $section.data("link-color");
		if (linkColor) {
			var src = $("#link--new img").attr("src");
			src = src.substring(0, src.indexOf("NEWSHT-[")) + "NEWSHT-[" + linkColor + "].gif";
			$("#link--new img").attr("src", src)
		}
		else {
			var src = $("#link--new img").attr("src");
			src = src.substring(0, src.indexOf("NEWSHT-[")) + "NEWSHT-[coral].gif";
			$("#link--new img").attr("src", src)
		}
	}
});

$(".js-slick-controls a.js-control-next").click(function() {
	$control = $(this);
	var refId = $control.parents(".js-slick-controls").data("ref");
	var $ref = $("#"+refId);
	$ref.slick("slickNext").on("afterChange", function(event, slick, currentSlide, nextSlide){
		$control.siblings("a.js-control-prev").removeClass("control--disabled");
		if (slick.currentSlide >= (slick.slideCount - 1)) { $control.addClass("control--disabled"); }
	});
});

$(".js-slick-controls a.js-control-prev").click(function() {
	$control = $(this);
	var refId = $control.parents(".js-slick-controls").data("ref");
	var $ref = $("#"+refId);
	$ref.slick("slickPrev").on("afterChange", function(event, slick, currentSlide, nextSlide){
		$control.siblings("a.js-control-next").removeClass("control--disabled");
		if (slick.currentSlide == 0) { $control.addClass("control--disabled"); }
	});
});

$(".js-music-controls a.js-control-next").click(function() {
	$control = $(this);
	$current = $("#playlist > li.active")
	$next = $current.next()
	if ($next.length > 0) {
		$current.removeClass("active")
		selectTrack($next);
		$next.addClass("active")
		$control.siblings("a.js-control-prev").removeClass("control--disabled");
		if ($next.is(":last-child")) { $control.addClass("control--disabled") }
	}
});

$(".js-music-controls a.js-control-prev").click(function() {
	$control = $(this);
	$current = $("#playlist > li.active")
	$prev = $current.prev()
	if ($prev.length > 0) {
		$current.removeClass("active")
		selectTrack($prev);
		$prev.addClass("active")
		$control.siblings("a.js-control-next").removeClass("control--disabled");
		if ($prev.is(":first-child")) { $control.addClass("control--disabled") }
	}
});

$("#switch--to-apple-music").click(function() {
	$("#spotify").hide();
	$("#apple-music").show();
});


$("#switch--to-spotify").click(function() {
	$("#apple-music").hide();
	$("#spotify").show();
});