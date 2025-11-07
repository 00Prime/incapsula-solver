//@ts-check

import {
    WebGLRenderingContext
} from "../webgl.js";
import {
    Context2d,
} from 'canvas';


import UserAgent from 'user-agents';

let ua;

export function generateUA() {
    ua = new UserAgent({
        deviceCategory: 'desktop',
    });
    return ua;
}
export function spoof(window, webgl) {


    class TouchEvent {
        constructor() {}
    }

    window.oncontextmenu = null;
    window.oncontextrestored = null;
    window.PERSISTENT = 1;
    window.TEMPORARY = 0;
    window.indexedDB = function () {}
    window.openDatabase = function () {}
    window.TouchEvent = TouchEvent;
    window.document.createEvent = function (args) {
        if (args === "TouchEvent") {
            throw new Error("Fake error");
        }
    };

    window.chrome = {

    }
    window.visualViewport = {
        width: ua.data.viewportWidth,
        height: ua.data.viewportHeight,
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

    const getImageData = window.CanvasRenderingContext2D.prototype.getImageData;
    let noisify = function (canvas, context) {
        if (context) {
            const shift = {
                'r': Math.floor(Math.random() * 10) - 5,
                'g': Math.floor(Math.random() * 10) - 5,
                'b': Math.floor(Math.random() * 10) - 5,
                'a': Math.floor(Math.random() * 10) - 5
            };
            //
            const width = canvas.width;
            const height = canvas.height;
            //
            if (width && height) {
                const imageData = getImageData.apply(context, [0, 0, width, height]);
                //
                for (let i = 0; i < height; i++) {
                    for (let j = 0; j < width; j++) {
                        const n = ((i * (width * 4)) + (j * 4));
                        imageData.data[n + 0] = imageData.data[n + 0] + shift.r;
                        imageData.data[n + 1] = imageData.data[n + 1] + shift.g;
                        imageData.data[n + 2] = imageData.data[n + 2] + shift.b;
                        imageData.data[n + 3] = imageData.data[n + 3] + shift.a;
                    }
                }
                context.putImageData(imageData, 0, 0);
            }
        }
    };
    window.HTMLCanvasElement.prototype.toDataURL = new Proxy(window.HTMLCanvasElement.prototype.toDataURL, {
        apply(target, self, args) {
            noisify(self, self.getContext("2d"));
            return Reflect.apply(target, self, args);
        }
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
        value: ua.data.vendor,
        configurable: true,
    });

    Object.defineProperty(window.navigator, "userAgent", {
        value: ua.toString(),
        configurable: true,
    });


    Object.defineProperty(window.navigator, "doNotTrack", {
        value: Math.round(Math.random()),
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



/*
function buildPlugin(spec) {
    const plugin = spec;
    plugin.length = spec.mimeTypes.length;
    spec.mimeTypes.forEach((m, i) => {
        plugin[i] = m;
        Object.assign(m, {
            enabledPlugin: plugin,
        });
    });
    delete spec.mimeTypes;
    return plugin;
}


const plugins = {
    length: 4,
    0: buildPlugin({
        mimeTypes: [{
            type: 'application/x-google-chrome-pdf',
            suffixes: 'pdf',
            description: 'Portable Document Format',
            enabledPlugin: true,
        }],
        name: 'Chrome PDF Plugin',
        description: 'Portable Document Format',
        filename: 'internal-pdf-viewer',
    }),
    1: buildPlugin({
        mimeTypes: [{
            type: 'application/pdf',
            suffixes: 'pdf',
            description: '',
            extensions: 'pdf',
            enabledPlugin: true,
        }],
        name: 'Chrome PDF Viewer',
        description: '',
        filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
    }),
    2: buildPlugin({
        mimeTypes: [{
                type: 'application/x-nacl',
                suffixes: '',
                description: 'Native Client Executable',
                enabledPlugin: true,
            }, {
                type: 'application/x-pnacl',
                suffixes: '',
                description: 'Portable Native Client Executable',
                enabledPlugin: true,
            },
            {
                type: 'text/html',
                suffixes: '',
                description: '',
                enabledPlugin: true,
            },
            {
                type: 'application/x-ppapi-vysor',
                suffixes: '',
                description: '',
                enabledPlugin: true,
            },
            {
                type: 'application/x-ppapi-vysor-audio',
                suffixes: '',
                description: '',
                enabledPlugin: true,
            },
        ],
        name: 'Native Client',
        description: '',
        filename: ua.data.platform === 'Win32' ? 'pepflashplayer.dll' : 'internal-nacl-plugin',
    }),
    3: buildPlugin({
        mimeTypes: [{
            type: 'application/x-ppapi-widevine-cdm',
            suffixes: '',
            description: 'Widevine Content Decryption Module',
            enabledPlugin: true,
        }],
        name: 'Widevine Content Decryption Module',
        description: 'Enables Widevine licenses for playback of HTML audio/video content. (version: 1.4.9.1070)',
        filename: ua.data.platform === 'Win32' ? 'widevinecdmadapter.dll' : 'widevinecdmadapter.plugin',
    }),

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
}; */