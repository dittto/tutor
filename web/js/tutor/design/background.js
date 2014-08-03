var TutorBackground = function($) {

    function show(config) {
        var $bg = $('.' + config.boxBgClass);

        if ($bg.length === 0) {
            $('body').append('<div class="' + config.boxBgClass + '"></div>');
        }
    }

    function remove(config) {
        $('.' + config.boxBgClass).remove();
    }

    return {
        showBackground: show,
        removeBackground: remove
    }
}