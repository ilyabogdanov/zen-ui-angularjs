const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-toggle-group", function() {
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
                "<zen-toggle-group>" +
                    "<zen-toggle-radio ng-repeat=\"x in [1,2,3,4]\" zen-model=\"model\" zen-value=\"::x\">{{::x}}</zen-toggle-radio>" +
                "</zen-toggle-group>";
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        })
        expect(div.childNodes).toHaveLength(1);
        expect(div.firstChild).toMatchSnapshot();
    });
    it("should render conjoined buttons", function () {
        inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            scope.model = null;
            element = ""+
                "<zen-toggle-group zen-conjoined>" +
                "<zen-toggle-radio ng-repeat=\"x in [1,2,3,4]\" zen-model=\"model\" zen-value=\"::x\">{{::x}}</zen-toggle-radio>" +
                "</zen-toggle-group>";
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        })
        expect(div.childNodes).toHaveLength(1);
        expect(div.firstChild).toMatchSnapshot();
    });
});
