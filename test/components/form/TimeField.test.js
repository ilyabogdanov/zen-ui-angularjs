const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-time-field", function() {
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
            scope.model = new Date(1970,0,1,0,0,0);
            element = "<zen-time-field zen-model=\"model\"></zen-time-field>";
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        })
        expect(div.childNodes).toHaveLength(1);
    });

    // TODO: make time-field tests
});
