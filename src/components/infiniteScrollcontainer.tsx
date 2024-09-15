import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  onBottomReached: () => void;
  children: React.ReactNode;
  classname?: string;
}

export default function InfiniteScrollContainer({
  onBottomReached,
  children,
  classname,
}: InfiniteScrollContainerProps) {
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={classname}>
      {children}
      <div ref={ref} />
      <div className="h-4"></div>
    </div>
  );
}
