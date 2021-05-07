# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

## [2.126.0] - 2021-05-07
### Updated
- Bump lodash from 4.17.19 to 4.17.21
- Bump handlebars from 4.5.3 to 4.7.7
- Bump underscore from 1.9.1 to 1.12.1
- Bump y18n from 3.2.1 to 3.2.2
- Bump ini from 1.3.5 to 1.3.7

## [2.101.0] - 2020-09-01
### Added
- Add support for custom properties in header
### Fixed
- addImageToCell throws TypeError: preview.substring is not a function
### Updated
- Bump handlebars from 4.1.2 to 4.5.3
- Bump lodash from 4.17.14 to 4.17.19

## [2.86.0] - 2019-11-19
### Added
- support for profile images

## 2.77.3 - Aug 16, 2019
- Added support for the following sheet summary methods:
    - `sheets.getSummary`
    - `sheets.getSummaryFields`
    - `sheets.addSummaryFields`
    - `sheets.deleteSummaryFields`
    - `sheets.updateSummaryFields`
    - `sheets.addSummaryFieldImage`

## 2.77.2 - Aug 9, 2019
- Updated the following dependencies due to security vulnerabilities:
    - `set-value`
    - `union-value`
    - `mixin-deep`
    - `lodash`
    - `lodash.merge`

## 2.77.1 - June 6, 2019
- Updated `js-yaml` and `handlebars` dependencies due to security vulnerabilities
- Automated publication process to npm using Travis CI

## 2.77.0 - May 9, 2019
- Added events endpoint to retrieve events that are occurring in your Smartsheet plan.

## 1.5.0 - February 18, 2019
- Updated documentation regarding the usage of baseUrl to clarify how clients can access smartsheetgov
- Added constant for smartsheetgov

## 1.4.2 - February 11, 2019
- Update `extend` dependency version to resolve security vulnerability

## 1.4.1 - December 7, 2018

### Security
- CVE-2016-10540: Updated `minimatch` dev dependency.
- CVE-2018-1000620: Updated `cryptiles` dependency package lock.
- Updated `gulp` and `gulp-jshint` dev dependencies to resolve lower-level npm audit findings.

## 1.4.0 - June 29, 2018
### Added
- Added support for bulk creation of favorites: `favorites.addMultipleToFavorites`.

### Fixed
- Fixed a number of methods that mutated the options struct

### Security
- CVE-2017-16042: Updated `mocha` and `gulp-mocha` dev dependencies to transitively update vulnerable versions of `growl`.

## 1.3.0 - May 2, 2018
### Added
- Added support for import sheet from XLSX, CSV file endpoints

### Fixed
- Fixed bug that incorrectly formatted the Update Rows url when `rowId` was passed
- Fixed bug preventing users from passing header options (assume user, Smartsheet change agent, etc.) to the `server.getInfo` and `add<Object>ToFavorites` methods

### Security
- CVE-2018-3728: Updated `request` dependency, updating descendant `hoek` to a version patching the vulnerability.

## 1.1.0 - March 16, 2018
### Added
- Add automation rule support
- Add sort rows support
- Add cross sheet reference support
- Add arbitrary request support
- Add file path support for file attachment methods:
    - sheets.addFileAttachment
    - sheets.attachNewVersion
    - sheets.addCommentFileAttachment
    - sheets.addRowFileAttachment
    - sheets.addImageToCell
    - request.postFile
- Add `userAgent` argument to client constructor. Value is appended to user agent string.
- Add `baseUrl` argument to client constructor

### Changed
- Set gzip encoding header

### Fixed
- Fixed bug preventing query params from being used with `searchAll`

## 1.0.4 - February 2, 2018
### Added
- Add webhook 'Change Agent' header support

## 1.0.3 - November 21, 2017
### Added
- Add mock api tests

### Fixed
- Fix copy/move row to another sheet


## 1.0.1 - October 26, 2017
### Fixed
- Fix node 4.8.4 compatibility bugs


## 1.0.0 - October 20, 2017
### Added
- Add NPM version number badge
- Add `deleteRows`

### Changed
- Allow list of objectIds to be passed in `removeFavorites`
- Improve README

### Fixed
- Fix list sights
- Fix `getSheetAs<filetype>` endpoints


## 1.0.0 Beta - October 6, 2017
### Added
- Add TravisCI and Coveralls support
- Add logging
- Add request retry
- Add images support
- Add tokens support
- Add Webhooks support
- Add move/copy sheet support
- Add file attachment support
- Add update request support
- Add full sight support
- Add alternate email support
- Add assume user support

### Changed
- Improve README
## 0.2.0 - April 24, 2017
### Added
- Add contacts support

## 0.1.0 - April 7, 2017
### Added
- Add Smartsheet Sights support

## 0.0.8 - March 31, 2017
### Changed
- Remove hardcoded sheet id in sample code

## 0.0.7 - March 31, 2017
### Changed
- Use `SMARTSHEET_API_HOST` instead of `HOST`

## 0.0.6 - March 31, 2017
### Added
- Add getSheet tests

### Fixed
- Fix options cloning issue

## 0.0.5 - January 13, 2016
### Fixed
- Fix deleteRow to handle bulk delete of rows
- Fix urlOptions undefined bug when using smartsheet.workspaces.listWorkspaces()

## 0.0.4 - August 12, 2015
### Changed
- Update readme

## 0.0.3 - August 12, 2015
### Changed
- Add example usage
- Streamline readme

## 0.0.2 - August 12, 2015
### Changed
- Comment out debug statements
- Update readme
### Fixed
- Bug fixes


## 0.0.1 - April 27, 2015
### Added
- Initial commit
