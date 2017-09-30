const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-toggle-radio", function() {
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
            scope.model = null;
            element = ""+
                "<zen-toggle-group>" +
                    "<zen-toggle-radio zen-disabled zen-model=\"model\" zen-value=\"::1\">{{::1}}</zen-toggle-radio>" +
                    "<zen-toggle-radio zen-stretch zen-model=\"model\" zen-value=\"::2\">{{::2}}</zen-toggle-radio>" +
                    "<zen-toggle-radio zen-palette=\"::'"+ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY+"'\" zen-model=\"model\" zen-value=\"::3\">{{::3}}</zen-toggle-radio>" +
                    "<zen-toggle-radio zen-conjoined=\"::'first'\" zen-model=\"model\" zen-value=\"::4\">{{::4}}</zen-toggle-radio>" +
                    "<zen-toggle-radio zen-conjoined zen-model=\"model\" zen-value=\"::5\">{{::5}}</zen-toggle-radio>" +
                    "<zen-toggle-radio zen-conjoined=\"::'last'\" zen-model=\"model\" zen-value=\"::6\">{{::6}}</zen-toggle-radio>" +
                "</zen-toggle-group>";
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        })
        expect(div.childNodes).toHaveLength(1);
    });
});
