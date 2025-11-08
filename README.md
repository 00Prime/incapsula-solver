# JSDOM-INCAP

**⚠️ OUTDATED VERSION**: This is a very outdated version from 2023. This code is no longer maintained and many dependencies may have security vulnerabilities.

**⚠️ Showcase Only**: This project is for educational and demonstrative purposes only. Use responsibly and in compliance with all applicable laws and terms of service.

## Overview

JSDOM-INCAP is a Node.js-based toolkit that leverages JSDOM (a JavaScript implementation of web standards for Node.js) to simulate browser behavior and bypass bot detection

The project demonstrates:

- **JSDOM Integration**: Full DOM simulation with JavaScript execution
- **WebGL Spoofing**: GPU context rendering to appear as a legitimate browser
- **User-Agent Spoofing**: Dynamic user-agent generation and rotation
- **Fingerprint Masking**: Browser fingerprint manipulation via Canvas and WebGL
- **Express Server**: Local proxy/testing infrastructure
- **Code Parsing & Execution**: AST-based analysis and controlled code execution

## Project Structure

```text
├── index.js              # Main entry point with JSDOM setup
├── app.js                # Express server implementation
├── webgl.js              # WebGL context emulation
├── hash.js               # Cryptographic utilities
├── lib/
│   ├── parser.js         # AST parser for code analysis
│   └── spoof.js          # Spoofing utilities (UA, fingerprints)
├── index.html            # Test HTML
├── package.json          # Dependencies
└── README.md             # This file
```

## Key Features

- **DOM Simulation**: Full JSDOM environment with realistic DOM APIs
- **JavaScript Execution**: Support for complex JavaScript execution within Node.js
- **Browser Spoofing**: User-Agent rotation and header manipulation
- **Fingerprint Obfuscation**: Canvas and WebGL fingerprint masking
- **Secure Code Execution**: VM-sandboxed code evaluation via vm2

## Dependencies

Key libraries used in this project:

- **jsdom** (v21.1.0): JavaScript DOM implementation
- **express** (v4.18.2): Web server framework
- **axios** (v1.3.4): HTTP client
- **canvas** (v2.11.0): Canvas API for Node.js
- **gl** (v6.0.2): WebGL binding for Node.js
- **@babel/parser & @babel/traverse**: Code parsing and traversal
- **sharp** (v0.31.3): Image processing
- **vm2** (v3.9.14): Sandboxed JavaScript execution
- **user-agents** (v1.0.1304): User-agent library
- **@mesh.js/core** (v1.1.25): WebGL utilities

## Installation

```bash
npm install
```

## Usage

The project can be run as either:

1. **JSDOM Environment** (index.js)

   ```bash
   node index.js
   ```

2. **Express Server** (app.js)

   ```bash
   node app.js
   ```

## Legal Notice

This project is provided **for educational, research, and showcase purposes only**. Users are solely responsible for:

- Complying with all applicable laws and regulations
- Respecting website terms of service
- Obtaining proper authorization before any security testing
- Understanding that unauthorized access to computer systems is illegal

Misuse of this toolkit for malicious purposes, unauthorized access, or violation of terms of service is strictly prohibited and may result in legal action.

## Disclaimer

The author of this project assume no liability for misuse, damage, or legal consequences resulting from the use of this software. Use at your own risk and only in environments where you have explicit permission.

---

**Originally Created**: 2023
**Status**: Very outdated - No longer maintained

For educational and demonstration purposes only.
