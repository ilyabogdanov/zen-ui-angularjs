const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-horizontal-layout", function() {
    let element, scope, ZEN_MESSAGES;

    // noinspection JSCheckFunctionSignatures
    const warnSpy = jest.spyOn(console, "warn");

    beforeEach(angular.mock.module("ZenUI"));
    beforeEach(inject(function(_ZEN_UI_, _ZEN_MESSAGES_) {
        ZEN_MESSAGES = _ZEN_MESSAGES_;
    }));
    afterEach(function () {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });
    describe("without children", function () {
        it("should throw error", function () {
            expect(() => {
                inject(function($compile, $rootScope) {
                    scope = $rootScope.$new();
                    element = "<zen-horizontal-layout></zen-horizontal-layout>";
                    element = $compile(element)(scope);
                    scope.$digest();
                });
            }).toThrowError(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.INSUFFICIENT_WIDTH);
        });
    });
    describe("with initial percentage greater than 100%", function () {
        it("should throw error", function () {
            expect(() => {
                inject(function($compile, $rootScope) {
                    scope = $rootScope.$new();
                    // @formatter:off
                    element = ""+
                        "<zen-horizontal-layout>" +
                        "<zen-horizontal-layout-column zen-width=\"::'101%'\"></zen-horizontal-layout-column>" +
                        "</zen-horizontal-layout>";
                    // @formatter:on
                    element = $compile(element)(scope);
                    scope.$digest();
                });
            }).toThrowError(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.EXCESSIVE_WIDTH);
        });
    });
    describe("with initial percentage less than 100%, and without ratio columns", function () {
        it("should throw error", function () {
            expect(() => {
                inject(function($compile, $rootScope) {
                    scope = $rootScope.$new();
                    // @formatter:off
                    element = ""+
                        "<zen-horizontal-layout>" +
                        "<zen-horizontal-layout-column zen-width=\"::'99%'\"></zen-horizontal-layout-column>" +
                        "</zen-horizontal-layout>";
                    // @formatter:on
                    element = $compile(element)(scope);
                    scope.$digest();
                });
            }).toThrowError(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.INSUFFICIENT_WIDTH);
        });
    });
    describe("with initial percentage equal 100%, and with ratio columns", function () {
        it("should throw error", function () {
            expect(() => {
                inject(function($compile, $rootScope) {
                    scope = $rootScope.$new();
                    // @formatter:off
                    element = ""+
                        "<zen-horizontal-layout>" +
                        "<zen-horizontal-layout-column zen-width=\"::'100%'\"></zen-horizontal-layout-column>" +
                        "<zen-horizontal-layout-column zen-width=\"::1\"></zen-horizontal-layout-column>" +
                        "</zen-horizontal-layout>";
                    // @formatter:on
                    element = $compile(element)(scope);
                    scope.$digest();
                });
            }).toThrowError(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.NO_SPACE_FOR_RATIO);
        });
    });
    describe("with initial percentage equal 100%", function () {
        it("should just render", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                // @formatter:off
                element = ""+
                    "<zen-horizontal-layout>" +
                    "<zen-horizontal-layout-column zen-width=\"::'100%'\"></zen-horizontal-layout-column>" +
                    "</zen-horizontal-layout>";
                // @formatter:on
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);
        });
    });
    describe("with not accurate width", function () {
        it("should warn", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                // @formatter:off
                element = ""+
                    "<zen-horizontal-layout>" +
                    "<zen-horizontal-layout-column zen-width=\"::'50.59%'\"></zen-horizontal-layout-column>" +
                    "<zen-horizontal-layout-column zen-width=\"::1\"></zen-horizontal-layout-column>" +
                    "<zen-horizontal-layout-column zen-width=\"::21\"></zen-horizontal-layout-column>" +
                    "<zen-horizontal-layout-column zen-width=\"::78\"></zen-horizontal-layout-column>" +
                    "</zen-horizontal-layout>";
                // @formatter:on
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(warnSpy).toHaveBeenCalledTimes(1);
            expect(warnSpy).toHaveBeenCalledWith(ZEN_MESSAGES.HORIZONTAL_LAYOUT_MESSAGES.TOTAL_WIDTH_LIMIT_EXCEEDED);
            warnSpy.mockReset();
        });
    });
    describe("with accurate width", function () {
        it("should render", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                // @formatter:off
                element = ""+
                    "<zen-horizontal-layout zen-height=\"::'100%'\">" +
                    "<zen-horizontal-layout-column zen-width=\"::'90%'\"></zen-horizontal-layout-column>" +
                    "<zen-horizontal-layout-column zen-width=\"::5\"></zen-horizontal-layout-column>" +
                    "<zen-horizontal-layout-column zen-width=\"::5\"></zen-horizontal-layout-column>" +
                    "</zen-horizontal-layout>";
                // @formatter:on
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.firstChild).toMatchSnapshot();
        });
    });
    it("should set column properties", function () {
        inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            // @formatter:off
            element = ""+
                "<zen-horizontal-layout zen-height=\"::'100%'\">" +
                "<zen-horizontal-layout-column zen-width=\"::'100%'\"></zen-horizontal-layout-column>" +
                "<zen-horizontal-layout-column zen-width=\"::'5rem'\"></zen-horizontal-layout-column>" +
                "<zen-horizontal-layout-column></zen-horizontal-layout-column>" +
                "<zen-horizontal-layout-column zen-padding=\"::'6px'\" zen-width=\"::'5px'\" zen-style=\"{ background: '#000000' }\"></zen-horizontal-layout-column>" +
                "</zen-horizontal-layout>";
            // @formatter:on
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        });
        expect($(".zen_ui__horizontal_layout_column:last-child > div").css("width")).toEqual("5px");
        expect($(".zen_ui__horizontal_layout_column:last-child > div").css("padding")).toEqual("6px");
        expect($(".zen_ui__horizontal_layout_column:last-child").css("background")).toEqual("rgb(0, 0, 0)");
    });
});
