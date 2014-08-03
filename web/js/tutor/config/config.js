var TutorConfig = function($) {

    /**
     * Merges a default config with any user overrides to create a single
     * object
     *
     * @param defaultConfig
     * @param userConfig
     * @returns {*}
     */
    function merge(defaultConfig, userConfig) {
        return $.extend({}, defaultConfig, userConfig);
    }

    /**
     * Public methods
     */
    return {
        merge: merge
    }
}