import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ data, priority = false }) {
  return (
    <article className="post type-post panel vstack gap-3 rounded-3 p-2 pb-3 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
      <figure className="featured-image m-0 rounded ratio ratio-3x2 rounded-2 uc-transition-toggle overflow-hidden">
        <Image
          className="media-cover image uc-transition-scale-up uc-transition-opaque"
          src={data.image || "/images/default-blog.webp"}
          width={1280}
          height={854}
          alt={data.title}
          priority={priority}
        />
        <Link
          href={`/blog/${data.slug}`}
          className="position-cover"
          data-caption={data.title}
        />
      </figure>
      <div className="panel vstack gap-2 px-2">
        <header className="panel vstack items-start gap-1 lg:gap-2">
          <h3 className="h5 m-0">
            <Link
              className="text-none hover:text-primary transition-colors"
              href={`/blog/${data.slug}`}
            >
              {data.title}
            </Link>
          </h3>
        </header>
        <p className="fs-6 text-muted-foreground line-clamp-3">
          {data.description}
        </p>
        <div className="post-meta hstack gap-2 ft-tertiary fs-7 text-muted">
          {data.author && (
            <span className="hstack gap-1">
              {data.authorImage && (
                <Image
                  src={data.authorImage}
                  width={24}
                  height={24}
                  alt={data.author}
                  className="w-24px h-24px rounded-circle"
                />
              )}
              <span>{data.author}</span>
            </span>
          )}
          {data.publishedAt && (
            <>
              <span>•</span>
              <time dateTime={data.publishedAt}>
                {new Date(data.publishedAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </>
          )}
        </div>
        {data.tags && data.tags.length > 0 && (
          <div className="post-tags hstack gap-1 flex-wrap">
            {data.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="badge bg-secondary text-dark px-2 py-1 fs-7 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

