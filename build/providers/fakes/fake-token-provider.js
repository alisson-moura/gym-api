"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeTokenProvider = void 0;
var FakeTokenProvider = /** @class */ (function () {
    function FakeTokenProvider() {
    }
    FakeTokenProvider.prototype.getStaticToken = function () {
        return 'fake_token';
    };
    FakeTokenProvider.prototype.create = function (id) {
        return 'fake_token';
    };
    return FakeTokenProvider;
}());
exports.FakeTokenProvider = FakeTokenProvider;
//# sourceMappingURL=fake-token-provider.js.map