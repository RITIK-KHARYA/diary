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
    rootMargin: "200px",
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
    </div>
  );
}
