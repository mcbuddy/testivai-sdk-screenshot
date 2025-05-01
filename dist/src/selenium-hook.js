"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureScreenshotSelenium = captureScreenshotSelenium;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path")); // Import path module for joining paths
function captureScreenshotSelenium(driver, screenshotDir) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Capturing Selenium screenshot. Saving to: ${screenshotDir}`);
        // Ensure the directory exists
        if (!fs_1.default.existsSync(screenshotDir)) {
            fs_1.default.mkdirSync(screenshotDir, { recursive: true });
        }
        const image = yield driver.takeScreenshot();
        const screenshotPath = path_1.default.join(screenshotDir, `screenshot-${Date.now()}.png`);
        fs_1.default.writeFileSync(screenshotPath, image, 'base64');
        console.log(`Screenshot saved to ${screenshotPath}`);
    });
}
