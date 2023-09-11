import Link from 'next/link'

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to Home</Link>
        {/* <a href="/">Back to Home</a> */}
      </h2>
    </>
  )
}
