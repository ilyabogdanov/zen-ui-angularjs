const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-toggle-button", function() {
    let element, scope, ZEN_UI;

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
            scope.model1 = false;
            scope.model2 = false;
            scope.model3 = false;
            scope.model4 = false;
            element = ""+
                "<zen-toggle-button zen-stretch zen-model=\"model1\" zen-palette=\"::'"+ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY+"'\">1</zen-toggle-button>" +
                "<zen-toggle-button zen-conjoined=\"::'first'\" zen-model=\"model2\">2</zen-toggle-button>" +
                "<zen-toggle-button zen-conjoined zen-model=\"model3\">3</zen-toggle-button>" +
                "<zen-toggle-button zen-conjoined=\"::'last'\" zen-model=\"model3\">3</zen-toggle-button>";
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        })
        expect(div.childNodes).toHaveLength(4);
    });
    describe("with empty attribute \"zen-disabled\"", function () {
        it("should set true", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.model = false;
                element = ""+
                    "<zen-toggle-button zen-disabled zen-model=\"model\"></zen-toggle-button>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__button").hasClass("disabled")).toBeTruthy();
            expect($(".zen_ui__toggle_button_input").prop("disabled")).toBeTruthy();
        });
    });
    describe("without attribute \"zen-stretch\"", function () {
        it("should set false", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.model = false;
                element = ""+
                    "<zen-toggle-button zen-model=\"model\"></zen-toggle-button>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__button_container").attr("data-stretch")).toEqual("false");
        });
    });
});
