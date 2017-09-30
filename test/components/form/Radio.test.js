const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-radio", function() {
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
            element = ""+
                "<zen-radio-group>" +
                    "<zen-radio zen-model=\"model\" zen-value=\"::1\">{{::1}}</zen-radio>" +
                    "<zen-radio zen-model=\"model\" zen-value=\"::2\">{{::2}}</zen-radio>" +
                "</zen-radio-group>";
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        });
        expect(div.childNodes).toHaveLength(1);
    });
    describe("width readonly", function () {
        it("should also set disabled", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.model = null;
                element = ""+
                    "<zen-radio-group>" +
                    "<zen-radio zen-readonly zen-model=\"model\" zen-value=\"::1\">{{::1}}</zen-radio>" +
                    "<zen-radio zen-readonly zen-model=\"model\" zen-value=\"::2\">{{::2}}</zen-radio>" +
                    "</zen-radio-group>";
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
