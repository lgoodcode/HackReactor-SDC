export default async function handleQuery(
  res: Response,
  query: (...args: any[]) => Promise<any>,
  ...args: any[]
) {
  try {
    const results = await query(...args)

    if (!results) {
      res.status(400).json({ error: 'Nothing found for given id', args })
      return
    }

    res.json(results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
