import { NewsItems } from 'app/components/news'

export const metadata = {
  title: 'Matt | News',
  description: 'News items',
}


export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">news items</h1>
      <NewsItems />
    </section>
  )
}
