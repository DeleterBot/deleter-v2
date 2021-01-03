export default function () {
  return function (target: any, path: any) {
    if (!path || typeof path !== 'string') return null

    return target
  }
}