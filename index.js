const {
    createHash
} = await import("node:crypto");

import axios from 'axios';
import jsdom from "jsdom";
import express from 'express';
import iframe_window from "./node_modules/jsdom/lib/jsdom/browser/Window.js";
import {
    WebGLRenderingContext,
    getWebGL
} from "./webgl.js";

import Parser from "./lib/parser.js";
import jest from "jest-mock";
import {
    Context2d,
} from 'canvas';
import {
    readFileSync,
    appendFileSync
} from "fs";
import SHA from "./hash.js";

const JSDOM = jsdom.JSDOM;
const app = express();
// const code = readFileSync("./test.js", "utf8");
// const code = readFileSync('./reese84.js', 'utf8');



const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hertz</title>
</head>
<body>
    <script src="/A-thou-doe-prospeeceiud-accome-Hauen-heeleepell-" async></script>
    
    <script type="text/javascript" src="/rentacar/ruxitagentjs_ICA2NVfghjoqrux_10259230120101641.js" async></script>
    <script type="text/javascript" src="/rentacar/assets/1677167536506/all/reservation/start.js" async></script>
    <script type="text/javascript" src="/rentacar/assets/1677167536506/modules/reservation/process-config/core/reservation-constants.js" async></script>

    <script type="text/javascript" src="/rentacar/assets/1677167536506/all/libs.js"></script>
    <script type="text/javascript" src="/rentacar/assets/1677167536506/all/global.js"></script>
   
    <script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://www.google.com/recaptcha/enterprise.js" async defer></script>
	
	<link rel="preconnect" href="https://www.google.com">
	<link rel="preconnect" href="https://www.gstatic.com" crossorigin>
    <link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>		
    <script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
    <script src="https://www.googleoptimize.com/optimize.js?id=OPT-5HRRXZL"></script>
    <script src="https://www.hertz.com/rentacar/assets/js/utils/errorUtil.js"></script>
