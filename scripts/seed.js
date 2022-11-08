import { readdir } from 'fs'
import { promisify } from 'util'
import { join } from 'path'
import { spawn, spawnSync } from 'child_process'
import { config as dotenv } from 'dotenv'

// Load the environment variables neccessary to run the PostgreSQL commands
dotenv()

// The base args to specify the user and the database
const PG_ARGS = `-U ${process.env.PGUSER} -d ${process.env.PGDATABASE}`
// The filepath to the sql file to reset the tables, relative to the cwd
const RESET_SQL_PATH = join(process.cwd(), 'database/reset.sql')
// Relative filepath to the CSV data files
const DATA_REL_PATH = 'database/data'
// Base options for `spawn` to run in the shell and display output in terminal
const spawnOptions = {
  shell: true,
  stdio: 'inherit',
}

const main = async () => {
  // Get the file names which should be the name of the table to insert into
  const files = await promisify(readdir)(join(process.cwd(), DATA_REL_PATH))
  // Sort the files so that the referenced tables are created first
  const sortedFiles = files.reduce((arr, filename) => {
    if (filename === 'product.csv') {
      return [filename, ...arr]
    } else if (filename === 'styles.csv') {
      return [arr[0], filename, ...arr.slice(1)]
    }
    return [...arr, filename]
  }, [])

  // Create/reset tables
  console.log('Resetting tables...\n')
  spawnSync('psql', [PG_ARGS, '-f', RESET_SQL_PATH], spawnOptions)

  sortedFiles.forEach((file, i) => {
    console.log(`Importing data for ${file}\n`)
    // Get the table name from the file and use the sync version to wait for the required
    // tables that are referenced by the rest, and then async load the rest.
    const tableName = file.split('.')[0]
    const exec = i < 2 ? spawnSync : spawn
    // Make the products table plural without having to modify the file when downloaded
    const table = tableName === 'product' ? 'products' : tableName

    exec(
      `psql ${PG_ARGS} -c "\copy ${table} FROM '${join(
        process.cwd(),
        DATA_REL_PATH,
        file
      )}' DELIMITER ',' CSV HEADER"`,
      spawnOptions
    )
  })
}

main()
