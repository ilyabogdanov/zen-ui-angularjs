const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-text-field", function() {
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
            element = "<zen-text-field zen-error=\"::false\" zen-model=\"model\" zen-stretch=\"::false\"></zen-text-field>";
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
                element = "<zen-text-field zen-stretch zen-model=\"model\"></zen-text-field>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__textfield__container").attr("data-stretch")).toEqual("true");
        });
    });
    describe("without attribute \"zen-stretch\"", function () {
        it("should set false", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.model = null;
                element = "<zen-text-field zen-model=\"model\"></zen-text-field>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__textfield__container").attr("data-stretch")).toEqual("false");
        });
    });
});