</body>
</html>
`
const origCreate = iframe_window.createWindow.bind(iframe_window);
iframe_window.createWindow = (...args) => {
    console.log('iframe');
    let w = origCreate(...args);
    w = beforeParse(w);
    return w;
};

async function solveChallenge(challenge) {
    console.time("WebGL");
    const webgl = await new WebGLRenderingContext(getWebGL());
    console.timeEnd("WebGL");

    const dom = new JSDOM(html, {
        url: "https://hertz.com ",
        runScripts: "outside-only",
        resources: "usable",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        contentType: "text/html",
        includeNodeLocations: true,
        pretendToBeVisual: true,
        beforeParse(window) {
            window = beforeParse(window, webgl);
        },
        // secure: true,
    });




    let perf = new Stopwatch();
    perf.start("total");
    dom.window.eval(challenge);
    const window = dom.window;

    // console.log(window.W);

    function simulateRandomMouseMovement() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const currentX = window.scrollX + screenWidth / 2;
        const currentY = window.scrollY + screenHeight / 2;

        const randomRadius = Math.floor(Math.random() * 50) + 50;
        const randomAngle = Math.random() * Math.PI * 2;
        const randomX = Math.floor(Math.cos(randomAngle) * randomRadius);
        const randomY = Math.floor(Math.sin(randomAngle) * randomRadius);

        const targetX = currentX + randomX;
        const targetY = currentY + randomY;

        const mouseMoveEvent = new window.MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: targetX,
            clientY: targetY
        });

        window.document.dispatchEvent(mouseMoveEvent);
    }

    // Call the function to simulate random mouse movements
    let simulateMovement = setInterval(simulateRandomMouseMovement, 50);

    // console.log(window.canvas.getContext("webgl"));

    return new Promise(async (resolve, reject) => {
        const reese84 = new dom.window.reese84interrogator(SHA.hash, perf, "ETB+k7TaOfed8UBn74GoDA/F0WQvF+h3uxk6EkikxlI=");

        reese84.interrogate(msg => {

        clearInterval(simulateMovement);
            let data = {
                "solution": {
                    "interrogation": msg,
                    "version": 'beta'
                },
                "old_token": null,
                "error": null,
                "performance": {
                    "interrogation": perf.measures.interrogation
                }
            }
            resolve(data);
        }, msg => {
            console.log(reject('Error fetching token!', msg));
        })
    });
}


function beforeParse(window, webgl) {
    class TouchEvent {
        constructor() {}
    }
    const mockCreateTouchEvent = jest.fn(args => {
        if (args === "TouchEvent") {
            throw new Error("Fake error");
        } else {

        }
    });

    window.oncontextmenu = null;
    window.oncontextrestored = null;
    window.PERSISTENT = 1;
    window.TEMPORARY = 0;
    window.indexedDB = function () {}
    window.openDatabase = function () {}
    window.TouchEvent = TouchEvent;
    window.document.createEvent = mockCreateTouchEvent;
    window.chrome = {

    }
    window.visualViewport = {
        width: 1920,
        height: 1080,
        scale: 1
    }
    window.console.debug = function () {};
    Object.defineProperty(window.console.debug, 'name', {
        value: 'debug'
    });
    Object.defineProperty(window.console.debug, 'toString', {
        value: function () {
            return 'function () { [native code] }';
        }
    });

    window.HTMLMediaElement.prototype.canPlayType = function (type) {
        if (type === 'audio/x-m4a;') {
            return 'maybe';
        }
        if (typeof type !== 'string') {
            return ''
        }
        return "probably";
    };

    window.PerformanceObserver = {
        supportedEntryTypes: [
            "element",
            "event",
            "first-input",
            "largest-contentful-paint",
            "layout-shift",
            "longtask",
            "mark",
            "measure",
            "navigation",
            "paint",
            "resource"
        ],
    }
    window.screen.availLeft = 0;
    window.screen.availTop = 0;
    Object.defineProperty(window, "CanvasRenderingContext2D", {
        get() {
            return Context2d;
        },
    });

    const fake_fonts = ["ARNOPRO", "AgencyFB", "ArabicTypesetting", "ArialUnicodeMS", "AvantGardeBkBT", "BankGothicMdBT", "BitstreamVeraSansMono", , "CenturyGothic", "Clarendon", "EUROSTILE", "FranklinGothic", "FuturaBkBT", "FuturaMdBT", "GOTHAM", "GillSans", "HELV", "HelveticaNeue", "Humanst521BT", "LetterGothic", "LevenimMT", "LucidaBright", "LucidaSans", "MSMincho", "MSOutlook", "MSReferenceSpecialty", "MSUIGothic", "MTExtra", "MYRIADPRO", "Marlett", "MeiryoUI", "MicrosoftUighur", "MinionPro", "MonotypeCorsiva", "SCRIPTINA", "SegoeUILight", "Serifa", "SimHei", "SmallFonts", "Staccato222BT", "TRAJANPRO", "UniversCE55Medium", "Vrinda", "ZWAdobeF"];

    const originalMeasureText = window.CanvasRenderingContext2D.prototype.measureText;

    let spoofed = 0;
    window.CanvasRenderingContext2D.prototype.measureText = function (text) {
        const font = this.font.split(' ')[1].replace(/,/g, '');
        if (fake_fonts.includes(font)) {
            if (spoofed < 2 && Math.random() < 0.10) {
                let metrics = originalMeasureText.apply(this, arguments);
                const width = Math.floor(Math.random() * 100) + 1;
                spoofed++;
                metrics.width = width;
                return metrics;
            }
            return originalMeasureText.apply(this, arguments);
        }
        return originalMeasureText.apply(this, arguments);
    };
    window.WebGLRenderingContext = WebGLRenderingContext;
    const orig_getContext = window.HTMLCanvasElement.prototype.getContext
    window.HTMLCanvasElement.prototype.getContext = function () {
        if (arguments[0] === 'webgl') {
            return webgl;
        } else {
            return orig_getContext.apply(this, arguments)
        }
    }
    // Object.defineProperty(window, "WebGLRenderingContext", {
    //     get() {
    //         return new WebGLRenderingContext(createCanvas());
    //     }
    // });
    window.navigator.connection = {
        rtt: 50,
    };


    window.navigator.getBattery = function () {
        return Promise.resolve({
            level: Infinity,
            charging: true,
        });
    };

    Object.defineProperty(window.navigator, 'platform', {
        value: 'Win32'
    });
    Object.defineProperty(window.navigator.getBattery, 'toString', {
        value: function () {
            return 'function getBattery() { [native code] }';
        }
    });



    window.navigator.webdriver = false;
    let window_navigator_properties = [
        "maxTouchPoints",
        "scheduling",
        "userActivation",
        "geolocation",
        "pdfViewerEnabled",
        "webkitTemporaryStorage",
        "webkitPersistentStorage",
        "getGamepads",
        "doNotTrack",
        "bluetooth",
        "clipboard",
        "credentials",
        "keyboard",
        "managed",
        "mediaDevices",
        "storage",
        "serviceWorker",
        "virtualKeyboard",
        "wakeLock",
        "deviceMemory",
        "hid",
        "locks",
        "presentation",
        "serial",
        "usb",
        "xr",
        "userAgentData",
        "canShare",
        "share",
        "clearAppBadge",
        "getUserMedia",
        "requestMIDIAccess",
        "requestMediaKeySystemAccess",
        "setAppBadge",
        "webkitGetUserMedia",
        "registerProtocolHandler",
        "unregisterProtocolHandler",
        "getInstalledRelatedApps",

        "connection",
        "getBattery",
        "sendBeacon",
        "vibrate",
        "ink",
        "mediaCapabilities",
        "mediaSession",
        "permissions",
        "windowControlsOverlay"

    ];
    window_navigator_properties.forEach(element => {
        window.navigator[element] = {};
    })
    window.Object._getOwnPropertyDescriptor = window.Object.getOwnPropertyDescriptor;
    const getOwnPropertyDescriptor = window.Object._getOwnPropertyDescriptor;
    window.Object.getOwnPropertyDescriptor = function (obj, prop) {
        if (obj === window.navigator) {
            if (window_navigator_properties.includes(prop)) {
                return undefined;
            }

            switch (prop) {
                case "mimeTypes":
                case 'userAgent':
                case 'platform':
                case 'vendor':
                case 'plugins':
                    return undefined;
                    break;

                default:
                    break;
            }
        } else {
            // Call the original getOwnPropertyDescriptor for all other cases
            return getOwnPropertyDescriptor(obj, prop);
        }
    };
    let windows_properties = [
        "WritableStreamDefaultController",
        "VirtualKeyboardGeometryChangeEvent",
        "TransformStreamDefaultController",
        "SVGComponentTransferFunctionElement",
        "ReadableStreamDefaultController",
        "OffscreenCanvasRenderingContext2D",
        "NavigationCurrentEntryChangeEvent",
        "MediaStreamAudioDestinationNode",
        "WebTransportBidirectionalStream",
        "WebTransportDatagramDuplexStream",
        "AuthenticatorAttestationResponse",
        "BluetoothCharacteristicProperties",
        "BluetoothRemoteGATTCharacteristic",
        "PresentationConnectionAvailableEvent",
        "PresentationConnectionCloseEvent",
        "USBIsochronousOutTransferPacket",
        "USBIsochronousOutTransferResult",
        "WindowControlsOverlayGeometryChangeEvent",
        "oncontentvisibilityautostatechange",
        "ContentVisibilityAutoStateChangeEvent",
        "webkitResolveLocalFileSystemURL",
        "transmogrification_hover_enter_function",
        "transmogrification_hover_exit_function",
    ];

    windows_properties.forEach(element => {
        window[element] = {};
    })
    Object.defineProperty(window.navigator, "vendor", {
        value: "Google Inc",
        configurable: true,
    });

    Object.defineProperty(window.navigator, "userAgent", {
        value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        configurable: true,
    });

    Object.defineProperty(window.navigator, "doNotTrack", {
        value: 1,
        configurable: true,
    });

    Object.defineProperty(window.navigator, "mimeTypes", {
        value: {
            0: {
                type: "application/x-ppapi-widevine-cdm",
                suffixes: "",
                description: "Widevine Content Decryption Module",
                enabledPlugin: {
                    0: [{}],
                    name: "Widevine Content Decryption Module",
                    filename: "widevinecdmadapter.dll",
                    description: "Enables Widevine licenses for playback of HTML audio/video content. (version: 1.4.8.903)",
                    length: 1,
                    item: "",
                    namedItem: "",
                },
                toString: function () {
                    return "[object MimeType]";
                },
            },
            1: {
                type: "application/pdf",
                suffixes: "pdf",
                description: "",
                enabledPlugin: {
                    0: [{}],
                    name: "Chrome PDF Viewer",
                    filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai",
                    description: "",
                    length: 1,
                    item: "",
                    namedItem: "",
                },
                toString: function () {
                    return "[object MimeType]";
                },
            },
            2: {
                type: "application/x-shockwave-flash",
                suffixes: "swf",
                description: "Shockwave Flash",
                enabledPlugin: {
                    0: [{}],
                    1: [{}],
                    name: "Shockwave Flash",
                    filename: "pepflashplayer.dll",
                    description: "Shockwave Flash 22.0 r0",
                    length: 2,
                    item: "",
                    namedItem: "",
                },
                toString: function () {
                    return "[object MimeType]";
                },
            },
            3: {
                type: "application/futuresplash",
                suffixes: "spl",
                description: "FutureSplash Player",
                enabledPlugin: {
                    0: [{}],
                    1: [{}],
                    name: "Shockwave Flash",
                    filename: "pepflashplayer.dll",
                    description: "Shockwave Flash 22.0 r0",
                    length: 2,
                    item: "",
                    namedItem: "",
                },
                toString: function () {
                    return "[object MimeType]";
                },
            },
            4: {
                type: "application/x-nacl",
                suffixes: "",
                description: "Native Client Executable",
                enabledPlugin: {
                    0: [{}],
                    1: [{}],
                    name: "Native Client",
                    filename: "internal-nacl-plugin",
                    description: "",
                    length: 2,
                    item: "",
                    namedItem: "",
                },
                toString: function () {
                    return "[object MimeType]";
                },
            },
            5: {
                type: "application/x-pnacl",
                suffixes: "",
                description: "Portable Native Client Executable",
                enabledPlugin: {
                    0: [{}],
                    1: [{}],
                    name: "Native Client",
                    filename: "internal-nacl-plugin",
                    description: "",
                    length: 2,
                    item: "",
                    namedItem: "",
                },
                toString: function () {
                    return "[object MimeType]";
                },
            },
            6: {
                type: "application/x-google-chrome-pdf",
                suffixes: "pdf",
                description: "Portable Document Format",
                enabledPlugin: {
                    0: [{}],
                    name: "Chrome PDF Viewer",
                    filename: "internal-pdf-viewer",
                    description: "Portable Document Format",
                    length: 1,
                    item: "",
                    namedItem: "",
                },
                toString: function () {
                    return "[object MimeType]";
                },
            },
            length: 7,
            item: {
                toString: function () {
                    return "function item() { [native code] }";
                },
            },
            namedItem: {
                toString: function () {
                    return "function namedItem() { [native code] }";
                },
            },
        },
        configurable: true,
    });

    Object.defineProperty(window.navigator, "plugins", {
        value: {
            0: {
                0: {
                    type: "application/x-ppapi-widevine-cdm",
                    suffixes: "",
                    description: "Widevine Content Decryption Module",
                    enabledPlugin: [{}],
                },
                name: "Widevine Content Decryption Module",
                filename: "widevinecdmadapter.dll",
                description: "Enables Widevine licenses for playback of HTML audio/video content. (version: 1.4.8.903)",
                length: 1,
                item: [""],
                namedItem: [""],
                toString: function () {
                    return "[object Plugin]";
                },
            },
            1: {
                0: {
                    type: "application/pdf",
                    suffixes: "pdf",
                    description: "",
                    enabledPlugin: [{}],
                },
                name: "Chrome PDF Viewer",
                filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai",
                description: "",
                length: 1,
                item: [""],
                namedItem: [""],
                toString: function () {
                    return "[object Plugin]";
                },
            },
            2: {
                0: {
                    type: "application/x-shockwave-flash",
                    suffixes: "swf",
                    description: "Shockwave Flash",
                    enabledPlugin: [{}],
                },
                1: {
                    type: "application/futuresplash",
                    suffixes: "spl",
                    description: "FutureSplash Player",
                    enabledPlugin: [{}],
                },
                name: "Shockwave Flash",
                filename: "pepflashplayer.dll",
                description: "Shockwave Flash 22.0 r0",
                length: 2,
                item: [""],
                namedItem: [""],
                toString: function () {
                    return "[object Plugin]";
                },
            },
            3: {
                0: {
                    type: "application/x-nacl",
                    suffixes: "",
                    description: "Native Client Executable",
                    enabledPlugin: [{}],
                },
                1: {
                    type: "application/x-pnacl",
                    suffixes: "",
                    description: "Portable Native Client Executable",
                    enabledPlugin: [{}],
                },
                name: "Native Client",
                filename: "internal-nacl-plugin",
                description: "",
                length: 2,
                item: [""],
                namedItem: [""],
                toString: function () {
                    return "[object Plugin]";
                },
            },
            4: {
                0: {
                    type: "application/x-google-chrome-pdf",
                    suffixes: "pdf",
                    description: "Portable Document Format",
                    enabledPlugin: [{}],
                },
                name: "Chrome PDF Viewer",
                filename: "internal-pdf-viewer",
                description: "Portable Document Format",
                length: 1,
                item: [""],
                namedItem: [""],
                toString: function () {
                    return "[object Plugin]";
                },
            },
            length: 5,
            item: {
                toString: function () {
                    return "function item() { [native code] }";
                },
                name: "item",
            },
            namedItem: {
                toString: function () {
                    return "function namedItem() { [native code] }";
                },
                name: "namedItem",
            },
            refresh: {
                toString: function () {
                    return "function refresh() { [native code] }";
                },
                name: "refresh",
            },
        },
        configurable: true,
    });

    return window;
}

class Stopwatch {
    constructor() {
        this.marks = {};
        this.measures = {};
    }
    start(name) {
        this.marks[name] = Date.now();
    }
    startInternal(arg) {}
    stop(name) {
        this.measures[name] = Date.now() - this.marks[name];
    }
    stopInternal(arg) {}
    summary() {
        return this.measures;
    }
}

let previousHash;
let challenge_js;

async function getScript() {
    let reese84;
    try {
        var {
            data
        } = await axios.get(
            "https://www.hertz.com/A-thou-doe-prospeeceiud-accome-Hauen-heeleepell-", {
            }
        );
    } catch (e) {
        console.log("e");

        setTimeout(() => {
            getScript();
        }, 2000);
        return "error";
    }
    const hash = createHash("sha256").update(data).digest("base64");

    if (previousHash !== hash && data.includes("new window['reese84interrogator']")) {
        reese84 = await Parser.modify(data);
        previousHash = hash;
        challenge_js = reese84;
        appendFileSync("challenge.js", reese84);
    } else {}

    setTimeout(() => {
        getScript();
    }, 2000);
    return challenge_js
}

challenge_js = await getScript();

console.log('Script loaded')
app.get('/', async (req, res) => {


    const runTime = Date.now();

    const solution = await solveChallenge(challenge_js).catch((e) => {
        console.log(e);
    });

    if (solution == 'Error') {
        res.json({
            sucess: false,
            run: (Date.now() - runTime) / 1000
        });
        return;
    }

    res.json({
        token: solution,
        sucess: true,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        run: (Date.now() - runTime) / 1000
    });
});


app.listen(8080);