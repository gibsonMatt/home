import { NewsItems } from "app/components/news";
import BlogItems from "app/components/blogitems";

export default function Page() {
  return (
    <div>
          <h1 className="mb-4 text-3xl leading-none text-gray-900 dark:text-white font-bold">
          Matt Gibson
      </h1>
      <div className="flex flex-wrap">
        <figure className="p-8 md:p-0 mb-3 float-left mr-5 flex-initial">
          <img
            className="w-60 md:h-auto rounded drop-shadow-xl"
            src="/pic.png"
            alt=""
            width="384"
            height="512"
          ></img>
        </figure>

        <div className="flex-1">
          <p className="mb-4">
            My name is Matt Gibson. Currently I work as a bioinformatics engineer at <a className="hover:text-blue-600" href="https://lilly.com">Eli Lilly and Company</a>. I have a PhD in Evolutionary Genetics and Bioinformatics 
        from Indiana University, where I worked with <a className="hover:text-blue-600" href="https://moylelab.sitehost.iu.edu/">Leonie Moyle.</a>
          </p>
          I am interested in evolution, population genetics, 
        and developing computational solutions to complex biological 
        problems. I have published on many topics, including landscape genetics, 
        population genomics of invasive species, phylogenetic inference, molecular evolution, 
        imputation, and low pass sequencing.
        </div>
        <div className="my-8 block">
          <NewsItems />
          <h1 className="mb-4 text-3xl leading-none text-gray-900 dark:text-white font-bold mt-5">
            Articles
            </h1>
          <BlogItems />
        </div>
      </div>
    </div>
  );
}
