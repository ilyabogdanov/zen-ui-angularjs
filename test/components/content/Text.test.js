const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-text", function() {
    let element, scope;

    beforeEach(function () {
        angular.mock.module("ZenUI");
    });
    afterEach(function () {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });

    describe("with a given text", function() {
        it("should render it", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = "<zen-text>lorem ipsum</zen-text>";
                element = $compile(element)(scope);
                scope.$digest();
            });
            expect(div.childNodes).toHaveLength(0);
            expect(element.text()).toEqual("lorem ipsum");
        });
    });

    describe("with attribute \"zen-clipped\"", function() {
        it("should render clipped text", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = "<zen-text zen-clipped>lorem ipsum</zen-text>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__clipped_text")).toHaveLength(1);
        });
    });

    describe("with style, padding and alignment", function() {
        it("should set all properties", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = "<zen-text zen-style=\"{ opacity: '0.2' }\" zen-padding=\"::'1px'\" x=\"::'right'\" y=\"::'bottom'\">lorem ipsum</zen-text>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            });
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__text > div").css("opacity")).toEqual("0.2");
            expect($(".zen_ui__text > div").css("padding")).toEqual("1px");
            expect($(".zen_ui__text > div").css("text-align")).toEqual("right");
            expect($(".zen_ui__text > div").css("vertical-align")).toEqual("bottom");
        });
    });
});
