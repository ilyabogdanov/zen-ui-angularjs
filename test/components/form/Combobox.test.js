const div = document.createElement("div");
document.body.appendChild(div);

describe("directive: zen-combobox", function() {
    let element, scope;
    let items = [{
        id: null,
        name: ""
    }, {
        id: 2,
        name: "el 2"
    }, {
        id: 22,
        name: "el 22"
    }, {
        id: 222,
        name: "el 222"
    }, {
        id: 2222,
        name: "el 2222"
    }];
    // noinspection JSCheckFunctionSignatures
    const logSpy = jest.spyOn(console, "log");

    beforeEach(angular.mock.module("ZenUI"));
    afterEach(function () {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });

    it("should render", function () {
        inject(function($compile, $rootScope) {
            scope = $rootScope.$new();
            scope.activeItem = 2;
            scope.items = items;
            element = ""+
                "<zen-combobox zen-stretch=\"::false\" zen-disabled=\"::false\" zen-items=\"items\" zen-active-item=\"activeItem\" zen-text-parameter=\"::'name'\" zen-value-parameter=\"::'id'\"></zen-combobox>";
            element = $compile(element)(scope);
            scope.$digest();
            angular.element(div).append(element);
        })
        expect(div.childNodes).toHaveLength(1);
        expect($(".zen_ui__combobox__container")).toHaveLength(1);
    });
    describe("without attribute \"zen-disabled\"", function () {
        it("should set false", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.activeItem = 2;
                scope.items = items;
                element = ""+
                    "<zen-combobox zen-stretch=\"::false\" zen-items=\"items\" zen-active-item=\"activeItem\" zen-text-parameter=\"::'name'\" zen-value-parameter=\"::'id'\"></zen-combobox>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__button_checkbox").prop("disabled")).toBeFalsy();
        })
    });
    describe("with attribute \"zen-disabled\"", function () {
        it("should set true", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.activeItem = 2;
                scope.items = items;
                element = ""+
                    "<zen-combobox zen-stretch=\"::false\" zen-disabled=\"::true\" zen-items=\"items\" zen-active-item=\"activeItem\" zen-text-parameter=\"::'name'\" zen-value-parameter=\"::'id'\"></zen-combobox>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__button_checkbox").prop("disabled")).toBeTruthy();
        })
    });
    describe("on combo option select", function () {
        it("should change active item", function () {
            inject(function($compile, $rootScope) {
                scope = $rootScope.$new();
                scope.activeItem = 2;
                scope.items = items;
                element = ""+
                    "<zen-combobox zen-stretch=\"::false\" zen-disabled=\"::false\" zen-items=\"items\" zen-active-item=\"activeItem\" zen-text-parameter=\"::'name'\" zen-value-parameter=\"::'id'\"></zen-combobox>";
                element = $compile(element)(scope);
                scope.$digest();
                angular.element(div).append(element);
            })
            expect(div.childNodes).toHaveLength(1);
            expect($(".zen_ui__button_checkbox").attr("disabled")).toBeFalsy();
            expect($(".zen_ui__button_checkbox").prop("checked")).toBeFalsy();
            $(".zen_ui__button").click();
            expect($(".zen_ui__button_checkbox").prop("checked")).toBeTruthy();
            $(".zen_ui__checkbox_for_combobox_option[value='2']+label").click();
            expect($(".zen_ui__button_checkbox").prop("checked")).toBeFalsy();
            expect($(".zen_ui__button_text > span").text()).toEqual("el 2");
            logSpy.mockReset();
        })
    });
});
