var SHA = {}
export default SHA = {
    hash: function (_0x2bf4ab) {
      _0x2bf4ab = unescape(encodeURIComponent(_0x2bf4ab));
      for (var _0x7125cb = [
            1518500249,
            1859775393,
            2400959708,
            3395469782
          ], _0x587c06 = (_0x2bf4ab += '').length / 4 + 2, _0x47a307 = Math.ceil(_0x587c06 / 16), _0x246028 = new Array(_0x47a307), _0x1ff8ca = 0; _0x1ff8ca < _0x47a307; _0x1ff8ca++) {
        _0x246028[_0x1ff8ca] = new Array(16);
        for (var _0x5cde70 = 0; _0x5cde70 < 16; _0x5cde70++)
          _0x246028[_0x1ff8ca][_0x5cde70] = _0x2bf4ab.charCodeAt(64 * _0x1ff8ca + 4 * _0x5cde70) << 24 | _0x2bf4ab.charCodeAt(64 * _0x1ff8ca + 4 * _0x5cde70 + 1) << 16 | _0x2bf4ab.charCodeAt(64 * _0x1ff8ca + 4 * _0x5cde70 + 2) << 8 | _0x2bf4ab.charCodeAt(64 * _0x1ff8ca + 4 * _0x5cde70 + 3);
      }
      _0x246028[_0x47a307 - 1][14] = 8 * (_0x2bf4ab.length - 1) / Math.pow(2, 32);
      _0x246028[_0x47a307 - 1][14] = Math.floor(_0x246028[_0x47a307 - 1][14]);
      _0x246028[_0x47a307 - 1][15] = 8 * (_0x2bf4ab.length - 1) & 4294967295;
      var _0x3fbe28, _0x4aff8b, _0x19df2d, _0x12cf7e, _0x230994, _0x51e840 = 1732584193, _0x1379a5 = 4023233417, _0x372941 = 2562383102, _0x395208 = 271733878, _0x187480 = 3285377520, _0xf9297c = new Array(80);
      for (_0x1ff8ca = 0; _0x1ff8ca < _0x47a307; _0x1ff8ca++) {
        for (var _0x462b20 = 0; _0x462b20 < 16; _0x462b20++)
          _0xf9297c[_0x462b20] = _0x246028[_0x1ff8ca][_0x462b20];
        for (_0x462b20 = 16; _0x462b20 < 80; _0x462b20++)
          _0xf9297c[_0x462b20] = SHA.ROTL(_0xf9297c[_0x462b20 - 3] ^ _0xf9297c[_0x462b20 - 8] ^ _0xf9297c[_0x462b20 - 14] ^ _0xf9297c[_0x462b20 - 16], 1);
        _0x3fbe28 = _0x51e840;
        _0x4aff8b = _0x1379a5;
        _0x19df2d = _0x372941;
        _0x12cf7e = _0x395208;
        _0x230994 = _0x187480;
        for (_0x462b20 = 0; _0x462b20 < 80; _0x462b20++) {
          var _0x278f07 = Math.floor(_0x462b20 / 20), _0x566f6a = SHA.ROTL(_0x3fbe28, 5) + SHA.f(_0x278f07, _0x4aff8b, _0x19df2d, _0x12cf7e) + _0x230994 + _0x7125cb[_0x278f07] + _0xf9297c[_0x462b20] & 4294967295;
          _0x230994 = _0x12cf7e;
          _0x12cf7e = _0x19df2d;
          _0x19df2d = SHA.ROTL(_0x4aff8b, 30);
          _0x4aff8b = _0x3fbe28;
          _0x3fbe28 = _0x566f6a;
        }
        _0x51e840 = _0x51e840 + _0x3fbe28 & 4294967295;
        _0x1379a5 = _0x1379a5 + _0x4aff8b & 4294967295;
        _0x372941 = _0x372941 + _0x19df2d & 4294967295;
        _0x395208 = _0x395208 + _0x12cf7e & 4294967295;
        _0x187480 = _0x187480 + _0x230994 & 4294967295;
      }
      return SHA.toHexStr(_0x51e840) + SHA.toHexStr(_0x1379a5) + SHA.toHexStr(_0x372941) + SHA.toHexStr(_0x395208) + SHA.toHexStr(_0x187480);
    },
    f: function (_0x55edce, _0x4bb8f5, _0x2c5c28, _0x427b91) {
      switch (_0x55edce) {
      case 0:
        return _0x4bb8f5 & _0x2c5c28 ^ ~_0x4bb8f5 & _0x427b91;
      case 1:
      case 3:
        return _0x4bb8f5 ^ _0x2c5c28 ^ _0x427b91;
      case 2:
        return _0x4bb8f5 & _0x2c5c28 ^ _0x4bb8f5 & _0x427b91 ^ _0x2c5c28 & _0x427b91;
      }
    },
    ROTL: function (_0x36728f, _0x2caf94) {
      return _0x36728f << _0x2caf94 | _0x36728f >>> 32 - _0x2caf94;
    },
    toHexStr: function (_0x57cdda) {
      for (var _0x2f30d2 = '', _0x2f2964 = 7; _0x2f2964 >= 0; _0x2f2964--)
        _0x2f30d2 += (_0x57cdda >>> 4 * _0x2f2964 & 15).toString(16);
      return _0x2f30d2;
    }
  };