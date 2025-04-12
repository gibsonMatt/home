export default async function Page({
  params,
}: {
  params: Promise<{ post: string }>
}) {

  const { post } = await params
  console.log(post)
  const mod = await import(`content/${post}.mdx`)
  const { default: Post, meta } = mod
  return (
    <div>

      <h1>{meta.title}</h1>
      <p className="text-sm text-neutral-900 tracking-tight">{meta.date}</p>

      {meta.tags.map((tag) => {
        return (
          <span className="tracking-tight bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{tag}</span>
        )

      })


      }


      <Post />
    </div>

  )
}

export function generateStaticParams() {
  return [{ slug: 'first-post' }]
}


export const dynamicParams = false