![alt text][logo]

SynDaver Symple Slicer
======================

Symple Slicer is a simple-to-use, web-based slicer for 3D printers with the
following advantages over alternatives:

- Clean UI for ease-of-use and simplicity
- Multi-platform, requiring only a web browswer
   - Installable as an app on Chromebooks
   - Once downloaded, can be used off-line
   - Automatic updates when connected to the web
- Uses the proven CuraEngine for slicing

Symple Slicer is maintained by SynDaver Labs, Inc. for use with SynDaver
printers. Symple Slicer is licensed under the [GNU Affero General Public
License Version 3].

Symple Slicer is not meant as a replacement for Cura for advanced
users. Slicing is currently limited to a single extruder and the
GUI allows access to a subset of all Cura settings (although
exporting, editing and importing a TOML configuration file allows
access to all Cura command-line slicer options).

Easy for developers as well
---------------------------

For developers, Symple Slicer brings the following advantages:

- Fast development turn-around times
   - Web UI can be executed-in-place with no compilation
   - Updates can be pushed to users in minutes
- No server-side code for straightforward deployment
- Written in modern JavaScript (ES6)
- Clean, human-readable profile configuration files (TOML)
- Easy upgrading of the CuraEngine:
   - CuraEngine can be compiled into WebAssembly in minutes
   - Uses native CuraEngine's JSON files for engine setup
   - Python to JavaScript translation for formula values
- Open-source and build using [THREE.js] and WebGL

Re-Building from CuraEngine from source
---------------------------------------

There is no need to build or package the web application itself. It will run
as-is from the JavaScript, HTML, CSS and JSON source files.

However, the repo contains pre-built WebAssembly binaries for the Cura Engine.
These may be generated from the Cura Engine C++ source (in `src-cura/`) at any
time using the `build-cura-engine.sh` shell script. Rebuilding the Cura Engine
requires the [EMSCRIPTEN] toolchain. Refer to the documentation in
`config/README.md` for information on upgrading the slicing engine.

[THREE.js]: https://threejs.org
[EMSCRIPTEN]: https://emscripten.org
[GNU Affero General Public
License Version 3]: https://github.com/SynDaverCO/symple-slicer/raw/master/LICENSE.txt

[logo]: https://github.com/SynDaverCO/symple-slicer/raw/master/images/screenshot.png "Symple Slicer"