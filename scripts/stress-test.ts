import { readdir } from 'fs'
import { promisify } from 'util'
import { spawn } from 'child_process'

async function main() {
  // Check if the built server is present
  const files = await promisify(readdir)('dist')

  if (!files.includes('server.js')) {
    console.error('Server is not built. Building server...')

    const build = spawn('node', ['dist/server.js'], {
      shell: true,
      stdio: 'inherit',
    })

    // Wait for the build to finish
    await new Promise((res) => build.on('close', res))
  }

  // Spawn the server
  const server = spawn('node', ['dist/server.js'], {
    shell: true,
    stdio: 'inherit',
  })

  // Wait for the server to start
  await new Promise((res) => {
    console.log('Waiting for server to start...')
    setTimeout(res, 3000)
  })

  try {
    // Spawn the stress test
    const stressTest = spawn('npm', ['run', 'stress-test:run'], {
      shell: true,
      stdio: 'inherit',
    })

    // Wait for the stress test to finish
    await new Promise((resolve) => stressTest.on('close', resolve))
  } catch (err) {
    console.error(err)
  }

  // Kill the server
  server.kill()

  console.log('\nDone!')
}

main()
