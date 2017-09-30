const div = document.createElement("div");
document.body.appendChild(div);

describe("factory: ZenLogger", function() {
    let Logger, LEVEL;

    // noinspection JSCheckFunctionSignatures
    const logSpy = jest.spyOn(console, "log");
    // noinspection JSCheckFunctionSignatures
    const warnSpy = jest.spyOn(console, "warn");

    beforeEach(angular.mock.module("ZenUI"));
    beforeEach(inject(function(_ZenLogger_, _ZEN_LOG_LEVEL_) {
        Logger = _ZenLogger_;
        LEVEL = _ZEN_LOG_LEVEL_;
    }));

    describe("with any level", function () {
        it("should throw error", function () {
            Logger.setLevel(LEVEL.OFF);
            expect(() => {
                Logger.error("123");
            }).toThrowError(/123/);
        });
    });
    describe("with non-lethal message", function () {
        it("should output only messages with the level equal to or more important than the current one", function () {

            Logger.setLevel(LEVEL.TRACE);
            Logger.trace("log 1");
            Logger.debug("log 2");
            Logger.info("warn 1");
            Logger.warn("warn 2");
            expect(logSpy).toHaveBeenCalledTimes(2);
            expect(warnSpy).toHaveBeenCalledTimes(2);
            logSpy.mockReset();
            warnSpy.mockReset();

            Logger.setLevel(LEVEL.DEBUG);
            Logger.trace("log 0");
            Logger.debug("log 1");
            Logger.info("warn 1");
            Logger.warn("warn 2");
            expect(logSpy).toHaveBeenCalledTimes(1);
            expect(warnSpy).toHaveBeenCalledTimes(2);
            logSpy.mockReset();
            warnSpy.mockReset();

            Logger.setLevel(LEVEL.INFO);
            Logger.trace("log 0");
            Logger.debug("log 0");
            Logger.info("warn 1");
            Logger.warn("warn 2");
            expect(logSpy).toHaveBeenCalledTimes(0);
            expect(warnSpy).toHaveBeenCalledTimes(2);
            logSpy.mockReset();
            warnSpy.mockReset();

            Logger.setLevel(LEVEL.WARN);
            Logger.trace("log 0");
            Logger.debug("log 0");
            Logger.info("warn 0");
            Logger.warn("warn 1");
            expect(logSpy).toHaveBeenCalledTimes(0);
            expect(warnSpy).toHaveBeenCalledTimes(1);
            logSpy.mockReset();
            warnSpy.mockReset();

            Logger.setLevel(LEVEL.OFF);
            Logger.trace("log 0");
            Logger.debug("log 0");
            Logger.info("warn 0");
            Logger.warn("warn 0");
            expect(logSpy).toHaveBeenCalledTimes(0);
            expect(warnSpy).toHaveBeenCalledTimes(0);
            logSpy.mockReset();
            warnSpy.mockReset();
        });
    });
});
