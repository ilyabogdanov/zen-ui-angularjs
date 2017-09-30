const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-vertical-layout", function() {
    let element, scope, ZEN_MESSAGES;

    beforeEach(angular.mock.module("ZenUI"));
    beforeEach(inject(function(_ZEN_UI_, _ZEN_MESSAGES_) {
        ZEN_MESSAGES = _ZEN_MESSAGES_;
    }));
    afterEach(function () {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });
    describe("with height greater than 100%", function () {
        it("should throw error", function () {
            expect(() => {
                inject(function($compile, $rootScope) {
                    scope = $rootScope.$new();
                    element = ""+
                        "<zen-vertical-layout>" +
                            "<zen-vertical-layout-row zen-height=\"::'101%'\"></zen-vertical-layout-row>" +
                        "</zen-vertical-layout>";
                    element = $compile(element)(scope);
                    scope.$digest();
                });
            }).toThrowError(ZEN_MESSAGES.VERTICAL_LAYOUT_MESSAGES.BAD_HEIGHT);
        });
    });
    describe("with multiple stretch rows", function () {
        it("should throw error", function () {
            expect(() => {
                inject(function($compile, $rootScope) {
                    scope = $rootScope.$new();
                    element = ""+
                        "<zen-vertical-layout>" +
                        "<zen-vertical-layout-row zen-height=\"::'100%'\"></zen-vertical-layout-row>" +
                        "<zen-vertical-layout-row zen-height=\"::'100%'\"></zen-vertical-layout-row>" +
                        "</zen-vertical-layout>";
                    element = $compile(element)(scope);
                    scope.$digest();
                });
            }).toThrowError(ZEN_MESSAGES.VERTICAL_LAYOUT_MESSAGES.MULTIPLE_STRETCH_ROWS);
        });
    });
    describe("with non-stretch row", function () {
        it("should render flexible layout", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = ""+
                    "<zen-vertical-layout>" +
                        "<zen-vertical-layout-row></zen-vertical-layout-row>" +
                    "</zen-vertical-layout>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__vertical_layout__non_stretch")).toHaveLength(1);
        });
    });
    describe("with stretch row", function () {
        it("should render stretch layout", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = ""+
                    "<zen-vertical-layout>" +
                    "<zen-vertical-layout-row zen-height=\"::'100%'\"></zen-vertical-layout-row>" +
                    "</zen-vertical-layout>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__vertical_layout__stretch")).toHaveLength(1);
        });
    });
    describe("with padding", function () {
        it("should set it depending on height", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = ""+
                    "<zen-vertical-layout>" +
                        "<zen-vertical-layout-row zen-height=\"::'100%'\" zen-padding=\"::'1px'\"></zen-vertical-layout-row>" +
                        "<zen-vertical-layout-row zen-height=\"::'100px'\" zen-padding=\"::'2px'\"></zen-vertical-layout-row>" +
                        "<zen-vertical-layout-row zen-padding=\"::'3px'\"></zen-vertical-layout-row>" +
                    "</zen-vertical-layout>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__vertical_layout_row__stretch")).toHaveLength(1);
            expect($(".zen_ui__vertical_layout_row__non_stretch")).toHaveLength(2);
            expect($(".zen_ui__vertical_layout_row__stretch .zen_ui__stretch_margin").css("margin")).toEqual("1px");
            expect($(".zen_ui__vertical_layout_row__non_stretch:nth-child(2) .zen_ui__stretch_margin").css("margin")).toEqual("2px");
            expect($(".zen_ui__vertical_layout_row__non_stretch:last-child > div").css("padding")).toEqual("3px");
        });
    });
    describe("with invalid padding", function () {
        it("should throw error", function () {
            expect(() => {
                inject(function($compile, $rootScope) {
                    scope = $rootScope.$new();
                    element = ""+
                        "<zen-vertical-layout>" +
                        "<zen-vertical-layout-row zen-padding=\"::'0px'\"></zen-vertical-layout-row>" +
                        "</zen-vertical-layout>";
                    element = $compile(element)(scope);
                    scope.$digest();
                });
            }).toThrowError(ZEN_MESSAGES.COMMON_MESSAGES.BAD_PADDING);
        });
    });
});
