import { BlogPosts } from 'app/components/posts'
import { NewsItems } from 'app/components/news'

export default function Page() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Matt Gibson
      </h1>
      <div className='flex flex-wrap'>
        <figure className="p-8 md:p-0 mb-3 float-left mr-5 flex-initial">
          <img className="w-60 md:h-auto rounded drop-shadow-xl" src="/pic.png" alt="" width="384" height="512"></img>
        </figure>

    <div className='flex-1'>
        <p className="mb-4">
          {`My name is Matt Gibson. I am a senior data scientist/statistical geneticist 
        in biotech (currently at Gencove). I have a PhD in Evolutionary Genetics and Bioinformatics 
        from Indiana University, where I worked with Leonie Moyle. `}
        </p>
        {`I am interested in evolution, population genetics, 
        and developing computational solutions to complex biological 
        problems. I have published on many topics, including landscape genetics, 
        population genomics of invasive species, phylogenetic inference, molecular evolution, 
        imputation, and low pass sequencing.`}
        </div>
      <div className="my-8 block">
        <NewsItems />
      </div>
      </div>

    </div >
  )
}
