# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased
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
