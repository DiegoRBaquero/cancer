# Mutode [![npm](https://img.shields.io/npm/v/mutode.svg)](http://npmjs.com/package/mutode) [![npm](https://img.shields.io/npm/dm/mutode.svg)](http://npmjs.com/package/mutode) [![npm](https://img.shields.io/npm/l/mutode.svg)](LICENSE)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/TheSoftwareDesignLab/mutode.svg?branch=master)](https://travis-ci.org/TheSoftwareDesignLab/mutode) [![Build status](https://ci.appveyor.com/api/projects/status/ulp8cq3aq2bng6he/branch/master?svg=true)](https://ci.appveyor.com/project/DiegoRBaquero/mutode/branch/master)
 [![Coverage Status](https://coveralls.io/repos/github/TheSoftwareDesignLab/mutode/badge.svg?branch=master)](https://coveralls.io/github/TheSoftwareDesignLab/mutode?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/TheSoftwareDesignLab/mutode.svg)](https://greenkeeper.io/)

Mutation testing for Node.js and JavaScript.

**Mutode** generates mutants (small changes of code) and runs your tests. If the tests fail, it means the mutant was detected and **killed**; if your tests pass, it means the mutant **survived** and your tests can be improved.

[**Watch the demo video**](https://www.youtube.com/watch?v=DILzHOljFj0&feature=youtu.be) and 
[**Check the slides of the Node Summit 2018 talk**](https://speakerdeck.com/diegorbaquero/beyond-code-coverage-mutation-testing-tests-for-your-tests)

> "It's like a test for your tests!" - @mappum

> "Higher order testing: automated testing for your unit tests" - @albertomiranda

## Publications

Read the tool demo paper [*"Mutode: generic JavaScript and Node.js mutation testing tool"*](https://dl.acm.org/citation.cfm?id=3229504). In Proceedings of the 27th ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA 2018)

Read the thesis proposal [**here**](https://docs.google.com/document/d/1V6U-ahLq6faCbtP0DtKukzdnsUC2ZBsL1LWEJvkqUiE/edit?usp=sharing)


## Install

**Requires Node 8+**

Globally:

```sh
npm i -g mutode
```

Locally as a dev dependency:

```sh
npm i -D mutode
```

## Use

Globally:

```sh
mutode [options] [paths]
```

Locally with `npx`:

```sh
npx mutode [options] [paths]
```

Locally with a package.json script:

```
{
  ...
  "scripts": {
    "test: "my test command",
    "mutode": "mutode [options] [paths]"
  }
  ...
}
```

**Options**:

```
Usage: mutode [options] [paths]

Options:
  --concurrency, -c  Concurrency of mutant runners         [number] [default: 4]
  --mutators, -m     Specific mutators to load (space separated)
      [array] [choices: "booleanLiterals", "conditionalsBoundary", "increments",
             "invertNegatives", "math", "negateConditionals", "numericLiterals",
              "removeArrayElements", "removeConditionals", "removeFuncCallArgs",
         "removeFuncParams", "removeFunctions", "removeLines", "removeObjProps",
                                          "removeSwitchCases", "stringLiterals"]
  -h, --help         Show help                                         [boolean]
  -v, --version      Show version number                               [boolean]
```

## Docs

- Current supported mutation operators are available [**here**](https://thesoftwaredesignlab.github.io/mutode/module-Mutators.html)
- General documentation is available [**here**](https://thesoftwaredesignlab.github.io/mutode/)

## Videos

- [Demo](https://www.youtube.com/watch?v=DILzHOljFj0&feature=youtu.be)

## License
MIT Copyright © Diego Rodríguez Baquero
