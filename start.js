require('babel-core/register')
var path = require('path')
var argv = require('yargs').argv
var dbpath = path.resolve(process.cwd(), argv.db)
var levelExplore = require('./')

levelExplore.start(dbpath)
