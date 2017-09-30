const div = document.createElement("div");
document.body.appendChild(div);

describe("factory: ZenUtils", function() {
    let Utils, UTILS_MESSAGES;

    beforeEach(angular.mock.module("ZenUI"));
    beforeEach(inject(function(_ZenUtils_, _ZEN_MESSAGES_) {
        Utils = _ZenUtils_;
        UTILS_MESSAGES = _ZEN_MESSAGES_.UTILS_MESSAGES;
    }));

    it("should generate unique identifiers", () => {

        expect(Utils.generateId()).toEqual("zen-ui-id-1");
        expect(Utils.generateId()).toEqual("zen-ui-id-2");
        expect(Utils.generateId()).toEqual("zen-ui-id-3");
    });
    it("should accurately determine data types", () => {

        expect(Utils.isArray([])).toBeTruthy();
        [undefined, null,"",{},"[]"].forEach(e => {
            expect(Utils.isArray(e)).toBeFalsy();
        });

        expect(Utils.isDefined()).toBeFalsy();
        ["",0,{},[],null].forEach(e => {
            expect(Utils.isDefined(e)).toBeTruthy();
        });

        expect(Utils.isUndefined()).toBeTruthy();
        ["",0,{},[],null].forEach(e => {
            expect(Utils.isUndefined(e)).toBeFalsy();
        });
    });
    it("should perform correct validation of properties", () => {

        ["0", "1px", "0 1px", "1px 2px", "1px 2px 3px 4px", "0 0 0 0"].forEach(e => {
            expect(Utils.isValidPadding(e)).toBeTruthy();
        });
        [undefined, "", "0px", "0px 1px", "1px 2px 3px"].forEach(e => {
            expect(Utils.isValidPadding(e)).toBeFalsy();
        });

        ["0%", "0.00%", "1%", "1.23%", "100%", "999%", "100.000%"].forEach(e => {
            expect(Utils.isPercentValue(e)).toBeTruthy();
        });
        ["00%", 0, 100, "0.%", ".0%", "100 %"].forEach(e => {
            expect(Utils.isPercentValue(e)).toBeFalsy();
        });

        expect(Utils.isPixelValue("1px")).toBeTruthy();
        ["0", "0px", "", "1", "1 px", "01px"].forEach(e => {
            expect(Utils.isPixelValue(e)).toBeFalsy();
        });

        ["1rem", "1.23rem", "1.234567rem", "100rem", "0rem"].forEach(e => {
            expect(Utils.isRemValue(e)).toBeTruthy();
        });
        ["0", "", "1", "1 rem", "01rem"].forEach(e => {
            expect(Utils.isRemValue(e)).toBeFalsy();
        });

        [1, "1", "100"].forEach(e => {
            expect(Utils.isRatioValue(e)).toBeTruthy();
        });
        ["0", "0.00", "1.00", "1px"].forEach(e => {
            expect(Utils.isRatioValue(e)).toBeFalsy();
        });

        [0, "0"].forEach(e => {
            expect(Utils.isZero(e)).toBeTruthy();
        });
        [undefined, "", {}, [], null].forEach(e => {
            expect(Utils.isZero(e)).toBeFalsy();
        });
    });
    it("should perform correct extraction of numbers from strings, or return null with invalid input", () => {

        [["100.1%", 100.1], ["100.00%", 100], ["0.00%", 0],["100%", 100],["1.23%", 1.23],["1.2345%", 1.2345]].forEach(e => {
            expect(Utils.getPercentValue(e[0])).toEqual(e[1]);
        });
        expect(Utils.getPercentValue("100")).toBeNull();
    });
    it("should set only safe style, and throw error if style object was not provided", () => {

        expect(Utils.isSafeStyle("display")).toBeFalsy();
        expect(Utils.isSafeStyle("opacity")).toBeTruthy();

        let style = {};
        Utils.setSafeStyle(null, style);
        expect(style).toEqual({});
        Utils.setSafeStyle({}, style);
        expect(style).toEqual({});
        Utils.setSafeStyle([], style);
        expect(style).toEqual({});
        Utils.setSafeStyle("string", style);
        expect(style).toEqual({});
        Utils.setSafeStyle({ opacity: "0.62" }, style);
        expect(style).toEqual({ opacity: "0.62" });
        Utils.setSafeStyle({ width: "100px" }, style);
        expect(style).toEqual({ opacity: "0.62" });
        expect(() => {
            Utils.setSafeStyle({}, null);
        }).toThrowError(UTILS_MESSAGES.NO_STYLE_DEST);
    });
});
