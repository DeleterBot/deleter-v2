export default function (req: Record<string, any>) {
  return req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip
}
