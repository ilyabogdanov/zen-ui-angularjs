const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-path", function() {
    let element, scope;
    beforeEach(angular.mock.module("ZenUI"));
    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope.$new();
        element = ""+
            "<zen-path>" +
            "<zen-path-item zen-href=\"::'/'\"></zen-path-item>" +
            "<zen-path-item zen-sref=\"::'___'\"></zen-path-item>" +
            "</zen-path>";
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
