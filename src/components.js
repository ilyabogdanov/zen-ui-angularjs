/**
 * Copyright 2017 Ilya Bogdanov <public@ilyabogdanov.ru>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

angular
    .module("ZenUI", [])

    // Helpers
    .constant("ZEN_REGEXP", {
        padding: /^(0|[1-9]\d*px)$|^((0|[1-9]\d*px)\s(0|[1-9]\d*px))$|^(((0|[1-9]\d*px)\s){3}(0|[1-9]\d*px))$/i,
        pixelValue: /^([1-9](\d*))(px)$/i,
        remValue: /^((0|[1-9](\d*)))(\.[0-9]+)?(rem)$/i,
        percentValue: /^((0|[1-9](\d*)))(\.[0-9]+)?(%)$/i,
        ratioValue: /^([1-9](\d*))$/i
    })
    .constant("ZEN_MESSAGES", {
        COMMON_MESSAGES: {
            BAD_PADDING: "Property \"padding\" must be either 1,2 or 4 values, each of which must be valid pixel value, which means either "+
            "(a) Natural number, starting with anything but zero, ending with \"px\", or (b) Zero, without \"px\"."
        },
        HORIZONTAL_LAYOUT_MESSAGES: {
            EXCESSIVE_WIDTH: "Total width of all columns must not be more than 100%;",
            INSUFFICIENT_WIDTH: "Either (a) total width of all columns must be 100%, or (b) if less, then ratio may be used to divide remaining space.",
            NO_SPACE_FOR_RATIO: "No free space to accommodate columns with ratio width.",
            TOTAL_WIDTH_LIMIT_EXCEEDED: "Total width of all columns, percent and ration, does not equal precisely 100%. It should not cause trouble but be careful anyway."
        },
        VERTICAL_LAYOUT_MESSAGES: {
            BAD_HEIGHT: "Vertical layout's \"height\" must be either (1) undefined, (2) 100%, or (3) valid pixel value, which means either "+
            "(a) Natural number, starting with anything but zero, ending with \"px\", or (b) Zero, without \"px\"",
            MULTIPLE_STRETCH_ROWS: "Vertical layout may have only one stretch row."
        },
        UTILS_MESSAGES: {
            NO_STYLE_DEST: "style destination must be provided"
        },
        WINDOW_MESSAGES: {
            NO_CHILDREN: "Window must have head and body"
        }
    })
    .constant("ZEN_LOG_LEVEL", {
        OFF     : 0,
        WARN    : 1,
        INFO    : 2,
        DEBUG   : 3,
        TRACE   : 4
    })
    .constant("ZEN_SAFE_STYLE", [
        "background",
        "opacity",
        "transition",
        "white-space"
    ])
    .constant("ZEN_UI", {
        SYSTEM: {
            LOADING_MASK_LOCATION: "assets/img/loading.gif"
        },
        COMPONENTS: {
            BUTTON: {
                PALETTE: {
                    ORDINARY           : "ordinary",
                    BRANDED            : "branded"
                },
                STRETCH: {
                    TRUE               : "true",
                    FALSE              : "false",
                    ONLY_X             : "only_x",
                    ONLY_Y             : "only_y"
                }
            },
            CHECKBOX: {
                ALIGNMENT: {
                    LEFT               : "left",
                    RIGHT              : "right"
                }
            },
            WINDOW: {
                PALETTE: {
                    BRANDED            : "branded",
                    ORDINARY           : "ordinary"
                }
            }
        }
    })
    .directive("zenHelperDirectiveNumberField",       function (ZEN_UI, ZenLogger) {
        return {
            require: "ngModel",
            link: function(scope, element, attributes, controller) {
                switch(attributes["zenHelperDirectiveNumberField"]) {
                    case "hours":
                        controller.$parsers.push(hours);
                        break;
                    case "minutes":
                        controller.$parsers.push(minutes);
                        break;
                    default:
                        controller.$parsers.push(normal);
                        break;
                }
                function normal(inputValue) {
                    var transformedInput = null;
                    if (inputValue !== null && inputValue !== "") {
                        transformedInput = inputValue.replace(/[^\d-]/g,'');
                        if (transformedInput !== inputValue) {
                            ZenLogger.trace("\"%s\" contains non-digit, restoring \"%s\"", inputValue, transformedInput);
                            controller.$setViewValue(transformedInput);
                            controller.$render();
                            return transformedInput;
                        } else {
                            ZenLogger.trace("\"%s\" is a digit all right", inputValue);
                        }
                    } else {
                        ZenLogger.trace("\"%s\" is empty all right", inputValue);
                    }
                    return inputValue;
                }
                function hours(inputValue) {
                    var transformedInput = null;
                    if (inputValue !== null && inputValue !== "") {
                        transformedInput = inputValue.replace(/[^\d-]/g,'');
                        if (transformedInput !== inputValue) {
                            ZenLogger.trace("\"%s\" contains non-digit, restoring \"%s\"", inputValue, transformedInput);
                            controller.$setViewValue(transformedInput);
                            controller.$render();
                            return transformedInput;
                        } else {
                            ZenLogger.trace("\"%s\" is a digit all right", inputValue);
                        }
                    } else {
                        ZenLogger.trace("\"%s\" is empty all right", inputValue);
                    }
                    if (inputValue.length === 1 && parseInt(inputValue) > 2) {
                        ZenLogger.trace("I prepend zero and focus on minutes, because obviously there can not be more than 2 tens of hours");
                        controller.$setViewValue("0"+inputValue);
                        controller.$render();
                        return inputValue;
                    }
                    if (inputValue.length === 2 && parseInt(inputValue)>23) {
                        ZenLogger.trace("%s which is more than 23, try again", inputValue);
                        controller.$setViewValue("2");
                        controller.$render();
                        return "2";
                    }
                    return inputValue;
                }
                function minutes(inputValue) {
                    var transformedInput = null;
                    if (inputValue !== null && inputValue !== "") {
                        transformedInput = inputValue.replace(/[^\d-]/g,'');
                        if (transformedInput !== inputValue) {
                            ZenLogger.trace("\"%s\" contains non-digit, restoring \"%s\"", inputValue, transformedInput);
                            controller.$setViewValue(transformedInput);
                            controller.$render();
                            return transformedInput;
                        } else {
                            ZenLogger.trace("\"%s\" is a digit all right", inputValue);
                        }
                    } else {
                        ZenLogger.trace("\"%s\" is empty all right", inputValue);
                    }
                    if (inputValue.length === 1 && parseInt(inputValue) > 5) {
                        ZenLogger.trace("I prepend zero, because obviously there can not be more than 5 tens of minutes");
                        controller.$setViewValue("0"+inputValue);
                        controller.$render();
                        return inputValue;
                    }
                    return inputValue;
                }
            }
        };
    })
    .factory("ZenLogger",                             function (ZEN_LOG_LEVEL) {
        var me = this;
        me.level = ZEN_LOG_LEVEL.TRACE;
        return {
            setLevel: function (e) {
                me.level = e;
            },
            error: function (e) {
                throw new Error(e);
            },
            warn: function (e) {
                if (me.level >= ZEN_LOG_LEVEL.WARN) {
                    console.warn.apply(this, arguments);
                }
            },
            info: function (e) {
                if (me.level >= ZEN_LOG_LEVEL.INFO) {
                    console.warn.apply(this, arguments);
                }
            },
            debug: function (e) {
                if (me.level >= ZEN_LOG_LEVEL.DEBUG) {
                    console.log.apply(this, arguments);
                }
            },
            trace: function () {
                if (me.level >= ZEN_LOG_LEVEL.TRACE) {
                    console.log.apply(this, arguments);
                }
            }
        };
    })
    .factory("ZenUtils",                              function (ZenLogger, ZEN_REGEXP, ZEN_SAFE_STYLE, ZEN_MESSAGES, $timeout, $window) {
        var me = this;
        me.idPrefix = "zen-ui-id-";
        me.id = 0;
        return {
            generateId: function () {
                return me.idPrefix+(++me.id);
            },
            isArray: function (e) {
                return Object.prototype.toString.call(e) === "[object Array]";
            },
            isDefined: function (e) {
                return typeof e !== "undefined";
            },
            isUndefined: function (e) {
                return typeof e === "undefined";
            },
            isValidPadding: function (e) {
                return ZEN_REGEXP.padding.test(e);
            },
            isPercentValue: function (e) {
                return ZEN_REGEXP.percentValue.test(e);
            },
            isRemValue: function (e) {
                return ZEN_REGEXP.remValue.test(e);
            },
            isPixelValue: function (e) {
                return ZEN_REGEXP.pixelValue.test(e);
            },
            isRatioValue: function (e) {
                return ZEN_REGEXP.ratioValue.test(e);
            },
            isZero: function (e) {
                return e===0||e==="0";
            },
            getPercentValue: function (e) {
                var result = ZEN_REGEXP.percentValue.exec(e);
                if (!result) {
                    return null;
                }
                if (typeof result[4]==="undefined") {
                    return parseInt(result[1]+result[5]);
                } else {
                    return parseFloat(result[1]+result[4]+result[5]);
                }
            },
            isSafeStyle: function (e) {
                return typeof e === "string" && ZEN_SAFE_STYLE.indexOf(e) !== -1;
            },
            setSafeStyle: function (src, dest) {
                if (!src || src === {} || typeof src !== "object") {
                    // silence
                } else if (!dest || typeof dest !== "object") {
                    ZenLogger.error(ZEN_MESSAGES.UTILS_MESSAGES.NO_STYLE_DEST);
                } else {
                    for (var e in src) {
                        if (this.isSafeStyle(e)) {
                            dest[e] = src[e];
                        }
                    }
                }
            },
            focus: function(id) {
                $timeout(function() {
                    var element = $window.document.getElementById(id);
                    if (element) {
                        element.focus();
                    }
                });
            },
            blur: function(id) {
                $timeout(function() {
                    var element = $window.document.getElementById(id);
                    if (element) {
                        element.blur();
                    }
                });
            }
        };
    })
    .filter("zenFilterCombobox",                      function () {
        return function(input, filterString, textParam) {
            if (!filterString) {
                return input;
            }
            filterString = ".*" + filterString.toLowerCase().split(" ").join(".*");
            var regex = new RegExp(filterString, 'i'), output = [];
            angular.forEach(input, function(item) {
                if (regex.test(item[textParam])) {
                    output.push(item);
                }
            });
            return output;
        };
    })

    // Components

    // Container
    .directive("zenScrollArea",                       function (ZenUtils) {
        return {
            link: function (scope/*, element, attributes*/) {
                var style = {};/*
                if (angular.isDefined(attributes.zenScroll) && scope.zenScroll!==false) {
                    style["overflow-y"] = "auto";
                }*/
                ZenUtils.setSafeStyle(scope.zenStyle, style);
                scope.style = style;
            },
            replace: true,
            restrict: "E",
            scope: {
                /*zenStretch: "=",
                zenScroll: "=",*/
                zenStyle: "="
            },
            template: "<div class=\"zen_ui__stretch_margin\" ng-style=\"style\" style=\"overflow-y: auto\" ng-transclude></div>",
            /*template: function(element, attributes) {
                if (angular.isDefined(attributes.zenStretch)) {
                    return "<div class=\"zen_ui__stretch_margin\" ng-style=\"style\" style=\"overflow-y: auto\" ng-transclude></div>";
                } else {
                    return "<div ng-style=\"style\" ng-transclude></div>";

                }
            },*/
            transclude: true
        };
    })
    // Content
    .directive("zenText",                             function (ZenUtils) {
        return {
            link: function (scope) {
                var style = {};
                if (ZenUtils.isDefined(scope.zenStyle)) {
                    ZenUtils.setSafeStyle(scope.zenStyle, style);
                }
                if (ZenUtils.isDefined(scope.zenPadding)) {
                    style.padding = scope.zenPadding;
                }
                if (ZenUtils.isDefined(scope.x)) {
                    style.textAlign = scope.x;
                }
                if (ZenUtils.isDefined(scope.y)) {
                    style.verticalAlign = scope.y;
                }
                scope.style = style;
            },
            replace: true,
            restrict: "E",
            scope: {
                zenClipped: "=",
                zenPadding: "=",
                x: "=",
                y: "=",
                zenStyle: "="
            },
            template: function(element, attributes) {
                if (angular.isDefined(attributes.zenClipped)) {
                    return ""+
                        "<div class=\"zen_ui__clipped_text\">" +
                            "<div ng-style=\"style\" ng-transclude></div>" +
                        "</div>";
                } else {
                    return ""+
                        "<div class=\"zen_ui__text\">" +
                            "<div ng-style=\"style\" ng-transclude></div>" +
                        "</div>";
                }
            },
            transclude: true
        };
    })
    // Form
    .directive("zenCombobox",                         function (ZenUtils, ZEN_UI) {
        return {
            compile: function (element, attributes) {
                if (angular.isUndefined(attributes.zenDisabled)) {
                    attributes.zenDisabled = "::false";
                }
                return {
                    pre: function (scope) {
                        scope.tmpFilterText = null;
                        if(!scope.zenDisabled) {
                            scope.focusOnSearch = function (id) {
                                ZenUtils.focus(id);
                            };
                        }
                        scope.zenPalette = ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY;
                    },
                    post: function (scope) {
                        var found = false;
                        for (var i = 0;i<scope.zenItems.length;i++) {
                            if(scope.zenItems[i][scope.zenValueParameter]===scope.zenActiveItem) {
                                found = true;
                                scope.activeItemText = scope.zenItems[i][scope.zenTextParameter];
                            }
                        }/*
                        if (!found) {
                            console.info("should throw error because active item was not found");
                        }*/
                        scope.zenCallback = function (zenText, zenValue) {
                            scope.activeItemText = zenText;
                            scope.zenActiveItem = zenValue;
                        };
                    }
                };
            },
            controller: function () {
                var me = this;
                me.id = ZenUtils.generateId();
                me.comboboxRadioName = ZenUtils.generateId();
                me.searchBoxId = ZenUtils.generateId();
            },
            controllerAs: "ctrl",
            replace: true,
            restrict: "E",
            scope: {
                zenDisabled: "=",
                zenItems: "=",
                zenActiveItem: "=",
                zenTextParameter: "=",
                zenValueParameter: "=",
                zenStretch: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__combobox__container\" data-stretch=\"{{zenStretch}}\">" +
            "<div>" +
            "<input class=\"zen_ui__button_checkbox\" id=\"{{ctrl.id}}\" ng-disabled=\"zenDisabled\" type=\"checkbox\" ng-true-value=\"true\" ng-false-value=\"false\"/>" +
            "<label class=\"zen_ui__button\" data-palette=\"{{zenPalette}}\" for=\"{{ctrl.id}}\" ng-click=\"focusOnSearch(ctrl.searchBoxId)\">" +
            "<span class=\"zen_ui__button_text\">" +
            "<span ng-bind=\"activeItemText\">" +
            "</span>" +
            "</span>" +
            "<span class=\"zen_ui__combobox__triangle\"></span>" +
            "</label>" +
            "<div class=\"zen_ui__combobox__dropbox\">" +

            "<div class=\"zen_ui__combobox__search_field\" data-stretch=\"false\">" +
            "<input id=\"{{ctrl.searchBoxId}}\" data-error=\"\" type=\"text\" class=\"zen_ui__textfield__input\" placeholder=\"\" ng-model=\"tmpFilterText\" ng-disabled=\"false\"/>" +
            "</div>" +

            "<div ng-if=\"!zenDisabled\" class=\"zen_ui__combobox__option_group\">" +

            "<div ng-repeat=\"item in zenItems | zenFilterCombobox:tmpFilterText:zenTextParameter\">" +
            "<input type=\"radio\" name=\"{{::comboboxRadioName}}\" class=\"zen_ui__checkbox_for_combobox_option\" ng-model=\"zenActiveItem\" ng-value=\"item[zenValueParameter]\"/>" +
            "<label class=\"zen_ui__combobox__option\" ng-click=\"zenCallback(item[zenTextParameter], item[zenValueParameter])\" for=\"{{ctrl.id}}\">" +
            "<span class=\"text\" ng-bind=\"item[zenTextParameter]\"></span>" +
            "</label>" +
            "</div>" +

            "</div>" +

            "<div ng-if=\"!zenDisabled && (zenItems | zenFilterCombobox:tmpFilterText:zenTextParameter).length===0\" class=\"zen_ui__combobox__no_options\">" +
            "<div>No such options</div>" +
            "</div>" +

            "</div>" +
            "<label class=\"zen_ui__combobox__dropbox_hide\" for=\"{{ctrl.id}}\"></label>" +
            "<div></div>" +
            "<div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenConjoinedButtons",                 function () {
        return {
            controller: function () {},
            replace: true,
            restrict: "E",
            scope: true,
            template: "<div class=\"zen_ui__conjoined_buttons\" ng-transclude></div>",
            transclude: true
        };
    })
    .directive("zenLinkButton",                       function (ZEN_UI) {
        return {
            compile: function (element, attributes) {
                if (angular.isUndefined(attributes.zenStretch)) {
                    attributes.zenStretch = "::'false'";
                }
                if (angular.isDefined(attributes.zenDisabled) && attributes.zenDisabled==="") {
                    attributes.zenDisabled="::true";
                }
                if (angular.isUndefined(attributes.zenPalette)) {
                    attributes.zenPalette = "::'"+ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY+"'";
                }
                return {
                    pre: function () {},
                    post: function (scope, element, attributes) {
                        var outerClazz = {};
                        var innerClazz = {};
                        if (angular.isDefined(attributes.zenDisabled) && scope.zenDisabled!==false) {
                            innerClazz["disabled"] = true;
                        }
                        if (angular.isDefined(attributes.zenConjoined)) {
                            switch(scope.zenConjoined) {
                                case "first":
                                    outerClazz["zen_ui__first_conjoined_button_container"] = true;
                                    break;
                                case "last":
                                    outerClazz["zen_ui__last_conjoined_button_container"] = true;
                                    break;
                                default:
                                    outerClazz["zen_ui__conjoined_button_container"] = true;
                                    break;
                            }
                        }
                        scope.outerClazz = outerClazz;
                        scope.innerClazz = innerClazz;
                    }
                };
            },
            replace: true,
            require: "?^zenConjoinedButtons",
            restrict: "E",
            scope: {
                zenConjoined: "=",
                zenPalette: "=",
                zenDisabled: "=",
                zenHref: "=",
                zenSref: "=",
                zenStretch: "="
            },
            template: function(element, attributes) {
                // @formatter:off
                return "<div class=\"zen_ui__button_container\" ng-class=\"outerClazz\" data-stretch=\"{{zenStretch}}\">" +
                    (angular.isDefined(attributes.zenSref) ?
                        "<a class=\"zen_ui__button\" ng-class=\"innerClazz\" data-palette=\"{{zenPalette}}\" ui-sref=\"{{zenSref}}\">" :
                        "<a class=\"zen_ui__button\" ng-class=\"innerClazz\" data-palette=\"{{zenPalette}}\" ng-href=\"{{zenHref}}\">") +
                    "<span class=\"zen_ui__button_text\">" +
                    "<span>" +
                    "<span ng-transclude></span>" +
                    "</span>" +
                    "</span>" +
                    "</a>" +
                    "<div></div>" +
                    "</div>";
                // @formatter:on
            },
            transclude: true
        };
    })
    .directive("zenPushButton",                       function (ZEN_UI) {
        return {
            compile: function (element, attributes) {
                if (angular.isUndefined(attributes.zenStretch)) {
                    attributes.zenStretch = "::'false'";
                }
                if (angular.isDefined(attributes.zenDisabled) && attributes.zenDisabled==="") {
                    attributes.zenDisabled="::true";
                }
                if (angular.isUndefined(attributes.zenPalette)) {
                    attributes.zenPalette = "::'"+ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY+"'";
                }
                return {
                    pre: function () {},
                    post: function (scope, element, attributes) {
                        var clazz = {};
                        if (angular.isDefined(attributes.zenConjoined)) {
                            switch(scope.zenConjoined) {
                                case "first":
                                    clazz["zen_ui__first_conjoined_button_container"] = true;
                                    break;
                                case "last":
                                    clazz["zen_ui__last_conjoined_button_container"] = true;
                                    break;
                                default:
                                    clazz["zen_ui__conjoined_button_container"] = true;
                                    break;
                            }
                        }
                        scope.clazz = clazz;
                    }
                };
            },
            controller: function () {

            },
            replace: true,
            require: "?^zenConjoinedButtons",
            restrict: "E",
            scope: {
                zenClick: "&",
                zenConjoined: "=",
                zenPalette: "=",
                zenDisabled: "=",
                zenStretch: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__button_container\" ng-class=\"clazz\" data-stretch=\"{{zenStretch}}\">" +
                "<button class=\"zen_ui__button\" ng-disabled=\"zenDisabled\" data-palette=\"{{zenPalette}}\" ng-click=\"zenClick()\">" +
                    "<span class=\"zen_ui__button_text\" ng-transclude></span>" +
                "</button>" +
                "<div></div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenToggleButton",                     function (ZenUtils, ZEN_UI) {
        return {
            compile: function (element, attributes) {
                if (angular.isUndefined(attributes.zenStretch)) {
                    attributes.zenStretch = "::'false'";
                }
                if (angular.isDefined(attributes.zenDisabled) && attributes.zenDisabled==="") {
                    attributes.zenDisabled = "::'true'";
                }
                if (angular.isUndefined(attributes.zenPalette)) {
                    attributes.zenPalette = "::'"+ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY+"'";
                }
                return {
                    pre: function () {},
                    post: function (scope, element, attributes) {
                        scope.id = ZenUtils.generateId();
                        var outerClazz = {};
                        var innerClazz = {};
                        if (angular.isDefined(attributes.zenDisabled) && scope.zenDisabled!==false) {
                            innerClazz["disabled"] = true;
                        }
                        if (angular.isDefined(attributes.zenConjoined)) {
                            switch(scope.zenConjoined) {
                                case "first":
                                    outerClazz["zen_ui__first_conjoined_button_container"] = true;
                                    break;
                                case "last":
                                    outerClazz["zen_ui__last_conjoined_button_container"] = true;
                                    break;
                                default:
                                    outerClazz["zen_ui__conjoined_button_container"] = true;
                                    break;
                            }
                        }
                        scope.outerClazz = outerClazz;
                        scope.innerClazz = innerClazz;
                    }
                };
            },
            controller: function () {},
            replace: true,
            require: "?^zenConjoinedButtons",
            restrict: "E",
            scope: {
                zenConjoined: "=",
                zenPalette: "=",
                zenDisabled: "=",
                zenModel: "=",
                zenStretch: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__button_container\" ng-class=\"outerClazz\" data-stretch=\"{{zenStretch}}\">" +
                "<input class=\"zen_ui__toggle_button_input\" ng-model=\"zenModel\" ng-true-value=\"true\" ng-false-value=\"false\" type=\"checkbox\" ng-disabled=\"zenDisabled\" id=\"{{id}}\"/>" +
                "<label class=\"zen_ui__button\" ng-class=\"innerClazz\" data-palette=\"{{zenPalette}}\" for=\"{{id}}\">" +
                    "<span class=\"zen_ui__button_text\">" +
                        "<span>" +
                            "<span ng-transclude></span>" +
                        "</span>" +
                    "</span>" +
                "</label>" +
                "<div></div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenToggleGroup",                      function (ZenUtils) {
        return {
            link: function (scope, element, attributes) {
                var clazz = {};
                if (angular.isDefined(attributes.zenConjoined)) {
                    clazz["zen_ui__conjoined_buttons"] = true;
                }
                scope.clazz = clazz;
            },
            controller: function () {
                var me = this;
                me.name = ZenUtils.generateId();
                me.getName = function () {
                    return me.name;
                };
            },
            replace: true,
            restrict: "E",
            scope: true,
            template: "<div ng-class=\"clazz\" ng-transclude></div>",
            transclude: true
        };
    })
    .directive("zenToggleRadio",                      function (ZenUtils, ZEN_UI) {
        return {
            compile: function(element, attributes){
                if (angular.isUndefined(attributes.zenStretch)) {
                    attributes.zenStretch = "::'false'";
                }
                if (angular.isDefined(attributes.zenDisabled) && attributes.zenDisabled==="") {
                    attributes.zenDisabled = "::'true'";
                }
                if (angular.isUndefined(attributes.zenPalette)) {
                    attributes.zenPalette = "::'"+ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY+"'";
                }
                return {
                    pre: function () {},
                    post: function (scope, element, attributes, controller) {
                        scope.name = controller.getName();
                        scope.id = ZenUtils.generateId();
                        scope.id = ZenUtils.generateId();
                        var outerClazz = {};
                        var innerClazz = {};
                        if (angular.isDefined(attributes.zenDisabled) && scope.zenDisabled!==false) {
                            innerClazz["disabled"] = true;
                        }
                        if (angular.isDefined(attributes.zenConjoined)) {
                            switch(scope.zenConjoined) {
                                case "first":
                                    outerClazz["zen_ui__first_conjoined_button_container"] = true;
                                    break;
                                case "last":
                                    outerClazz["zen_ui__last_conjoined_button_container"] = true;
                                    break;
                                default:
                                    outerClazz["zen_ui__conjoined_button_container"] = true;
                                    break;
                            }
                        }
                        scope.outerClazz = outerClazz;
                        scope.innerClazz = innerClazz;
                    }
                };
            },
            controller: function () {

            },
            replace: true,
            require: "^zenToggleGroup",
            restrict: "E",
            scope: {
                zenConjoined: "=",
                zenPalette: "=",
                zenDisabled: "=",
                zenModel: "=",
                zenStretch: "=",
                zenValue: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__button_container\" ng-class=\"outerClazz\" data-stretch=\"{{zenStretch}}\">" +
            "<input class=\"zen_ui__toggle_button_input\" ng-model=\"zenModel\" ng-value=\"zenValue\" name=\"{{name}}\" type=\"radio\" ng-disabled=\"zenDisabled\" id=\"{{id}}\"/>" +
            "<label class=\"zen_ui__button\" ng-class=\"innerClazz\" data-palette=\"{{zenPalette}}\" for=\"{{id}}\">" +
            "<span class=\"zen_ui__button_text\">" +
            "<span>" +
            "<span ng-transclude></span>" +
            "</span>" +
            "</span>" +
            "</label>" +
            "<div></div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenCheckbox",                         function (ZenUtils) {
        return {
            compile: function(element, attributes){
                if (angular.isUndefined(attributes.zenReadonly)) {
                    attributes.zenReadonly = "::false";
                }
                if (angular.isDefined(attributes.zenReadonly) && attributes.zenReadonly==="") {
                    attributes.zenReadonly = "::true";
                    attributes.zenDisabled = "::true";
                }
                if (angular.isUndefined(attributes.zenDisabled)) {
                    attributes.zenDisabled = "::false";
                }
                return {
                    pre: function () {},
                    post: function (scope) {
                        scope.id = ZenUtils.generateId();
                    }
                };
            },
            replace: true,
            restrict: "E",
            scope: {
                zenAlignment: "=",
                zenDisabled: "=",
                zenModel: "=",
                zenReadonly: "="
            },
            // height can be set on container, which will center radio-button vertically
            template:
            // @formatter:off
            "<div class=\"zen_ui__checkbox_container\" data-align=\"{{zenAlignment}}\">" +
            "<div>" +
            "<input type=\"checkbox\" class=\"zen_ui__checkbox_input\" id=\"{{id}}\" data-readable-only=\"{{zenReadonly==true}}\" ng-model=\"zenModel\" ng-disabled=\"zenReadonly===true || zenDisabled===true\" ng-true-value=\"true\" ng-false-value=\"false\"/>" +
            "<label class=\"zen_ui__checkbox\" for=\"{{id}}\" ng-transclude></label>" +
            "</div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenRadioGroup",                       function (ZenUtils) {
        return {
            controller: function () {
                var me = this;
                me.name = ZenUtils.generateId();
                me.getName = function () {
                    return me.name;
                };
            },
            replace: true,
            restrict: "E",
            scope: true,
            template: "<div ng-transclude></div>",
            transclude: true
        };
    })
    .directive("zenRadio",                            function (ZenUtils) {
        return {
            compile: function(element, attributes){
                if (angular.isUndefined(attributes.zenReadonly)) {
                    attributes.zenReadonly = "::false";
                }
                if (angular.isDefined(attributes.zenReadonly) && attributes.zenReadonly==="") {
                    attributes.zenReadonly = "::true";
                    attributes.zenDisabled = "::true";
                }
                if (angular.isUndefined(attributes.zenDisabled)) {
                    attributes.zenDisabled = "::false";
                }
                return {
                    pre: function () {},
                    post: function (scope, element, attributes, controller) {
                        scope.id = ZenUtils.generateId();
                        scope.name = controller.getName();
                    }
                };
            },
            controller: function () {},
            replace: true,
            require: "^zenRadioGroup",
            restrict: "E",
            scope: {
                zenAlignment: "=",
                zenDisabled: "=",
                zenModel: "=",
                zenReadonly: "=",
                zenValue: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__checkbox_container\" data-align=\"{{zenAlignment}}\">" +
                "<div>" +
                    "<input type=\"radio\" class=\"zen_ui__checkbox_input\" id=\"{{id}}\" data-readable-only=\"{{zenReadonly===true}}\" ng-model=\"zenModel\" ng-disabled=\"zenReadonly===true && zenDisabled===true\" ng-value=\"zenValue\" name=\"{{name}}\"/>" +
                    "<label class=\"zen_ui__radio\" for=\"{{id}}\" ng-transclude></label>" +
                "</div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenTextField",                        function () {
        return {
            compile: function (element, attributes) {
                if (angular.isUndefined(attributes.zenStretch)) {
                    attributes.zenStretch = "::false";
                }
                if (angular.isDefined(attributes.zenStretch) && attributes.zenStretch==="") {
                    attributes.zenStretch="::true";
                }
                return {
                    pre: function () {},
                    post: function () {}
                };
            },
            restrict: "E",
            scope: {
                zenDisabled: "=",
                zenError: "=",
                zenModel: "=",
                zenStretch: "=",
                zenPlaceholder: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__textfield__container\" data-stretch=\"{{zenStretch===true}}\">" +
            "<input data-error=\"{{zenError}}\" type=\"text\" class=\"zen_ui__textfield__input\" placeholder=\"{{zenPlaceholder}}\" ng-model=\"zenModel\" ng-disabled=\"zenDisabled\"/>" +
            "</div>"
            // @formatter:on
        };
    })
    .directive("zenPasswordField",                    function () {
        return {
            compile: function (element, attributes) {
                if (angular.isUndefined(attributes.zenStretch)) {
                    attributes.zenStretch = "::false";
                }
                if (angular.isDefined(attributes.zenStretch) && attributes.zenStretch==="") {
                    attributes.zenStretch="::true";
                }
                return {
                    pre: function () {},
                    post: function () {}
                };
            },
            restrict: "E",
            scope: {
                zenDisabled: "=",
                zenError: "=",
                zenModel: "=",
                zenStretch: "=",
                zenPlaceholder: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__textfield__container\" data-stretch=\"{{zenStretch===true}}\">" +
            "<input data-error=\"{{zenError}}\" type=\"password\" class=\"zen_ui__textfield__input\" placeholder=\"{{zenPlaceholder}}\" ng-model=\"zenModel\" ng-disabled=\"zenDisabled\"/>" +
            "</div>"
            // @formatter:on
        };
    })
    .directive("zenNumberField",                      function (ZenUtils) {
        return {
            compile: function (element, attributes) {
                if (angular.isUndefined(attributes.zenStretch)) {
                    attributes.zenStretch = "::false";
                }
                if (angular.isDefined(attributes.zenStretch) && attributes.zenStretch==="") {
                    attributes.zenStretch="::true";
                }
                return {
                    pre: function () {},
                    post: function (scope) {
                        scope.id = ZenUtils.generateId();
                        scope.onlyNumbers = /^\d+$/;
                        scope.onChange = function () {
                            if (scope.zenModel==="") {
                                scope.zenModel=null;
                            }
                        };
                        scope.plus = function() {
                            if (scope.zenDisabled !== true) {
                                if (scope.zenModel!==null) {
                                    scope.zenModel = parseInt(scope.zenModel) + 1;
                                } else {
                                    scope.zenModel = 0;
                                }
                            }
                        };
                        scope.minus = function() {
                            if (scope.zenDisabled !== true) {
                                if (scope.zenModel!==null) {
                                    scope.zenModel = parseInt(scope.zenModel) - 1;
                                } else {
                                    scope.zenModel = 0;
                                }
                            }
                        };
                    }
                };
            },
            replace: true,
            restrict: "E",
            scope: {
                zenModel: "=",
                zenStretch: "=",
                zenSuffix: "=",
                zenDisabled: "=",
                zenError: "=",
                zenPlaceholder: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__number_field__container\" data-stretch=\"{{zenStretch===true}}\">" +
            "<div class=\"zen_ui__number_field\" data-error=\"{{zenError}}\">" +
            "<div class=\"zen_ui__number_field__input_container\">" +
            "<input type=\"text\" ng-model=\"zenModel\" ng-change=\"onChange()\" ng-disabled=\"zenDisabled\" placeholder=\"{{zenPlaceholder}}\" id=\"{{id}}\" ng-pattern=\"onlyNumbers\" zen-helper-directive-number-field/>" +
            "<div></div>" +
            "</div>" +
            "<div ng-if=\"zenSuffix\" class=\"zen_ui__number_field__builtin_label\">" +
            "<label for=\"{{id}}\"><div ng-bind=\"zenSuffix\"></div></label>" +
            "</div>" +
            "<div class=\"zen_ui__number_field__buttons\">" +
            "<div>" +
            "<div>" +
            "<div><div><label ng-class=\"{disabled:zenDisabled}\" class=\"zen_ui__number_field__button__increase_number\" for=\"{{id}}\" ng-click=\"plus()\"></label></div></div>" +
            "<div><div><label ng-class=\"{disabled:zenDisabled}\" class=\"zen_ui__number_field__button__decrease_number\" for=\"{{id}}\" ng-click=\"minus()\"></label></div></div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
            // @formatter:on
        };
    })
    .directive("zenTimeField",                        function (ZenUtils, ZenLogger) {
        return {
            link: function (scope) {
                scope.id_hours = ZenUtils.generateId();
                scope.id_minutes = ZenUtils.generateId();
                scope.onlyNumbers = /^\d+$/;
                setTime(scope.zenModel.getHours(), scope.zenModel.getMinutes());

                function setTime(hours, minutes) {
                    // init setter
                    if (hours!==parseInt(scope.model_hours)) {
                        if (hours < 10) {
                            hours = "0"+hours;
                        }
                        scope.model_hours = hours.toString();
                    } else if (hours > 2 && hours < 10) {
                        scope.model_hours = "0"+(hours.toString());
                    }
                    // init setter
                    if (minutes!==parseInt(scope.model_minutes)) {
                        if (minutes < 10) {
                            minutes = "0"+minutes;
                        }
                        scope.model_minutes = minutes.toString();
                    } else if (minutes > 5 && minutes < 10) {
                        scope.model_minutes = "0"+(minutes.toString());
                    }
                }
                scope.$watch("zenModel", function (after) {
                    setTime(after.getHours(), after.getMinutes());
                });
                function setModel() {
                    var newModel = new Date(1970,0,1,0,0,0);
                    // models may be null or empty string, I don't give a shit, because I use parseInt which accepts both
                    if (!isNaN(parseInt(scope.model_hours))) {
                        newModel.setHours(parseInt(scope.model_hours));
                    }
                    if (!isNaN(parseInt(scope.model_minutes))) {
                        newModel.setMinutes(parseInt(scope.model_minutes));
                    }
                    scope.zenModel = newModel;
                }
                scope.setHours = function (hours) {
                    if (hours!==null && hours!=="") {
                        if ((parseInt(hours) > 2 && hours.toString().length===1) || hours.toString().length===2) {
                            ZenUtils.focus(scope.id_minutes);
                        }
                    } else {
                        ZenLogger.trace("unfortunately hours empty");
                        ZenUtils.focus(scope.id_minutes);
                    }
                    if (scope.zenModel.getHours()!==parseInt(hours)) {
                        setModel();
                    }
                };
                scope.setMinutes = function (minutes) {
                    if (minutes!==null && minutes!=="") {
                        if ((parseInt(minutes) > 5 && minutes.toString().length===1) || minutes.toString().length===2) {
                            ZenUtils.blur(scope.id_minutes);
                        }
                    } else {
                        ZenLogger.trace("unfortunately minutes empty");
                        ZenUtils.blur(scope.id_minutes);
                    }
                    if (scope.zenModel.getMinutes()!==parseInt(minutes)) {
                        setModel();
                    }
                };
            },
            replace: true,
            restrict: "E",
            scope: {
                zenModel: "=",
                zenStretch: "=",
                zenDisabled: "=",
                zenError: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__time_field__container\" data-stretch=\"{{zenStretch}}\" data-error=\"{{zenError}}\">" +
                "<input type=\"time\" ng-model=\"zenModel\" class=\"zen_ui__hidden_input\"/>" +
                "<div>" +
                    "<div class=\"zen_ui__time_field__input_container\">" +
                        "<input type=\"text\" class=\"zen_ui__time_field__input zen_ui__time_field__input__hours\" onfocus=\"this.select();\" maxlength=\"2\" ng-model=\"model_hours\" ng-change=\"setHours(model_hours)\" ng-disabled=\"zenDisabled\" id=\"{{id_hours}}\" ng-pattern=\"onlyNumbers\" zen-helper-directive-number-field=\"hours\"/>" +
                        "<div></div>" +
                    "</div>" +
                    "<div class=\"zen_ui__time_field__colon\">:</div>" +
                    "<div class=\"zen_ui__time_field__input_container\">" +
                        "<input type=\"text\" class=\"zen_ui__time_field__input zen_ui__time_field__input__minutes\" onfocus=\"this.select();\" maxlength=\"2\" ng-model=\"model_minutes\" ng-change=\"setMinutes(model_minutes)\" ng-disabled=\"zenDisabled\" id=\"{{id_minutes}}\" ng-pattern=\"onlyNumbers\" zen-helper-directive-number-field=\"minutes\"/>" +
                        "<div></div>" +
                    "</div>" +
                "</div>" +
            "</div>"
            // @formatter:on
        };
    })
    // Layout
    .directive("zenHorizontalLayout",                 function (ZEN_MESSAGES, ZenLogger) {
        return {
            controller: function () {
                var me = this;
                me.columns = {
                    percent: [],
                    ratio: []
                };
            },
            link: function (scope, element, attributes, controller) {

                var name = "Horizontal layout";
                var percentage = {
                    initial: 0,
                    used: 0,
                    remaining: 100
                };
                var totalRatio = 0;
                var referenceUnit = null;

                if (controller.columns.percent.length > 0) {
                    percentage.initial = controller.columns.percent.reduce(function(sum, value) {
                        return sum + value;
                    }, 0);
                }
                if (controller.columns.ratio.length > 0) {
                    totalRatio = controller.columns.ratio.reduce(function(sum, value) {
                        return sum + value.value;
                    }, 0);
                }
                percentage.remaining -= percentage.initial;
                ZenLogger.trace(name, "percentage", percentage);

                if (percentage.initial > 100) {
                    ZenLogger.error(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.EXCESSIVE_WIDTH);

                } else if (percentage.initial >= 0 && percentage.initial < 100 && totalRatio === 0) {
                    ZenLogger.error(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.INSUFFICIENT_WIDTH);

                } else if (percentage.initial === 100 && totalRatio > 0) {
                    ZenLogger.error(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.NO_SPACE_FOR_RATIO);

                } else if (percentage.initial < 100 && totalRatio > 0) {
                    referenceUnit = Math.round((percentage.remaining / totalRatio) * 100) / 100;
                }
                if (referenceUnit) {
                    ZenLogger.trace(name, "reference unit:", referenceUnit+"%");
                }

                if (totalRatio > 0) {
                    var next;
                    controller.columns.ratio.forEach(function(e) {
                        next = Math.round(referenceUnit * e.value * 100) / 100;
                        ZenLogger.trace(name, "used", percentage.used, "+", "next", next, "=", (Math.round((percentage.used + next) * 100) / 100));
                        percentage.used = Math.round((percentage.used + next) * 100) / 100;
                        e.fn(next+"%");
                    });
                }
                if (percentage.initial !== 100) {
                    if (percentage.used !== percentage.remaining) {
                        ZenLogger.warn(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.TOTAL_WIDTH_LIMIT_EXCEEDED);
                    } else {
                        ZenLogger.trace(name, "accurate result");
                    }
                }

                var outerStyle = {};
                if (angular.isDefined(scope.zenHeight)) {
                    outerStyle.height = scope.zenHeight;
                }
                scope.outerStyle = outerStyle;
            },
            replace: true,
            restrict: "E",
            scope: {
                zenDivider: "=",
                zenHeight: "="
            },
            template: "<div class=\"zen_ui__horizontal_layout\" ng-style=\"outerStyle\" data-divider=\"{{zenDivider}}\" ng-transclude></div>",
            transclude: true
        };
    })
    /**
     * Important notice: ng-repeat is incompatible with columns,
     * because parent's post-link function is executed before children.
     */
    .directive("zenHorizontalLayoutColumn",           function (ZenUtils) {
        return {
            controller: function () {},
            link: function (scope, element, attributes, controller) {

                scope.outerStyle = {};
                scope.innerStyle = {};

                if (ZenUtils.isDefined(scope.zenWidth) && ZenUtils.isPercentValue(scope.zenWidth)) {

                    scope.outerStyle.width = scope.zenWidth;

                    var percentValue = ZenUtils.getPercentValue(scope.zenWidth);
                    controller.columns.percent.push(percentValue);

                } else if (ZenUtils.isDefined(scope.zenWidth) && (ZenUtils.isPixelValue(scope.zenWidth) || ZenUtils.isRemValue(scope.zenWidth))) {

                    scope.innerStyle.width = scope.zenWidth;

                } else if (ZenUtils.isRatioValue(scope.zenWidth)) {

                    controller.columns.ratio.push({
                        fn: function (e) {
                            scope.outerStyle.width = e;
                        },
                        value: parseInt(scope.zenWidth)
                    });
                }

                if (ZenUtils.isDefined(scope.zenPadding)) {
                    scope.innerStyle.padding = scope.zenPadding;
                }
                if (ZenUtils.isDefined(scope.zenStyle)) {
                    ZenUtils.setSafeStyle(scope.zenStyle, scope.outerStyle);
                }
            },
            replace: true,
            require: '^zenHorizontalLayout',
            restrict: "E",
            scope: {
                zenPadding: "=",
                zenWidth: "=",
                zenStyle: "="
            },
            template:
                // @formatter:off
                "<div class=\"zen_ui__horizontal_layout_column\" ng-style=\"outerStyle\">" +
                    "<div ng-style=\"innerStyle\">" +
                        "<div ng-transclude>" +
                        "</div>" +
                    "</div>" +
                "</div>",
                // @formatter:on
            transclude: true
        };
    })
    .directive("zenVerticalLayout",                   function () {
        return {
            controller: function ($scope) {
                var me = this;
                me.setHasStretchRow = function (e) {
                    $scope.hasStretchRow = e;
                };
                me.getHasStretchRow = function () {
                    return $scope.hasStretchRow;
                };
                me.setHasStretchRow(false);
            },
            link: function (scope) {
                var clazz = {};
                if (scope.hasStretchRow) {
                    clazz.zen_ui__vertical_layout__stretch = true;
                } else {
                    clazz.zen_ui__vertical_layout__non_stretch = true;
                }
                scope.clazz = clazz;
            },
            replace: true,
            restrict: "E",
            scope: {
                zenDivider: "="
            },
            template: "<div ng-class=\"clazz\" data-divider=\"{{zenDivider}}\" ng-transclude></div>",
            transclude: true
        };
    })
    .directive("zenVerticalLayoutRow",                function (ZenUtils, ZEN_MESSAGES, ZenLogger) {
        return {
            controller: function () {},
            link: {
                pre: function (scope, element, attributes, controller) {
                    if (ZenUtils.isDefined(scope.zenHeight) &&
                        !ZenUtils.isZero(scope.zenHeight) &&
                        !ZenUtils.isPixelValue(scope.zenHeight) &&
                        !ZenUtils.isRemValue(scope.zenHeight) &&
                        scope.zenHeight!=="100%") {
                        ZenLogger.error(ZEN_MESSAGES.VERTICAL_LAYOUT_MESSAGES.BAD_HEIGHT);
                    }
                    if (scope.zenHeight==="100%") {
                        if (!controller.getHasStretchRow()) {
                            controller.setHasStretchRow(true);
                        } else {
                            ZenLogger.error(ZEN_MESSAGES.VERTICAL_LAYOUT_MESSAGES.MULTIPLE_STRETCH_ROWS);
                        }
                    }
                    if (ZenUtils.isDefined(scope.zenPadding) && !ZenUtils.isValidPadding(scope.zenPadding)) {
                        ZenLogger.error(ZEN_MESSAGES.COMMON_MESSAGES.BAD_PADDING);
                    }
                },
                post: function (scope) {
                    var paddingStyle = {};
                    if (angular.isDefined(scope.zenPadding)) {
                        if (angular.isDefined(scope.zenHeight)) {
                            paddingStyle.margin = scope.zenPadding;
                        } else {
                            paddingStyle.padding = scope.zenPadding;
                        }
                    }
                    if (angular.isDefined(scope.zenHeight) && scope.zenHeight!=="100%") {
                        scope.heightStyle = {
                            height: scope.zenHeight
                        };
                    }
                    scope.paddingStyle = paddingStyle;
                }
            },
            replace: true,
            require: '^zenVerticalLayout',
            restrict: "E",
            scope: {
                zenPadding: "=",
                zenHeight: "="
            },
            template: function(element, attributes) {
                if (angular.isDefined(attributes.zenHeight)) {
                    if (/100%/.test(attributes.zenHeight)) {
                        // @formatter:off
                        return "" +
                            "<div class=\"zen_ui__vertical_layout_row__stretch\">" +
                                "<div>" +
                                    "<div>" +
                                        "<div class=\"zen_ui__stretch\">" +
                                            "<div class=\"zen_ui__stretch_margin\" ng-style=\"paddingStyle\" ng-transclude></div>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
                        // @formatter:on
                    } else {
                        // @formatter:off
                        return "" +
                            "<div class=\"zen_ui__vertical_layout_row__non_stretch\">" +
                                "<div>" +
                                    "<div ng-style=\"heightStyle\">" +
                                        "<div class=\"zen_ui__stretch_margin\" ng-style=\"paddingStyle\" ng-transclude>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>";
                        // @formatter:on
                    }
                } else {
                    // @formatter:off
                    return "" +
                        "<div class=\"zen_ui__vertical_layout_row__non_stretch\">" +
                            "<div ng-style=\"paddingStyle\">" +
                                "<div ng-transclude>" +
                                "</div>" +
                            "</div>" +
                        "</div>";
                    // @formatter:on
                }
            },
            transclude: true
        };
    })
    // Navigation
    .directive("zenHorizontalMenu",                   function (ZenUtils, ZEN_MESSAGES, ZenLogger) {
        return {
            controller: function () {
                var me = this;
                me.columns = {
                    percent: [],
                    ratio: []
                };
            },
            link: function (scope, element, attributes, controller) {

                var name = "Horizontal menu";
                var percentage = {
                    initial: 0,
                    used: 0,
                    remaining: 100
                };
                var totalRatio = 0;
                var referenceUnit = null;

                if (controller.columns.percent.length > 0) {
                    percentage.initial = controller.columns.percent.reduce(function(sum, value) {
                        return sum + value;
                    }, 0);
                }
                if (controller.columns.ratio.length > 0) {
                    totalRatio = controller.columns.ratio.reduce(function(sum, value) {
                        return sum + value.value;
                    }, 0);
                }
                percentage.remaining -= percentage.initial;
                ZenLogger.trace(name, "percentage", percentage);

                if (percentage.initial > 100) {
                    ZenLogger.error(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.EXCESSIVE_WIDTH);

                } else if (percentage.initial >= 0 && percentage.initial < 100 && totalRatio === 0) {
                    ZenLogger.error(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.INSUFFICIENT_WIDTH);

                } else if (percentage.initial === 100 && totalRatio > 0) {
                    ZenLogger.error(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.NO_SPACE_FOR_RATIO);

                } else if (percentage.initial < 100 && totalRatio > 0) {
                    referenceUnit = Math.round((percentage.remaining / totalRatio) * 100) / 100;
                }
                if (referenceUnit) {
                    ZenLogger.trace(name, "reference unit:", referenceUnit+"%");
                }

                if (totalRatio > 0) {
                    var next;
                    controller.columns.ratio.forEach(function(e) {
                        next = Math.round(referenceUnit * e.value * 100) / 100;
                        ZenLogger.trace(name, "used", percentage.used, "+", "next", next, "=", (Math.round((percentage.used + next) * 100) / 100));
                        percentage.used = Math.round((percentage.used + next) * 100) / 100;
                        e.fn(next+"%");
                    });
                }
                if (percentage.initial !== 100) {
                    if (percentage.used !== percentage.remaining) {
                        ZenLogger.warn(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.TOTAL_WIDTH_LIMIT_EXCEEDED);
                    } else {
                        ZenLogger.trace(name, "accurate result");
                    }
                }

                scope.outerStyle = {
                    height: "100%"
                };
            },
            replace: true,
            restrict: "E",
            scope: true,
            template:
            // @formatter:off
            "<div class=\"zen_ui__horizontal_menu\">" +
                "<div class=\"zen_ui__horizontal_layout\" style=\"height: 100%\" ng-transclude></div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenHorizontalMenuColumn",             function (ZenUtils) {
        return {
            controller: function () {},
            link: function (scope, element, attributes, controller) {
                scope.outerStyle = {};
                scope.innerStyle = {};

                if (ZenUtils.isDefined(scope.zenWidth) && ZenUtils.isPercentValue(scope.zenWidth)) {

                    scope.outerStyle.width = scope.zenWidth;

                    var percentValue = ZenUtils.getPercentValue(scope.zenWidth);
                    controller.columns.percent.push(percentValue);

                } else if (ZenUtils.isDefined(scope.zenWidth) && (ZenUtils.isPixelValue(scope.zenWidth) || ZenUtils.isRemValue(scope.zenWidth))) {

                    scope.innerStyle.width = scope.zenWidth;

                } else if (ZenUtils.isRatioValue(scope.zenWidth)) {

                    controller.columns.ratio.push({
                        fn: function (e) {
                            scope.outerStyle.width = e;
                        },
                        value: parseInt(scope.zenWidth)
                    });
                }

                if (ZenUtils.isDefined(scope.zenPadding)) {
                    scope.innerStyle.padding = scope.zenPadding;
                }
                if (ZenUtils.isDefined(scope.zenStyle)) {
                    ZenUtils.setSafeStyle(scope.zenStyle, scope.outerStyle);
                }
            },
            replace: true,
            require: "^zenHorizontalMenu",
            restrict: "E",
            scope: {
                zenPadding: "=",
                zenWidth: "=",
                zenStyle: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__horizontal_layout_column\" ng-style=\"outerStyle\">" +
            "<div ng-style=\"innerStyle\">" +
            "<div ng-transclude>" +
            "</div>" +
            "</div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenHorizontalMenuImage",              function (ZenUtils) {
        return {
            link: function (scope, element, attributes, controller) {
                scope.outerStyle = {};
                scope.innerStyle = {};

                if (ZenUtils.isDefined(scope.zenWidth) && ZenUtils.isPercentValue(scope.zenWidth)) {

                    scope.outerStyle.width = scope.zenWidth;

                    var percentValue = ZenUtils.getPercentValue(scope.zenWidth);
                    controller.columns.percent.push(percentValue);

                } else if (ZenUtils.isDefined(scope.zenWidth) && (ZenUtils.isPixelValue(scope.zenWidth) || ZenUtils.isRemValue(scope.zenWidth))) {

                    scope.innerStyle.width = scope.zenWidth;

                } else if (ZenUtils.isRatioValue(scope.zenWidth)) {

                    controller.columns.ratio.push({
                        fn: function (e) {
                            scope.outerStyle.width = e;
                        },
                        value: parseInt(scope.zenWidth)
                    });
                }

                if (ZenUtils.isDefined(scope.zenPadding)) {
                    scope.innerStyle.padding = scope.zenPadding;
                }
                if (ZenUtils.isDefined(scope.zenStyle)) {
                    ZenUtils.setSafeStyle(scope.zenStyle, scope.outerStyle);
                }
            },
            replace: true,
            require: "^zenHorizontalMenu",
            restrict: "E",
            scope: {
                zenPadding: "=",
                zenWidth: "=",
                zenStyle: "=",
                zenSrc: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__horizontal_layout_column zen_ui__horizontal_menu_image\" ng-style=\"outerStyle\">" +
            "<div ng-style=\"innerStyle\">" +
            "<div>" +
            "<div class=\"zen_ui__alignment\">" +
            "<div style=\"vertical-align: middle; text-align: center;\">" +
            "<img alt=\"\" ng-src=\"{{zenSrc}}\"/>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>",
            // @formatter:on
        };
    })
    .directive("zenHorizontalMenuLink",               function (ZenUtils) {
        return {
            link: function (scope, element, attributes, controller) {
                scope.outerStyle = {};
                scope.innerStyle = {};

                if (ZenUtils.isDefined(scope.zenWidth) && ZenUtils.isPercentValue(scope.zenWidth)) {

                    scope.outerStyle.width = scope.zenWidth;

                    var percentValue = ZenUtils.getPercentValue(scope.zenWidth);
                    controller.columns.percent.push(percentValue);

                } else if (ZenUtils.isDefined(scope.zenWidth) && (ZenUtils.isPixelValue(scope.zenWidth) || ZenUtils.isRemValue(scope.zenWidth))) {

                    scope.innerStyle.width = scope.zenWidth;

                } else if (ZenUtils.isRatioValue(scope.zenWidth)) {

                    controller.columns.ratio.push({
                        fn: function (e) {
                            scope.outerStyle.width = e;
                        },
                        value: parseInt(scope.zenWidth)
                    });
                }

                if (ZenUtils.isDefined(scope.zenPadding)) {
                    scope.innerStyle.padding = scope.zenPadding;
                }
                if (ZenUtils.isDefined(scope.zenStyle)) {
                    ZenUtils.setSafeStyle(scope.zenStyle, scope.outerStyle);
                }
            },
            replace: true,
            require: "^zenHorizontalMenu",
            restrict: "E",
            scope: {
                zenActive: "=",
                zenHref: "=",
                zenSref: "=",
                zenText: "=",
                zenPadding: "=",
                zenWidth: "=",
                zenStyle: "="
            },
            template: function(element, attributes) {
                // @formatter:off
                if (angular.isDefined(attributes.zenSref)) {
                    return ""+
                        "<div class=\"zen_ui__horizontal_layout_column\" ng-style=\"outerStyle\">" +
                        "<div ng-style=\"innerStyle\">" +
                        "<div>" +
                        "<div class=\"zen_ui__horizontal_menu__button_container\" ng-class=\"{ selected: zenActive===true }\">" +
                        "<a class=\"zen_ui__horizontal_menu__button\" ui-sref='{{zenSref}}'>" +
                        "<span>" +
                        "<span ng-bind=\"zenText\">" +

                        "</span>" +
                        "</span>" +
                        "</a>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                } else {
                    return ""+
                        "<div class=\"zen_ui__horizontal_layout_column\" ng-style=\"outerStyle\">" +
                        "<div ng-style=\"innerStyle\">" +
                        "<div>" +
                        "<div class=\"zen_ui__horizontal_menu__button_container\" ng-class=\"{ selected: zenActive===true }\">" +
                        "<a class=\"zen_ui__horizontal_menu__button\" ng-href='{{zenHref}}'>" +
                        "<span>" +
                        "<span ng-bind=\"zenText\">" +

                        "</span>" +
                        "</span>" +
                        "</a>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                }
                // @formatter:on
            }
        };
    })
    .directive("zenPath",                             function () {
        return {
            replace: true,
            restrict: "E",
            scope: true,
            template:
                // @formatter:off
                "<div class=\"zen_ui__path\">" +
                    "<div>" +
                        "<div ng-transclude></div>" +
                    "</div>" +
                "</div>",
                // @formatter:on
            transclude: true
        };
    })
    .directive("zenPathItem",                         function () {
        return {
            replace: true,
            require: "^zenPath",
            restrict: "E",
            scope: {
                zenHref: "=",
                zenSref: "=",
                zenText: "="
            },
            template: function(element, attributes) {
                // @formatter:off
                if (angular.isDefined(attributes.zenSref)) {
                    return "<span class=\"zen_ui__path_item\">" +
                        "<a class=\"link\" ng-bind=\"zenText\" ui-sref=\"{{zenSref}}\"></a>" +
                        "</span>";
                } else {
                    return "<span class=\"zen_ui__path_item\">" +
                        "<a class=\"link\" ng-bind=\"zenText\" ng-href=\"{{zenHref}}\"></a>" +
                        "</span>";
                }
                // @formatter:on
            },
            transclude: true
        };
    })
    // Panel
    .directive("zenLoadingMask",                      function (ZEN_UI) {
        return {
            link: function (scope) {
                scope.src = ZEN_UI.SYSTEM.LOADING_MASK_LOCATION;
            },
            replace: true,
            restrict: "E",
            template:
                // @formatter:off
                "<div class=\"zen_ui__loading_mask\">" +
                    "<div>" +
                        "<div>" +
                            "<span class=\"zen_ui__loading_mask__text\" ng-transclude></span>" +
                            "<div class=\"zen_ui__loading_mask__animation\">" +
                                "<img ng-src=\"{{src}}\" alt=\"\"/>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>",
                // @formatter:on
            transclude: true
        };
    })
    .directive("zenTree",                             function () {
        return {
            controller: function ($scope) {
                var me = this;
                me.separatorIsEnabled = function () {
                    return $scope.enableSeparator;
                };
            },
            link: {
                pre: function (scope, element, attributes) {
                    if (angular.isDefined(attributes.zenDivider) && scope.zenDivider!==false) {
                        scope.enableSeparator = true;
                    } else {
                        scope.enableSeparator = false;
                    }
                },
                post: function (scope,e,attributes) {
                    if (angular.isDefined(attributes.zenFirstColumnAlignment) && scope.zenFirstColumnAlignment!==false) {
                        scope.zenFca = true;
                    }
                }
            },
            replace: true,
            restrict: "E",
            scope: {
                zenDivider: "=",
                zenFirstColumnAlignment: "=",
                zenStretch: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__tree_container\" data-stretch=\"{{zenStretch===true}}\" data-first-column-alignment=\"{{zenFca}}\">" +
                "<div class=\"zen_ui__tree\" ng-transclude></div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenTreeBranch",                       function () {
        return {
            controller: function ($scope) {
                var me = this;
                me.getLevel = function () {
                    return $scope["myLevel"];
                };
                me.setLevel = function (value) {
                    $scope["myLevel"] = value;
                };
                me.setLevel(0);
            },
            link: {
                pre: function (scope) {
                    // NOP
                },
                post: function (scope,e,a,c) {
                    var result = scope["myLevel"]+1;
                    if (c[1] && result > c[1].getLevel()) {
                        c[1].setLevel(result);
                    }
                }
            },
            replace: true,
            require: ["^zenTree", "?^^zenTreeBranch"],
            restrict: "E",
            template: "<div class=\"zen_ui__tree_branch\" data-column-indent=\"{{myLevel}}\" ng-transclude></div>",
            transclude: true
        };
    })
    .directive("zenTreeBranchlet",                    function (ZenUtils) {
        return {
            controller: function () {
                var me = this;
                me.id = ZenUtils.generateId();
                me.getId = function () {
                    return me.id;
                };
            },
            controllerAs: "ctrl",
            replace: true,
            require: "^zenTreeBranch",
            scope: {
                zenAggregative: "=",
                zenOpen: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__tree_leaf\" data-aggregative=\"{{zenAggregative}}\">" +
            "<input type=\"checkbox\" class=\"zen_ui__checkbox_for_tree_branch\" id=\"{{ctrl.id}}\" ng-checked=\"zenOpen\"/>" +
            "<div ng-transclude></div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenTreeLeaf",                         function (ZenLogger, ZEN_MESSAGES) {
        return {
            controller: function () {
                var me = this;
                me.columns = {
                    percent: [],
                    ratio: []
                };
            },
            link: function (scope, element, attributes, controller) {

                scope.id = controller[1].getId();
                scope.separatorIsEnabled = controller[0].separatorIsEnabled();

                var name = "Horizontal layout";
                var percentage = {
                    initial: 0,
                    used: 0,
                    remaining: 100
                };
                var totalRatio = 0;
                var referenceUnit = null;

                if (controller[2].columns.percent.length > 0) {
                    percentage.initial = controller[2].columns.percent.reduce(function(sum, value) {
                        return sum + value;
                    }, 0);
                }
                if (controller[2].columns.ratio.length > 0) {
                    totalRatio = controller[2].columns.ratio.reduce(function(sum, value) {
                        return sum + value.value;
                    }, 0);
                }
                percentage.remaining -= percentage.initial;
                ZenLogger.trace(name, "percentage", percentage);

                if (percentage.initial > 100) {
                    ZenLogger.error(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.EXCESSIVE_WIDTH);

                } else if (percentage.initial >= 0 && percentage.initial < 100 && totalRatio === 0) {
                    ZenLogger.error(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.INSUFFICIENT_WIDTH);

                } else if (percentage.initial === 100 && totalRatio > 0) {
                    ZenLogger.error(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.NO_SPACE_FOR_RATIO);

                } else if (percentage.initial < 100 && totalRatio > 0) {
                    referenceUnit = Math.round((percentage.remaining / totalRatio) * 100) / 100;
                }
                if (referenceUnit) {
                    ZenLogger.trace(name, "reference unit:", referenceUnit+"%");
                }

                if (totalRatio > 0) {
                    var next;
                    controller[2].columns.ratio.forEach(function(e) {
                        next = Math.round(referenceUnit * e.value * 100) / 100;
                        ZenLogger.trace(name, "used", percentage.used, "+", "next", next, "=", (Math.round((percentage.used + next) * 100) / 100));
                        percentage.used = Math.round((percentage.used + next) * 100) / 100;
                        e.fn(next+"%");
                    });
                }
                if (percentage.initial !== 100) {
                    if (percentage.used !== percentage.remaining) {
                        ZenLogger.warn(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.TOTAL_WIDTH_LIMIT_EXCEEDED);
                    } else {
                        ZenLogger.trace(name, "accurate result");
                    }
                }

                scope.outerStyle = {
                    height: "100%"
                };
            },
            replace: true,
            require: ["^zenTree", "^zenTreeBranchlet", "zenTreeLeaf"],
            restrict: "E",
            scope: true,
            template:
            // @formatter:off
            "<div>" +
                "<div class=\"zen_ui__tree_branch_toggle\">" +
                    "<label class=\"zen_ui__tree_branch_toggle__triangle\" for=\"{{id}}\"></label>" +
                "</div>" +
                "<div class=\"zen_ui__tree_leaf_toggle\" ng-style=\"fca\"><div>" +
                    "<div class=\"zen_ui__horizontal_layout\" ng-style=\"outerStyle\" data-divider=\"{{separatorIsEnabled}}\" ng-transclude></div>" +
                "</div></div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenTreeLeafColumn",                   function (ZenUtils) {
        return {
            controller: function () {},
            link: function (scope, element, attributes, controller) {
                scope.outerStyle = {};
                scope.innerStyle = {};

                if (ZenUtils.isDefined(scope.zenWidth) && ZenUtils.isPercentValue(scope.zenWidth)) {

                    scope.outerStyle.width = scope.zenWidth;

                    var percentValue = ZenUtils.getPercentValue(scope.zenWidth);
                    controller.columns.percent.push(percentValue);

                } else if (ZenUtils.isDefined(scope.zenWidth) && (ZenUtils.isPixelValue(scope.zenWidth) || ZenUtils.isRemValue(scope.zenWidth))) {

                    scope.innerStyle.width = scope.zenWidth;

                } else if (ZenUtils.isRatioValue(scope.zenWidth)) {

                    controller.columns.ratio.push({
                        fn: function (e) {
                            scope.outerStyle.width = e;
                        },
                        value: parseInt(scope.zenWidth)
                    });
                }

                if (ZenUtils.isDefined(scope.zenPadding)) {
                    scope.innerStyle.padding = scope.zenPadding;
                }
                if (ZenUtils.isDefined(scope.zenStyle)) {
                    ZenUtils.setSafeStyle(scope.zenStyle, scope.outerStyle);
                }
            },
            replace: true,
            require: "^zenTreeLeaf",
            scope: {
                zenPadding: "=",
                zenWidth: "=",
                zenStyle: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__horizontal_layout_column\" ng-style=\"outerStyle\">" +
            "<div ng-style=\"innerStyle\">" +
            "<div ng-transclude>" +
            "</div>" +
            "</div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenTreeLinkButton",                   function () {
        return {
            replace: true,
            require: "^zenTreeLeafColumn",
            scope: {
                zenHref: "=",
                zenSref: "=",
                zenSelected: "=",
                zenText: "="
            },
            template: function(element, attributes) {
                // @formatter:off
                if (angular.isDefined(attributes.zenSref)) {
                    return ""+
                        "<a class=\"zen_ui__tree__tree_button\" ng-class=\"{ selected: zenSelected }\" data-stretch=\"true\" data-style=\"tree_button\" ui-sref=\"{{zenSref}}\">" +
                        "<span class=\"zen_ui__clipped_text\">" +
                        "<span ng-bind=\"zenText\"></span>" +
                        "</span>" +
                        "</a>";
                } else {
                    return ""+
                        "<a class=\"zen_ui__tree__tree_button\" ng-class=\"{ selected: zenSelected }\" data-stretch=\"true\" data-style=\"tree_button\" ng-href=\"{{zenHref}}\">" +
                        "<span class=\"zen_ui__clipped_text\">" +
                        "<span ng-bind=\"zenText\"></span>" +
                        "</span>" +
                        "</a>";
                }
                // @formatter:on
            }
        };
    })
    .directive("zenTreePushButton",                   function () {
        return {
            replace: true,
            require: "^zenTreeLeafColumn",
            scope: {
                zenSelected: "=",
                zenText: "="
            },
            template:
            // @formatter:off
            "<button class=\"zen_ui__tree__tree_button\" ng-class=\"{ selected: zenSelected }\" data-stretch=\"true\" data-style=\"tree_button\">" +
            "<span class=\"zen_ui__clipped_text\">" +
            "<span ng-bind=\"zenText\"></span>" +
            "</span>" +
            "</button>"
            // @formatter:on
        };
    })
    // Window
    .directive("zenModal",                            function () {
        return {
            controller: function () {},
            replace: true,
            restrict: "E",
            template:
            // @formatter:off
            "<div class=\"zen_ui__modal\">" +
                "<div>" +
                    "<div>" +
                        "<div ng-transclude></div>" +
                    "</div>" +
                "</div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenWindow",                           function (ZenLogger, ZEN_MESSAGES) {
        return {
            compile: function (element, attributes) {
                if (angular.isUndefined(attributes.zenStretch)) {
                    attributes.zenStretch = "::false";
                }
                if (angular.isDefined(attributes.zenStretch) && attributes.zenStretch==="") {
                    attributes.zenStretch="::true";
                }
                return {
                    pre: function (scope, element, attributes) {
                        var style = {};
                        if (angular.isDefined(scope.zenWidth)) {
                            style["width"] = scope.zenWidth;
                        }
                        if (angular.isDefined(scope.zenMinWidth)) {
                            style["min-width"] = scope.zenMinWidth;
                        }
                        if (angular.isDefined(scope.zenMaxWidth)) {
                            style["max-width"] = scope.zenMaxWidth;
                        }
                        scope.style = style;
                    },
                    post: function (scope) {
                        if (!scope.hasHead || !scope.hasBody) {
                            ZenLogger.error(ZEN_MESSAGES.WINDOW_MESSAGES.NO_CHILDREN);
                        }
                    }
                };
            },
            controller: function ($scope) {
                var me = this;
                me.getIsStretch = function () {
                    return $scope.zenStretch;
                };
                me.getPalette = function () {
                    return $scope.zenPalette;
                };
                me.setHasHead = function (e) {
                    $scope.hasHead = e;
                };
                me.setHasBody = function (e) {
                    $scope.hasBody = e;
                };
                me.setHasHead(false);
                me.setHasBody(false);
            },
            replace: true,
            restrict: "E",
            scope: {
                zenStretch: "=",
                zenPalette: "=",
                zenWidth: "=",
                zenMinWidth: "=",
                zenMaxWidth: "="
            },
            template: "<div class=\"zen_ui__window\" data-palette=\"{{zenPalette}}\" data-stretch=\"{{zenStretch===true}}\" ng-style=\"style\" ng-transclude></div>",
            transclude: true
        };
    })
    .directive("zenWindowBody",                       function () {
        return {
            link: function (scope, element, attributes, controller) {
                controller.setHasBody(true);
                var nonStretchPaddingDiv = {};
                var stretchPaddingDiv = {};
                if(angular.isDefined(scope.zenPadding)) {
                    if (controller.getIsStretch()===false) {
                        nonStretchPaddingDiv["padding"] = scope.zenPadding;
                    } else /*if (controller.getIsStretch()===true) */{
                        stretchPaddingDiv["margin"] = scope.zenPadding;
                    }
                }
                scope.nonStretchPaddingDiv = nonStretchPaddingDiv;
                scope.stretchPaddingDiv = stretchPaddingDiv;
            },
            replace: true,
            require: "^zenWindow",
            restrict: "E",
            scope: {
                zenPadding: "="
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__window_body\" ng-style=\"nonStretchPaddingDiv\">" +
                "<div ng-style=\"stretchPaddingDiv\" ng-transclude></div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenWindowHead",                       function () {
        return {
            controller: function ($scope) {
                var me = this;
                me.getPalette = function () {
                    return $scope.zenPalette;
                };
            },
            link: {
                pre: function (scope, element, attributes, controller) {
                    controller.setHasHead(true);
                    scope.zenPalette = controller.getPalette();
                },
                post: function () {}
            },
            replace: true,
            require: "^zenWindow",
            restrict: "E",
            template:
            // @formatter:off
            "<div class=\"zen_ui__window_head\">" +
                "<div class=\"zen_ui__stretch_margin\">" +
                    "<div class=\"zen_ui__horizontal_layout\" style=\"height: 100%\" ng-transclude></div>" +
                "</div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    })
    .directive("zenWindowHeadCloseButton",            function () {
        return {
            controller: function () {

            },
            link: function (scope, element, attributes, controller) {
                scope.zenPalette = controller.getPalette();
            },
            replace: true,
            require: "^zenWindowHead",
            restrict: "E",
            scope: {
                zenClick: "&"
            },
            template:
            // @formatter:off
            "<div class=\"zen_ui__horizontal_layout_column\">" +
                "<div style=\"width: 2.3rem; padding: 0.08rem 0.08rem 0.16rem 0.08rem;\">" +
                    "<div>" +
                        "<div class=\"zen_ui__button_container\" data-stretch=\"true\">" +
                            "<button class=\"zen_ui__button\" data-palette=\"{{zenPalette}}\" ng-click=\"zenClick()\">" +
                                "<span class=\"zen_ui__vector_icon__close\"></span>" +
                            "</button>" +
                            "<div></div>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</div>"
            // @formatter:on
        };
    })
    .directive("zenWindowHeadTitle",                  function () {
        return {
            replace: true,
            require: "^zenWindowHead",
            restrict: "E",
            template:
            // @formatter:off
            "<div class=\"zen_ui__horizontal_layout_column\" style=\"width: 100%\">" +
                "<div>" +
                    "<div>" +
                        "<span class=\"zen_ui__clipped_text\">" +
                            "<span style=\"padding: 0 0.7rem\" ng-transclude></span>" +
                        "</span>" +
                    "</div>" +
                "</div>" +
            "</div>",
            // @formatter:on
            transclude: true
        };
    });
