const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-push-button", function() {
    let element, scope, ZEN_UI;
    // noinspection JSCheckFunctionSignatures
    const logSpy = jest.spyOn(console, "log");

    beforeEach(angular.mock.module("ZenUI"));
    beforeEach(inject(function(_ZEN_UI_) {
        ZEN_UI = _ZEN_UI_;
    }));
    afterEach(function () {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });

    it("should render", function () {
        inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            element = ""+
                "<zen-push-button zen-stretch zen-palette=\"::'"+ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY+"'\">Normal</zen-push-button>" +
                "<zen-push-button zen-conjoined=\"::'first'\">First conjoined</zen-push-button>" +
                "<zen-push-button zen-conjoined>Middle conjoined</zen-push-button>" +
                "<zen-push-button zen-conjoined=\"::'last'\">Last conjoined</zen-push-button>";
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        })
        expect(div.childNodes).toHaveLength(4);
    });
    describe("without palette", function () {
        it("should set default palette", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = ""+
                    "<zen-push-button></zen-push-button>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__button").attr("data-palette")).toEqual(ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY);
        });
    });
    describe("with empty attribute \"zen-disabled\"", function () {
        it("should set true", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = ""+
                    "<zen-push-button zen-disabled zen-palette=\"::'"+ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY+"'\"></zen-push-button>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__button").prop("disabled")).toBeTruthy();
        });
    });
    describe("on click", function () {
        it("should execute callback", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.onClick = function(e) {
                    console.log(e);
                };
                element = ""+
                    "<zen-push-button zen-click=\"onClick(123)\"></zen-push-button>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            $(".zen_ui__button").click();
            expect(logSpy).toHaveBeenCalledTimes(1);
            expect(logSpy).toHaveBeenCalledWith(123);
            logSpy.mockReset();
        });
    });
    describe("without attribute \"zen-stretch\"", function () {
        it("should set false", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = ""+
                    "<zen-push-button></zen-push-button>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__button_container").attr("data-stretch")).toEqual("false");
        });
    });
});
