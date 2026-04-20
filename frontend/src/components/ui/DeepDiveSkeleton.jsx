export default function DeepDiveSkeleton() {
  return (
    <div className="dd">
      <div className="dd__back-btn dd__skel" style={{ width: 90, height: 36, borderRadius: 10 }} />

      <div className="dd__hero dd__hero--skel">
        <div className="dd__skel" style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0 }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="dd__skel" style={{ width: "55%", height: 14, borderRadius: 6 }} />
          <div className="dd__skel" style={{ width: "80%", height: 28, borderRadius: 8 }} />
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <div className="dd__skel" style={{ width: 80, height: 22, borderRadius: 20 }} />
            <div className="dd__skel" style={{ width: 80, height: 22, borderRadius: 20 }} />
            <div className="dd__skel" style={{ width: 80, height: 22, borderRadius: 20 }} />
          </div>
        </div>
      </div>

      <div className="dd__skel" style={{ width: "100%", height: 80, borderRadius: 14 }} />

      <div className="dd__grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="dd__card dd__card--skel" style={{ "--i": i }}>
            <div className="dd__skel" style={{ width: 36, height: 36, borderRadius: 10 }} />
            <div className="dd__skel" style={{ width: "60%", height: 14, borderRadius: 6, marginTop: 12 }} />
            <div className="dd__skel" style={{ width: "90%", height: 11, borderRadius: 5, marginTop: 8 }} />
            <div className="dd__skel" style={{ width: "75%", height: 11, borderRadius: 5, marginTop: 6 }} />
            <div className="dd__skel" style={{ width: "50%", height: 11, borderRadius: 5, marginTop: 6 }} />
          </div>
        ))}
      </div>
    </div>
  );
}