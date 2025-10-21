import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Ban, ExternalLink as IconLink } from "lucide-react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <Empty className="from-muted/50 to-background h-screen bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Ban />
        </EmptyMedia>
        <EmptyTitle>Not Found</EmptyTitle>
        <EmptyDescription>
          You&apos;re accessing a page that doesn&apos;t exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to={"/dashboard/departments"} className={buttonVariants({})}>
          <IconLink />
          Go Back
        </Link>
      </EmptyContent>
    </Empty>
  );
}
