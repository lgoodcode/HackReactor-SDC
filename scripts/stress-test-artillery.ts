import { readdir } from 'fs'
import { promisify } from 'util'
import { spawn, spawnSync } from 'child_process'

async function main() {
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
  spawn('pm2', ['start -i max --name app', 'dist/server.js'], {
    shell: true,
    stdio: 'inherit',
  })

  // Wait for the server to start
  await new Promise((res) => {
    console.log('Waiting for server to start...')
    setTimeout(res, 3000)
  })

  // Spawn the stress test
  const stressTest = spawn('npm', ['run', 'stress-test:artillery:run'], {
    shell: true,
    stdio: 'inherit',
  })

  // Wait for the stress test to finish
  await new Promise((resolve) => stressTest.on('close', resolve))

  // Kill the PM2 process
  spawnSync('pm2', ['delete app'], {
    shell: true,
    stdio: 'inherit',
  })

  console.log('\nDone!')

  process.exit(0)
}

main()
