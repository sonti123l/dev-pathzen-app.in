import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const TruncatedItem = ({ name }: { name: string }) => {
  const MAX = 25;
  const isTruncated = name.length > MAX;
  const displayName = isTruncated ? name.slice(0, MAX) + "..." : name;

  if (!isTruncated) return <span>{name}</span>;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{displayName}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TruncatedItem;