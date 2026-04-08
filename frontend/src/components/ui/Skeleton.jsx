export default function Skeleton() {
  let data = [1, 2, 3];

  if (window.innerWidth <= 470) {
    data = [1, 2];
  }
  return (
    <div className="dash">
      {/* Header skeleton */}
      <div className="dash__header">
        <div className="dash__skel dash__skel--title" />
        <div className="dash__skel dash__skel--sub" />
      </div>
      {/* Cards skeleton */}
      <div className="dash__stats">
        {data.map((i) => (
          <div key={i} className="dash__card dash__card--skel">
            <div className="dash__skel dash__skel--icon" />
            <div className="dash__skel dash__skel--val" />
            <div className="dash__skel dash__skel--label" />
          </div>
        ))}
      </div>
      {/* Table skeleton */}
      <div className="dash__table-wrap">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="dash__skel dash__skel--row"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
    </div>
  );
}
