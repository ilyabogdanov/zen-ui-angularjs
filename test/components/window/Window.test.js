const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-window", function() {
    let element, scope, ZEN_UI, ZEN_MESSAGES;
    beforeEach(angular.mock.module("ZenUI"));
    beforeEach(inject(function(_ZEN_UI_, _ZEN_MESSAGES_) {
        ZEN_UI = _ZEN_UI_;
        ZEN_MESSAGES = _ZEN_MESSAGES_;
    }));
    afterEach(function () {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });

    describe("without children", function () {
        it("should throw error", function () {
            expect(ZEN_MESSAGES).toBeDefined();
            expect(() => {
                inject(function($compile, $rootScope) {
                    scope = $rootScope.$new();
                    element = "<zen-window></zen-window>";
                    element = $compile(element)(scope);
                    scope.$digest();
                    angular.element(div).append(element);
                });
            }).toThrowError(ZEN_MESSAGES.WINDOW_MESSAGES.NO_CHILDREN);
            expect(() => {
                inject(function($compile, $rootScope) {
                    scope = $rootScope.$new();
                    element = "<zen-window><zen-window-head></zen-window-head></zen-window>";
                    element = $compile(element)(scope);
                    scope.$digest();
                    angular.element(div).append(element);
                });
            }).toThrowError(ZEN_MESSAGES.WINDOW_MESSAGES.NO_CHILDREN);
            expect(() => {
                inject(function($compile, $rootScope) {
                    scope = $rootScope.$new();
                    element = "<zen-window><zen-window-body></zen-window-body></zen-window>";
                    element = $compile(element)(scope);
                    scope.$digest();
                    angular.element(div).append(element);
                });
            }).toThrowError(ZEN_MESSAGES.WINDOW_MESSAGES.NO_CHILDREN);
        });
    });
    describe("with palette, width, min-width and max-width", function () {
        it("should set properties to itself and close button", function () {

            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                // @formatter:off
                element = ""+
                    "<zen-window zen-palette=\"::'"+ZEN_UI.COMPONENTS.WINDOW.PALETTE.ORDINARY+"'\" zen-width=\"::'100%'\" zen-min-width=\"::'9rem'\" zen-max-width=\"::'11rem'\">" +
                    "<zen-window-head>" +
                    "<zen-window-head-title>Title</zen-window-head-title>" +
                    "<zen-window-head-close-button></zen-window-head-close-button>" +
                    "</zen-window-head>" +
                    "<zen-window-body></zen-window-body>" +
                    "</zen-window>";
                // @formatter:on
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);

            expect($(".zen_ui__window").attr("data-palette")).toEqual(ZEN_UI.COMPONENTS.WINDOW.PALETTE.ORDINARY);
            expect($(".zen_ui__window").css("width")).toEqual("100%");
            expect($(".zen_ui__window").css("min-width")).toEqual("9rem");
            expect($(".zen_ui__window").css("max-width")).toEqual("11rem");
            expect($(".zen_ui__button").attr("data-palette")).toEqual(ZEN_UI.COMPONENTS.WINDOW.PALETTE.ORDINARY);
        });
    });
    describe("with empty attribute \"zen-stretch\"", function () {
        it("should set it true", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                // @formatter:off
                element = ""+
                    "<zen-window zen-palette=\"::'"+ZEN_UI.COMPONENTS.WINDOW.PALETTE.ORDINARY+"'\" zen-stretch>" +
                    "<zen-window-head></zen-window-head>" +
                    "<zen-window-body></zen-window-body>" +
                    "</zen-window>";
                // @formatter:on
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);

            expect($(".zen_ui__window").attr("data-stretch")).toEqual("true");
        });
    });
    describe("without attribute \"zen-stretch\"", function () {
        it("should set it false", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                // @formatter:off
                element = ""+
                    "<zen-window zen-palette=\"::'"+ZEN_UI.COMPONENTS.WINDOW.PALETTE.ORDINARY+"'\">" +
                    "<zen-window-head></zen-window-head>" +
                    "<zen-window-body></zen-window-body>" +
                    "</zen-window>";
                // @formatter:on
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);

            expect($(".zen_ui__window").attr("data-stretch")).toEqual("false");
        });
    });
    /**
     * Notice: could not test padding with "rem" units. Probably jQuery bug.
     */
    describe("with body padding and negative attribute \"zen-stretch\"", function () {
        it("should set padding on inner div", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                // @formatter:off
                element = ""+
                    "<zen-window zen-palette=\"::'"+ZEN_UI.COMPONENTS.WINDOW.PALETTE.ORDINARY+"'\" zen-stretch=\"::false\">" +
                        "<zen-window-head></zen-window-head>" +
                        "<zen-window-body zen-padding=\"::'1px'\"></zen-window-body>" +
                    "</zen-window>";
                // @formatter:on
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);

            expect($(".zen_ui__window_body").css("padding")).toEqual("1px");
        });
    });
    describe("with body padding and positive attribute \"zen-stretch\"", function () {
        it("should set margin on outer div", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                // @formatter:off
                element = ""+
                    "<zen-window zen-palette=\"::'"+ZEN_UI.COMPONENTS.WINDOW.PALETTE.ORDINARY+"'\" zen-stretch=\"::true\">" +
                        "<zen-window-head></zen-window-head>" +
                        "<zen-window-body zen-padding=\"::'1px'\"></zen-window-body>" +
                    "</zen-window>";
                // @formatter:on
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);

            expect($(".zen_ui__window_body > div").css("margin")).toEqual("1px");
        });
    });
});