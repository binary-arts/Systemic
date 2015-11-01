# Systemic
Javascript application runtime for modern browsers.

[![Build Status](https://travis-ci.org/binary-arts/Systemic.svg)](https://travis-ci.org/binary-arts/Systemic)
[![Dev Dependency Status](https://david-dm.org/binary-arts/Systemic/dev-status.svg)](https://david-dm.org/binary-arts/Systemic#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/binary-arts/Systemic/badges/gpa.svg)](https://codeclimate.com/github/binary-arts/Systemic)
[![Test Coverage](https://codeclimate.com/github/binary-arts/Systemic/badges/coverage.svg)](https://codeclimate.com/github/binary-arts/Systemic/coverage)

## Building

In order to build Systemic, ensure that you have **[Git](http://git-scm.com/downloads)** and **[Node](http://nodejs.org)** installed.

Clone a copy of the repo:

```
git clone https://github.com/binary-arts/Systemic.git
```

Change to the Systemic directory:

```
cd Systemic
```

Install build tools and dev dependencies:

```
npm install -g grunt-cli
npm install -g bower
npm install
bower install
```

Use one of the following to build and test:

```
grunt test      # Run static analysis and execute the unit test suite on the source code
grunt develop   # Run 'grunt test' automatically when source code or unit tests change
grunt build     # Analyze, test, compile, pack, minify and copy build output and dependencies to the bin directory
grunt debug     # Run 'grunt build' automatically when source code or unit tests change
```