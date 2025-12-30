import Image from "next/image";
import Link from "next/link";

export default function Author({ name, image, linkedinUrl, twitterUsername }) {
  return (
    <div className="flex items-center gap-3">
      {image && (
        <Image
          src={image}
          alt={name || "Auteur"}
          width={48}
          height={48}
          className="rounded-full border"
        />
      )}
      <div className="flex flex-col">
        {name && <span className="font-semibold">{name}</span>}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {linkedinUrl && (
            <Link href={linkedinUrl} className="hover:text-primary">
              LinkedIn
            </Link>
          )}
          {twitterUsername && (
            <>
              <span>•</span>
              <Link
                href={`https://twitter.com/${twitterUsername}`}
                className="hover:text-primary"
              >
                @{twitterUsername}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
