import { readdir } from 'fs'
import { promisify } from 'util'
import { join } from 'path'
import { spawn, spawnSync } from 'child_process'
import { config as dotenv } from 'dotenv'

// Load the password from the .env file to allow the script to run without interruptions
dotenv()

// The base args to specify the user and the database
const PG_ARGS = '-U postgres -d postgres'
// The filepath to the sql file to reset the tables, relative to the cwd
const RESET_SQL_REL_PATH = './queries/reset.sql'
// Base options for `spawn` to run in the shell and display output in terminal
const spawnOptions = {
  shell: true,
  stdio: 'inherit',
}

const main = async () => {
  // Get the file names which should be the name of the table to insert into
  const files = await promisify(readdir)(join(process.cwd(), 'data'))
  // Sort the files so that the referenced tables are created first
  const sortedFiles = files.reduce((arr, filename) => {
    if (filename === 'product.csv') {
      return [filename, ...arr]
    } else if (filename === 'style.csv') {
      const [first, ...rest] = arr
      return [first, filename, ...rest]
    }
    return [...arr, filename]
  }, [])

  // Create/reset tables
  console.log('Resetting tables...\n')
  spawnSync('psql', [PG_ARGS, '-f', join(__dirname, RESET_SQL_REL_PATH)], spawnOptions)

  sortedFiles.forEach((file, i) => {
    console.log(`Importing data for ${file}\n`)
    // Get the table name from the file and use the sync version to wait for the required
    // tables that are referenced by the rest, and then async load the rest.
    const tableName = file.split('.')[0]
    const exec = i < 2 ? spawnSync : spawn

    exec(
      `psql ${PG_ARGS} -c "\copy ${tableName} FROM '${join(
        __dirname,
        'data',
        file
      )}' DELIMITER ',' CSV HEADER"`,
      spawnOptions
    )
  })
}

main()
