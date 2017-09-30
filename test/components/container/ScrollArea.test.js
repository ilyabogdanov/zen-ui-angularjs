const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-scroll-area", function() {
    let element, scope;
    beforeEach(angular.mock.module("ZenUI"));
    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope.$new();
        element = "<zen-scroll-area></zen-scroll-area>";
        element = $compile(element)(scope);
        scope.$digest();
        angular.element(div).append(element);
    }));
    afterEach(function () {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });

    it("should render", function () {
        expect(div.childNodes).toHaveLength(1);
        expect(div.firstChild).toMatchSnapshot();
    });
});
