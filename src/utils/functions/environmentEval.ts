import { exec } from 'child_process'

export default function environmentEval(command: string) {
  return new Promise(resolve => {
    exec(command, (err, res) => {
      if (err) resolve(err)
      else resolve(res)
    })
  })
}
