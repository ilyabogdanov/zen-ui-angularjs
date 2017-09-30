const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-link-button", function() {
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
            element = ""+
                "<zen-link-button zen-stretch zen-palette=\"::'"+ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY+"'\" zen-href=\"::'/'\">Href link</zen-link-button>" +
                "<zen-link-button zen-stretch zen-palette=\"::'"+ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY+"'\" zen-sref=\"::'___'\">Sref link</zen-link-button>" +
                "<zen-link-button zen-conjoined=\"::'first'\" zen-sref=\"::'___'\">First conjoined</zen-link-button>" +
                "<zen-link-button zen-conjoined zen-sref=\"::'___'\">Middle conjoined</zen-link-button>" +
                "<zen-link-button zen-conjoined=\"::'last'\" zen-sref=\"::'___'\">Last conjoined</zen-link-button>";
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        })
        expect(div.childNodes).toHaveLength(5);
    });
    describe("without palette", function () {
        it("should set default palette", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = ""+
                    "<zen-link-button zen-href=\"::'/'\">1</zen-link-button>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__button").attr("data-palette")).toEqual(ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY);
        });
    });
    describe("with empty attribute \"zen-disabled\"", function () {
        it("should set true", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = ""+
                    "<zen-link-button zen-disabled zen-palette=\"::'"+ZEN_UI.COMPONENTS.BUTTON.PALETTE.ORDINARY+"'\" zen-href=\"::'/'\">1</zen-link-button>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__button").hasClass("disabled")).toBeTruthy();
        });
    });
    describe("without attribute \"zen-stretch\"", function () {
        it("should set false", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                element = ""+
                    "<zen-link-button zen-href=\"::'/'\"></zen-link-button>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__button_container").attr("data-stretch")).toEqual("false");
        });
    });
});
