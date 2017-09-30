const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-checkbox", function() {
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
            scope.checkbox = false;
            element = "<zen-checkbox zen-model=\"checkbox\" zen-text=\"::''\"></zen-checkbox>";
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        });
        expect(div.childNodes).toHaveLength(1);
        expect($(".zen_ui__checkbox")).toHaveLength(1);
        expect($(".zen_ui__checkbox_input").prop("disabled")).toBeFalsy();
    });
    describe("width readonly", function () {
        it("should also set disabled", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.checkbox = false;
                element = "<zen-checkbox zen-readonly zen-disabled=\"::false\" zen-model=\"checkbox\" zen-text=\"::''\"></zen-checkbox>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__checkbox_input").attr("data-readable-only")).toEqual("true");
            expect($(".zen_ui__checkbox_input").prop("disabled")).toBeTruthy();
        });
    });
});
