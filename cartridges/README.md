[ProjectName] Demandware Project
===========================

## Tooling

Ruby and Node are the primary drivers for this application stack.

**Note: This outline assumes all commands listed below are run from the '[ProjectName]' directory.

## Pre-requisites
* Ruby installed via binary or RVM
* Sass & Compass Ruby Gem
* NodeJS & NVM (optional)
* NPM
* Eclipse IDE (install Demandware Components)

## Optional Systems (Mac OSX Environment)
* iTerm2
* Sublime Text 2
* ImageOptim


# Ruby

This outline assumes you already have some version of Ruby installed (at minimum 1.9.3). It is also suggested that an environment manager be used, such as using [RVM](https://rvm.io/) for managing versions of Ruby and RubyGems.

Note: OSX Environments come pre-installed with Ruby

### RVM

To install RVM for the first time:

```sh
$ \curl -L https://get.rvm.io | bash -s stable --ruby
```

Or if you have installed RVM previously, make sure you have the current stable version:

```sh
$ rvm get stable
```

And finally, create your project-specific `.rvmrc` file using a project-specific gemset:

```sh
$ rvm --rvmrc --create use 1.9.3-p194
```

### [Compass](http://compass-style.org/) (0.12.2)

To install Compass using RVM with a project specific gemset:

```sh
$ gem install compass
```
If you are not using RVM, Compass can be installed at the system level:

```sh
$ sudo gem install compass
```

## [Node.js](http://nodejs.org/) (v0.8.22)

Node.js can be installed via one of the available installers or binary downloads [here](http://nodejs.org/dist/v0.8.22/) or it can be compiled manually as outlined in the project repository [README](https://github.com/joyent/node#readme) file (just make sure to checkout the `v0.8.22` tag) or you can use nvm (see below).

### nvm (optional)

[Node Version Manager](https://github.com/creationix/nvm) is a command line tool that allows you to install and use any previous or current version of Node.js. This install is optional but can be a very helpful tool if you're working on multiple projects requiring different versions of Node.

```sh
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
$ nvm install 0.8.4
```

### npm (1.1.45)

[npm](https://npmjs.org/) is the predominant package manager for Node.js and let's you easily install utilities, tools, delegators, and other dependencies while also managing the dependencies of your dependencies for you automagically (nothing is global, each dependency is self contained with it's dependencies in parallel).

As of Node.js version 0.6 npm comes bundled and does not require an additional install. However, if you have an older version of npm installed, it can be updated by simply running `npm update npm -g`.

Running `npm install` will read all of the dependencies listed in the `package.json` file and install them into the `node_modules` directory.

## Versioning

Since this project is not public, and technically not a packagable app, the version specified in dependency configuration files does not reflect an actual release version. Instead, in an effort to track modifications to dependencies, simply increment the version in the dependency configuration file whenever changes are made to it.

## Project set up:

After the prerequisites are installed, clone the project into your workspace via terminal:
```sh
$ git clone git@github.com:FluidInc/[project-repository].git
```

Or use a GUI such as SourceTree to checkout 'git@github.com:FluidInc/[project-repository].git'

Install node packages:
```sh
$ npm install
```

Navigate to project repository folder within terminal and run `grunt clone` task to install the needed sitegenesis-demandware and app_fluid demandware cartridge dependancies:
```sh
$ grunt clone
```
You may be prompted for your github credentials for each repo needing to be cloned.

Run `grunt server` to kickoff grunt server

```sh
$ grunt server
```

