import { spawn, spawnSync } from 'child_process'
import { readdir } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

// Start the app
const main = async () => {
  // Check if the built server is present
  const files = await promisify(readdir)('dist')

  if (!files.includes('server.js')) {
    console.error('Server is not built. Building server...')

    const build = spawn('npm', ['run build'], {
      shell: true,
      stdio: 'inherit',
    })

    // Wait for the build to finish
    await new Promise((res) => build.on('close', res))
  }

  // Spawn the PM2 process
  spawn('pm2', ['start -i 4 --name app', 'dist/server.js'], {
    shell: true,
    stdio: 'inherit',
  })

  // Wait for the server to start
  await new Promise((res) => setTimeout(res, 1000))

  // Spawn the stress test
  const test = spawn('pwsh', [join(process.cwd(), '.k6/stress-test.ps1')], {
    shell: true,
    stdio: 'inherit',
  })

  // Wait for the stress test to finish
  await new Promise((res) => test.on('close', res))

  // Kill the PM2 process
  spawnSync('pm2', ['delete app'], {
    shell: true,
    stdio: 'inherit',
  })

  console.log('\nDone!')

  process.exit(0)
}

main()
