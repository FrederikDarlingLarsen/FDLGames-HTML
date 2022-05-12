(function($) {
    $(function() {
        // Selects the jCarousel
        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                // The inner width is selected and saved in the width variable
                var carousel = $(this),
                    width = carousel.innerWidth();

                // The width is decided
                if (width >= 600) {
                    width = width / 3;
                } else if (width >= 350) {
                    width = width / 2;
                }

                // The width is set of the carousel
                carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
            })
            .jcarousel({
                // Wrap is set to be circular
                wrap: 'circular'
            });

            // Prevoius button is selected and target i decreased by one 
        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

            // Next button is selected and target i increased by one 
        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                perPage: 1,
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });
    });
})(jQuery);
