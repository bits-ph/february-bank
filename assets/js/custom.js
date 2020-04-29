$photoAlbum = $('.js-masonry');
$photoAlbum.masonry({
	itemSelector: '.js-masonry-item', // use a separate class for itemSelector, other than .col-
	columnWidth: '.js-masonry-sizer',
	percentPosition: true,
	transitionDuration: 0
});

$sectionLinks = $(".js-section-link")
$sections = $(".js-section")

sectionId = window.top.location.hash.substr(1);
if (sectionId.length != 0) {
	sectionId = "#"+sectionId;
	$section = $sections.filter(sectionId);
	if ($section.length > 0) {
		$("a[href='"+sectionId+"']").addClass("active");
		$section.removeClass("d-none");
		if (sectionId == "#photo-album") {
			$photoAlbum.masonry('layout')
			console.log("Reloaded masonry")
		}
	}
}
else {
	sectionId = "#home";
	$section = $sections.filter(sectionId);
	$("a[href='"+sectionId+"']").addClass("active");
	$section.removeClass("d-none");
}

$("a[href*='#']").click(function() {
	sectionId = $(this).attr('href');
	$section = $sections.filter(sectionId)
	if ($section.length > 0) {
		$sectionLinks.removeClass("active");
		$(this).addClass("active");
		$sections.addClass("d-none");
		$section.removeClass("d-none");
		if (sectionId == "#photo-album") {
			$photoAlbum.masonry('layout')
			console.log("Reloaded masonry")
		}
	}
});