const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-tree", function() {
    let element, scope, Logger, LEVEL, ZEN_MESSAGES;

    // noinspection JSCheckFunctionSignatures
    const warnSpy = jest.spyOn(console, "warn");

    beforeEach(angular.mock.module("ZenUI"));
    beforeEach(inject(function(_ZenLogger_, _ZEN_LOG_LEVEL_, _ZEN_MESSAGES_) {
        Logger = _ZenLogger_;
        LEVEL = _ZEN_LOG_LEVEL_;
        ZEN_MESSAGES = _ZEN_MESSAGES_;
        Logger.setLevel(LEVEL.WARN);
    }));
    afterEach(function () {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });

    it("should render", function () {
        inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            // @formatter:off
            element = ""+
                "<zen-tree>" +
                    "<zen-tree-branch>" +
                        "<zen-tree-branchlet zen-aggregative=\"::true\" zen-open=\"true\">" +
                            "<zen-tree-leaf>" +
                                "<zen-tree-leaf-column zen-width=\"::'50%'\">" +
                                    "<zen-tree-link-button zen-href=\"::'/'\" zen-selected=\"::false\" zen-text=\"::'Link button'\"></zen-tree-link-button>" +
                                "</zen-tree-leaf-column>" +
                                "<zen-tree-leaf-column zen-width=\"::1\">" +
                                    "<zen-tree-link-button zen-sref=\"::'___'\" zen-selected=\"::false\" zen-text=\"::'Link button'\"></zen-tree-link-button>" +
                                "</zen-tree-leaf-column>" +
                                "<zen-tree-leaf-column zen-width=\"::'100px'\">" +
                                    "<zen-tree-link-button zen-sref=\"::'___'\" zen-selected=\"::false\" zen-text=\"::'Link button'\"></zen-tree-link-button>" +
                                "</zen-tree-leaf-column>" +
                                "<zen-tree-leaf-column>" +
                                    "<zen-tree-link-button zen-sref=\"::'___'\" zen-selected=\"::false\" zen-text=\"::'Link button'\"></zen-tree-link-button>" +
                                "</zen-tree-leaf-column>" +
                            "</zen-tree-leaf>" +

                            "<zen-tree-branch>" +
                                "<zen-tree-branchlet zen-aggregative=\"::false\" zen-open=\"false\">" +
                                    "<zen-tree-leaf>" +
                                        "<zen-tree-leaf-column zen-width=\"1\">" +
                                            "<zen-tree-push-button zen-selected=\"::false\" zen-text=\"::'Push button'\"></zen-tree-push-button>" +
                                        "</zen-tree-leaf-column>" +
                                    "</zen-tree-leaf>" +
                                "</zen-tree-branchlet>" +
                            "</zen-tree-branch>" +
                        "</zen-tree-branchlet>" +
                    "</zen-tree-branch>" +
                "</zen-tree>";
            // @formatter:on
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        });
        expect(div.childNodes).toHaveLength(1);
    });
    it("should set divider", function () {
        inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            // @formatter:off
            element = ""+
                "<zen-tree zen-divider>" +
                "<zen-tree-branch>" +
                "<zen-tree-branchlet zen-aggregative=\"::false\" zen-open=\"false\">" +
                "<zen-tree-leaf>" +
                "<zen-tree-leaf-column zen-width=\"1\">" +

                "</zen-tree-leaf-column>" +
                "</zen-tree-leaf>" +
                "</zen-tree-branchlet>" +
                "<zen-tree-branchlet zen-aggregative=\"::false\" zen-open=\"false\">" +
                "<zen-tree-leaf>" +
                "<zen-tree-leaf-column zen-width=\"1\">" +

                "</zen-tree-leaf-column>" +
                "</zen-tree-leaf>" +
                "</zen-tree-branchlet>" +
                "</zen-tree-branch>" +
                "</zen-tree>";
            // @formatter:on
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        });
        expect(div.childNodes).toHaveLength(1);
        expect($(".zen_ui__horizontal_layout").attr("data-divider")).toEqual("true");
    });
    it("should set first column alignment", function () {
        inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            // @formatter:off
            element = ""+
                "<zen-tree zen-first-column-alignment>" +
                "<zen-tree-branch>" +
                "<zen-tree-branchlet zen-aggregative=\"::false\" zen-open=\"false\">" +
                "<zen-tree-leaf>" +
                "<zen-tree-leaf-column zen-width=\"1\">" +

                "</zen-tree-leaf-column>" +
                "</zen-tree-leaf>" +
                "</zen-tree-branchlet>" +
                "</zen-tree-branch>" +
                "</zen-tree>";
            // @formatter:on
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        });
        expect(div.childNodes).toHaveLength(1);
        expect($(".zen_ui__tree_container").attr("data-first-column-alignment")).toEqual("true");
    });
    it("should set column padding and style", function () {
        inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            // @formatter:off
            element = ""+
                "<zen-tree>" +
                "<zen-tree-branch>" +
                "<zen-tree-branchlet zen-aggregative=\"::false\" zen-open=\"false\">" +
                "<zen-tree-leaf>" +
                "<zen-tree-leaf-column zen-width=\"1\" zen-padding=\"::'1px'\" zen-style=\"{ opacity: '0.5' }\">" +

                "</zen-tree-leaf-column>" +
                "</zen-tree-leaf>" +
                "</zen-tree-branchlet>" +
                "</zen-tree-branch>" +
                "</zen-tree>";
            // @formatter:on
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        });
        expect(div.childNodes).toHaveLength(1);
        expect($(".zen_ui__horizontal_layout_column").css("opacity")).toEqual("0.5");
        expect($(".zen_ui__horizontal_layout_column > div").css("padding")).toEqual("1px");
    });
    describe("with initial percentage greater than 100%", function () {
        it("should throw error", function () {
            expect(() => {
                inject(function($compile, $rootScope) {
                    scope = $rootScope.$new();
                    // @formatter:off
                    element = ""+
                        "<zen-tree>" +
                        "<zen-tree-branch>" +
                        "<zen-tree-branchlet zen-aggregative=\"::false\" zen-open=\"false\">" +
                        "<zen-tree-leaf>" +
                        "<zen-tree-leaf-column zen-width=\"::'101%'\">" +

                        "</zen-tree-leaf-column>" +
                        "</zen-tree-leaf>" +
                        "</zen-tree-branchlet>" +
                        "</zen-tree-branch>" +
                        "</zen-tree>";
                    // @formatter:on
                    element = $compile(element)(scope);
                    scope.$digest();
                    angular.element(div).append(element);
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
                        "<zen-tree>" +
                        "<zen-tree-branch>" +
                        "<zen-tree-branchlet zen-aggregative=\"::false\" zen-open=\"false\">" +
                        "<zen-tree-leaf>" +
                        "<zen-tree-leaf-column zen-width=\"::'99%'\">" +

                        "</zen-tree-leaf-column>" +
                        "</zen-tree-leaf>" +
                        "</zen-tree-branchlet>" +
                        "</zen-tree-branch>" +
                        "</zen-tree>";
                    // @formatter:on
                    element = $compile(element)(scope);
                    scope.$digest();
                    angular.element(div).append(element);
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
                        "<zen-tree>" +
                        "<zen-tree-branch>" +
                        "<zen-tree-branchlet zen-aggregative=\"::false\" zen-open=\"false\">" +
                        "<zen-tree-leaf>" +
                        "<zen-tree-leaf-column zen-width=\"::'100%'\">" +

                        "</zen-tree-leaf-column>" +
                        "<zen-tree-leaf-column zen-width=\"::1\">" +

                        "</zen-tree-leaf-column>" +
                        "</zen-tree-leaf>" +
                        "</zen-tree-branchlet>" +
                        "</zen-tree-branch>" +
                        "</zen-tree>";
                    // @formatter:on
                    element = $compile(element)(scope);
                    scope.$digest();
                    angular.element(div).append(element);
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
                    "<zen-tree>" +
                    "<zen-tree-branch>" +
                    "<zen-tree-branchlet zen-aggregative=\"::false\" zen-open=\"false\">" +
                    "<zen-tree-leaf>" +
                    "<zen-tree-leaf-column zen-width=\"::'100%'\">" +

                    "</zen-tree-leaf-column>" +
                    "</zen-tree-leaf>" +
                    "</zen-tree-branchlet>" +
                    "</zen-tree-branch>" +
                    "</zen-tree>";
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
                    "<zen-tree>" +
                    "<zen-tree-branch>" +
                    "<zen-tree-branchlet zen-aggregative=\"::false\" zen-open=\"false\">" +
                    "<zen-tree-leaf>" +
                    "<zen-tree-leaf-column zen-width=\"::'50.59%'\">" +

                    "</zen-tree-leaf-column>" +
                    "<zen-tree-leaf-column zen-width=\"::1\">" +

                    "</zen-tree-leaf-column>" +
                    "<zen-tree-leaf-column zen-width=\"::21\">" +

                    "</zen-tree-leaf-column>" +
                    "<zen-tree-leaf-column zen-width=\"::78\">" +

                    "</zen-tree-leaf-column>" +
                    "</zen-tree-leaf>" +
                    "</zen-tree-branchlet>" +
                    "</zen-tree-branch>" +
                    "</zen-tree>";
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
});
