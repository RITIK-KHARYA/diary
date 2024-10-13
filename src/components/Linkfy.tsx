import { match } from "assert";
import { Key } from "lucide-react";
import { LinkIt, LinkItUrl } from "react-linkify-it";
import Link from "next/link";
interface LinkfyProps {
  children: React.ReactNode;
}

export default function Linkfy({ children }: LinkfyProps) {
  return (
    <LinkfyUsername>
      <LinkifyHashtag>
        <LinkifyUrl>{children}</LinkifyUrl>
      </LinkifyHashtag>
    </LinkfyUsername>
  );
}

function LinkifyUrl({ children }: LinkfyProps) {
  return (
    <LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
  );
}

function LinkfyUsername({ children }: LinkfyProps) {
  return (
    <LinkIt
      regex={/[@][a-zA-Z0-9_-]+/g}
      component={(match, Key) => {
        return (
          <Link
            key={Key}
            className="text-primary hover:underline hover:text-green-500"
            href={`/user/${match.slice(1)}`}
            suppressHydrationWarning
          >
            {match}
          </Link>
        );
      }}
    >
      {children}
    </LinkIt>
  );
}
function LinkifyHashtag({ children }: LinkfyProps) {
  return (
    <LinkIt
      regex={/(#[a-zA-Z0-9_-]+)/g}
      component={(match, Key) => (
        <Link
          key={Key}
          className="text-primary hover:underline hover:text-green-500"
          href={`/hashtag/${match.slice(1)}`}
          suppressHydrationWarning
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
}
