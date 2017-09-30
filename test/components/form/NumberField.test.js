const div = document.createElement("div");
document.body.appendChild(div);

var triggerKeyDown = function (element, keyCode) {
    var e = $.Event("keydown");
    e.which = keyCode;
    element.trigger(e);
};

describe("directive: zen-number-field", function() {
    let element, scope;

    beforeEach(angular.mock.module("ZenUI"));
    afterEach(function () {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });

    it("should render", function () {
        inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            scope.model = null;
            element = "<zen-number-field zen-error=\"::false\" zen-model=\"model\" zen-stretch=\"::false\"></zen-number-field>";
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        })
        expect(div.childNodes).toHaveLength(1);
    });
    describe("with empty attribute \"zen-stretch\"", function () {
        it("should set true", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.model = null;
                element = "<zen-number-field zen-stretch zen-model=\"model\"></zen-number-field>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__number_field__container").attr("data-stretch")).toEqual("true");
        });
    });
    describe("without attribute \"zen-stretch\"", function () {
        it("should set false", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.model = null;
                element = "<zen-number-field zen-model=\"model\"></zen-number-field>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__number_field__container").attr("data-stretch")).toEqual("false");
        });
    });
    describe("on click plus/minus", function () {
        it("should increase/decrease value", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.model = null;
                element = "<zen-number-field zen-model=\"model\"></zen-number-field>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);
            $(".zen_ui__number_field__button__increase_number").click();
            expect($("input").val()).toEqual("0");
            $(".zen_ui__number_field__button__increase_number").click();
            expect($("input").val()).toEqual("1");
            $(".zen_ui__number_field__button__increase_number").click();
            expect($("input").val()).toEqual("2");
            $(".zen_ui__number_field__button__decrease_number").click();
            expect($("input").val()).toEqual("1");
            $(".zen_ui__number_field__button__decrease_number").click();
            expect($("input").val()).toEqual("0");
        });
    });
    describe("with disabled field on click plus/minus", function () {
        it("should do nothing", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.model = null;
                element = "<zen-number-field zen-disabled=\"::true\" zen-model=\"model\"></zen-number-field>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);
            $(".zen_ui__number_field__button__increase_number").click();
            expect($("input").val()).toEqual("");
            $(".zen_ui__number_field__button__decrease_number").click();
            expect($("input").val()).toEqual("");
        });
    });
    describe("with null value on click minus", function () {
        it("should set zero", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.model = null;
                element = "<zen-number-field zen-model=\"model\"></zen-number-field>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);
            $(".zen_ui__number_field__button__decrease_number").click();
            expect($("input").val()).toEqual("0");
        });
    });

    // TODO: make number-field test of letter input
});
