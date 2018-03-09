const async = require('async')
const debug = require('debug')('mutode:incrementsMutator')
const jsDiff = require('diff')
const esprima = require('esprima')
const esquery = require('esquery')
const chalk = require('chalk')

const mutantRunner = require('../mutantRunner')

/**
 * Hola
 * @method
 * @name incrementsMutator
 * @memberOf module:Mutators
 * @param mutodeInstance
 * @param filePath
 * @param lines
 * @param queue
 * @returns {Promise}
 */
module.exports = async function incrementsMutator ({mutodeInstance, filePath, lines, queue}) {
  debug('Running increments mutator on %s', filePath)
  await new Promise((resolve, reject) => {
    async.timesSeries(lines.length, async n => {
      const line = lines[n]
      try {
        const ast = esprima.parse(line)
        let result = esquery(ast, '[type="BinaryExpression"]')
        if (result.length < 1) result = esquery(ast, '[type="UpdateExpression"]')
        if (result.length < 1) return
      } catch (e) {
        // console.error(e)
      }
      const operators = [
        ['++', '--'],
        ['--', '++']
      ]
      const mutants = []
      for (const pair of operators) {
        const reg = new RegExp(`\\${pair[0].charAt(0)}{${pair[0].length}}`, 'g')
        let matches = null
        while ((matches = reg.exec(line)) !== null) {
          mutants.push(line.substr(0, matches.index + matches[0].indexOf(pair[0])) + pair[1] + line.substr(matches.index + matches[0].indexOf(pair[0]) + pair[0].length))
        }
      }
      for (const mutant of mutants) {
        const mutantId = ++mutodeInstance.mutants
        const diff = jsDiff.diffChars(line.trim(), mutant.trim()).map(stringDiff => {
          if (stringDiff.added) return chalk.green(stringDiff.value)
          else if (stringDiff.removed) return chalk.red(stringDiff.value)
          else return chalk.gray(stringDiff.value)
        }).join('')
        const log = `MUTANT ${mutantId}:\tLine ${n}: ${diff}...\t`
        debug(log)
        mutodeInstance.mutantLog(`MUTANT ${mutantId}:\tLine ${n}: \`${line.trim()}\` > \${mutant.trim()}'\`...\t`)
        const linesCopy = lines.slice()
        linesCopy[n] = mutant
        const contentToWrite = linesCopy.join('\n')
        queue.push(mutantRunner({mutodeInstance, filePath, contentToWrite, log}))
      }
    }, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}