//@ts-check
// @ts-ignore
import Parser from "./lib/parser.js";
// @ts-ignore
import axios from 'axios';
import jsdom from "jsdom";
import express from 'express';
// @ts-ignore
import iframe_window from "./node_modules/jsdom/lib/jsdom/browser/Window.js";
// @ts-ignore
import {
    WebGLRenderingContext,
    getWebGL
} from "./webgl.js";

import SHA from "./hash.js";
import {
    spoof,
    generateUA
} from './lib/spoof.js'
// @ts-ignore
const {
    createHash
} = await import("node:crypto");

import {
    readFileSync,
    // @ts-ignore
    appendFileSync
} from "fs";

const html_dom = readFileSync("./index.html", "utf-8");

// @ts-ignore
const app = express();
const JSDOM = jsdom.JSDOM;
const debug = true;


let code;
if (debug) {
    code = readFileSync("./challenge.js", "utf-8");
}


const origCreate = iframe_window.createWindow.bind(iframe_window);
// @ts-ignore
let monitorning = false;
// @ts-ignore



class Stopwatch {
    constructor() {
        this.marks = {};
        this.measures = {};
    }
    start(name) {
        this.marks[name] = Date.now();
    }
    stop(name) {
        this.measures[name] = Date.now() - this.marks[name];
    }
    summary() {
        return this.measures;
    }
    // @ts-ignore
    startInternal(arg) {}
    // @ts-ignore
    stopInternal(arg) {}
}
class Incapsula {
    constructor() {
        this.jsChallenge = debug ? code : null;
        // this.init();
    }
    async init() {
        console.time('webgl');
        this.webgl = new WebGLRenderingContext(await getWebGL());
        console.timeEnd('webgl');
        this.initJSDOM();
    }
    initJSDOM() {
        const webgl = this.webgl;
        this.userAgent = generateUA();

        this.jsdom = new JSDOM(html_dom, {
            url: "https://hertz.com ",
            runScripts: "outside-only",
            userAgent: this.userAgent.toString(),
            // contentType: "text/html",
            beforeParse(window) {
                window = spoof(window, webgl);
            },
        });

        iframe_window.createWindow = (...args) => {
            let w = origCreate(...args);
            w = spoof(w, webgl);
            return w;
        };
        this.eval();
    }

    eval() {
        //@ts-ignore
        this.jsdom.window.eval(this.jsChallenge);
        // return this.getSolution();
    }
    getSolution() {
        this.simulateMovement = setInterval(() => {
            this.mouseMove();
        }, 100);
        this.perf = new Stopwatch();
        this.perf.start("total");
        const reese84 = new this.jsdom.window.reese84interrogator(SHA.hash, this.perf, "ETB+k7TaOfed8UBn74GoDA/F0WQvF+h3uxk6EkikxlI=");
        return new Promise((resolve, reject) => {
            reese84.interrogate(msg => {
                clearInterval(this.simulateMovement);
                resolve({
                    "solution": {
                        "interrogation": msg,
                        "version": 'beta'
                    },
                    "old_token": null,
                    "error": null,
                    "performance": {
                        // @ts-ignore
                        "interrogation": this.perf.measures.interrogation
                    }
                });
            }, msg => {
                reject(msg);
            });
        });
    }

    mouseMove() {
        //@ts-ignore
        const screenWidth = this.jsdom.window.innerWidth;
        // @ts-ignore
        const screenHeight = this.jsdom.window.innerHeight;
        // @ts-ignore
        const currentX = this.jsdom.window.scrollX + screenWidth / 2;
        // @ts-ignore
        const currentY = this.jsdom.window.scrollY + screenHeight / 2;

        const randomRadius = Math.floor(Math.random() * 50) + 50;
        const randomAngle = Math.random() * Math.PI * 2;
        const randomX = Math.floor(Math.cos(randomAngle) * randomRadius);
        const randomY = Math.floor(Math.sin(randomAngle) * randomRadius);

        const targetX = currentX + randomX;
        const targetY = currentY + randomY;

        // @ts-ignore
        const mouseMoveEvent = new this.jsdom.window.MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            // @ts-ignore
            view: this.jsdom.window,
            clientX: targetX,
            clientY: targetY
        });
        // @ts-ignore
        this.jsdom.window.document.dispatchEvent(mouseMoveEvent);
    }
    onScriptChange(challenge) {
        this.jsChallenge = challenge;
        console.log("Script changed");
        this.initJSDOM();
    }
}

// @ts-ignore
function monitor() {
    setInterval(() => {
        // Monitor for script changes
    }, 1000);
}

async function getSolution() {
    const solver = new Incapsula();
    await solver.init();

    return new Promise((resolve, reject) => {
        solver.getSolution().then((res) => {

             resolve(res);
        }).catch((err) => {
            reject(err);
        });
    })

}

// if (!monitorning) {
//     monitorning = true;
//     monitor();
// }

// getSolution()

app.get("/", async (req, res) => {

    const runTime = Date.now();

    const token = await getSolution();

    res.json({
        "token": token,
        "run": Date.now() - runTime
    });
    // res.send(token);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
})



// const solver = new Incapsula();