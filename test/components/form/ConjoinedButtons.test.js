const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-conjoined-buttons", function() {
    let element, scope;
    beforeEach(angular.mock.module("ZenUI"));
    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope.$new();
        element = ""+
            "<zen-conjoined-buttons>" +
            "<zen-link-button zen-href=\"::'___'\"></zen-link-button>" +
            "<zen-link-button zen-href=\"::'___'\"></zen-link-button>" +
            "<zen-link-button zen-href=\"::'___'\"></zen-link-button>" +
            "</zen-conjoined-buttons>";
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
