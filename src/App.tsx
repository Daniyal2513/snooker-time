import { useEffect, useMemo, useState } from "react";

type IconName =
  | "arrow"
  | "calendar"
  | "clock"
  | "gamepad"
  | "instagram"
  | "map"
  | "menu"
  | "phone"
  | "pool"
  | "spark"
  | "table"
  | "target"
  | "users"
  | "x";

const photoUrls = {
  hero: "https://images.unsplash.com/photo-1776513726158-403f72e6e5a2?auto=format&fit=crop&w=2000&q=88",
  table: "https://images.unsplash.com/photo-1777712673276-b79c063c6263?auto=format&fit=crop&w=1200&q=85",
  player: "https://images.unsplash.com/photo-1788617822142-47993d372416?auto=format&fit=crop&w=1200&q=85",
  club: "https://images.unsplash.com/photo-1788617822145-e1a8fe24a9e8?auto=format&fit=crop&w=1200&q=85",
};

const navItems = [
  ["Home", "home"],
  ["Our Ambiance", "ambiance"],
  ["Prices", "prices"],
  ["Bookings", "bookings"],
  ["Contact", "contact"],
];

const games = [
  { name: "Snooker", rate: 10, unit: "minute", icon: "target" as IconName, detail: "3 pro tables" },
  { name: "Pool", rate: 10, unit: "minute", icon: "pool" as IconName, detail: "1 pool table" },
  { name: "Table Tennis", rate: 600, unit: "hour", icon: "table" as IconName, detail: "1 arena" },
  { name: "PS5 Lounge", rate: 800, unit: "hour", icon: "gamepad" as IconName, detail: "Private lounge" },
];

const durations = [
  { label: "30 minutes", minutes: 30 },
  { label: "1 hour", minutes: 60 },
  { label: "2 hours", minutes: 120 },
  { label: "3 hours", minutes: 180 },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    gamepad: <><path d="M7.5 8h9a5 5 0 0 1 4.8 6.3l-1 3.5a2.2 2.2 0 0 1-3.7 1l-1.8-1.8H9.2l-1.8 1.8a2.2 2.2 0 0 1-3.7-1l-1-3.5A5 5 0 0 1 7.5 8Z" /><path d="M7 12v4M5 14h4M16 13h.01M19 15h.01" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />,
    pool: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="m5.6 5.6 4.3 4.3M14.1 14.1l4.3 4.3" /></>,
    spark: <><path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3Z" /><path d="m5 15-.6 2.4L2 18l2.4.6L5 21l.6-2.4L8 18l-2.4-.6L5 15Z" /></>,
    table: <><path d="M4 6h16v8H4zM7 14l-2 7M17 14l2 7M12 6v8" /><path d="M9 10h.01M15 10h.01" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy?: string }) {
  return (
    <div className="section-heading reveal">
      <div className="eyebrow"><span />{eyebrow}</div>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function CueAnimation() {
  return (
    <div className="cue-scene" aria-hidden="true">
      <div className="cue-stick" />
      <div className="white-ball" />
      <div className="red-ball red-one" />
      <div className="red-ball red-two" />
      <div className="red-ball red-three" />
      <div className="impact-ring" />
    </div>
  );
}

function CalendarPicker({ selected, onSelect }: { selected: Date | null; onSelect: (date: Date) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const year = view.getFullYear();
  const month = view.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const offset = new Date(year, month, 1).getDay();
  const cells = Array.from({ length: offset + days }, (_, index) => index < offset ? null : index - offset + 1);
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  return (
    <div className="calendar">
      <div className="calendar-head">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setView(new Date(year, month - 1, 1))}
          disabled={year === today.getFullYear() && month === today.getMonth()}
        >‹</button>
        <strong>{view.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</strong>
        <button type="button" aria-label="Next month" onClick={() => setView(new Date(year, month + 1, 1))}>›</button>
      </div>
      <div className="calendar-grid weekdays">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="calendar-grid">
        {cells.map((day, index) => {
          if (!day) return <span key={`blank-${index}`} />;
          const date = new Date(year, month, day);
          const disabled = date <= today;
          const active = selected ? isSameDay(date, selected) : false;
          return (
            <button
              type="button"
              key={day}
              disabled={disabled}
              className={`${disabled ? "disabled" : ""} ${active ? "active" : ""}`}
              onClick={() => onSelect(date)}
              aria-label={`${date.toLocaleDateString()}${disabled ? ", unavailable" : ""}`}
            >{day}</button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState("Snooker");
  const [duration, setDuration] = useState(60);
  const [time, setTime] = useState("08:00 PM");
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const total = useMemo(() => {
    if (selectedGame === "Snooker" || selectedGame === "Pool") return duration * 10;
    const hourly = selectedGame === "Table Tennis" ? 600 : 800;
    return Math.round((duration / 60) * hourly);
  }, [selectedGame, duration]);

  return (
    <main>
      <nav className={scrolled ? "nav scrolled" : "nav"}>
        <a className="brand" href="#home" aria-label="It's Snooker Time home">
          <img className="brand-logo header-logo" src="/its-snooker-time-logo.png" alt="It's Snooker Time Cafe" />
        </a>
        <div className="nav-links">
          {navItems.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </div>
        <a className="button small nav-cta" href="#bookings">Book now <Icon name="arrow" size={16} /></a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          <Icon name={menuOpen ? "x" : "menu"} />
        </button>
        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </div>
        )}
      </nav>

      <section id="home" className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${photoUrls.hero})` }} />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="availability"><span /> Karachi&apos;s premium cue sports lounge <strong>Open 24/7</strong></div>
          <h1>Precision.<br /><em>Play.</em> Perfection.</h1>
          <p>Enter a world built for those who take their game seriously. Pro tables, private atmosphere, every hour of the day.</p>
          <div className="hero-actions">
            <a className="button" href="#bookings">Reserve your spot <Icon name="arrow" /></a>
            <a className="text-link" href="#ambiance"><span className="play">↓</span> Explore the lounge</a>
          </div>
        </div>
        <div className="hero-index"><span>01</span><div /><small>05</small></div>
        <CueAnimation />
        <div className="scroll-cue"><span>Scroll to discover</span><i /></div>
      </section>

      <section id="ambiance" className="ambiance section">
        <SectionTitle
          eyebrow="Inside the club"
          title={<>Where focus meets <em>atmosphere.</em></>}
          copy="Every detail is composed for the game—from tournament-grade cloth to lighting that keeps every shot crystal clear."
        />
        <div className="gallery">
          <figure className="gallery-main reveal">
            <img src={photoUrls.table} alt="Professional billiards table with cues and balls" />
            <figcaption><span>01</span><strong>The main floor</strong><small>Professional-grade tables</small></figcaption>
          </figure>
          <figure className="gallery-tall reveal">
            <img src={photoUrls.player} alt="Player lining up a shot beneath focused table lighting" />
            <figcaption><span>02</span><strong>Dialed-in focus</strong><small>Lighting engineered for play</small></figcaption>
          </figure>
          <figure className="gallery-wide reveal">
            <img src={photoUrls.club} alt="Players enjoying a premium cue sports lounge" />
            <figcaption><span>03</span><strong>Late-night sessions</strong><small>Karachi, around the clock</small></figcaption>
          </figure>
        </div>
        <div className="inventory">
          {[
            ["target", "03", "Professional", "Snooker tables"],
            ["pool", "01", "Competition", "Pool table"],
            ["table", "01", "Dedicated", "TT arena"],
            ["gamepad", "01", "Private", "PS5 lounge"],
          ].map(([icon, number, label, title]) => (
            <div className="inventory-item reveal" key={title}>
              <div className="inventory-icon"><Icon name={icon as IconName} size={25} /></div>
              <span>{number}</span><div><small>{label}</small><strong>{title}</strong></div>
            </div>
          ))}
        </div>
      </section>

      <section id="prices" className="prices section">
        <div className="prices-top">
          <SectionTitle eyebrow="Rates & access" title={<>Play your way.<br /><em>Stay as long as you like.</em></>} />
          <p className="section-copy reveal">Transparent rates. No membership required. Just arrive ready to play—or reserve ahead for certainty.</p>
        </div>
        <div className="price-grid">
          {games.map((game, index) => (
            <article className={`price-card reveal ${index === 0 ? "featured" : ""}`} key={game.name}>
              {index === 0 && <div className="popular">Most played</div>}
              <div className="price-icon"><Icon name={game.icon} size={25} /></div>
              <div className="price-number">0{index + 1}</div>
              <h3>{game.name}</h3>
              <div className="rate"><sup>Rs.</sup><strong>{game.rate}</strong><span>/ {game.unit}</span></div>
              <div className="rate-lines">
                <p><span>Half hour</span><strong>Rs. {game.name === "PS5 Lounge" ? "400" : "300"}</strong></p>
                <p><span>One hour</span><strong>Rs. {game.name === "PS5 Lounge" ? "800" : "600"}</strong></p>
              </div>
              <a href="#bookings">Choose this game <Icon name="arrow" size={17} /></a>
            </article>
          ))}
        </div>
        <p className="rate-note"><Icon name="spark" size={16} /> Flexible hourly and half-hourly rates tailored to your game.</p>
      </section>

      <section id="bookings" className="bookings section">
        <SectionTitle
          eyebrow="Reserve your table"
          title={<>Your next session<br /><em>starts here.</em></>}
          copy="Select your game, date and time. We'll have everything ready when you arrive."
        />
        <div className="booking-shell reveal">
          <div className="booking-form">
            <div className="step-label"><span>01</span><div><strong>Choose a game</strong><small>Select your experience</small></div></div>
            <div className="game-options">
              {games.map((game) => (
                <button type="button" key={game.name} className={selectedGame === game.name ? "selected" : ""} onClick={() => setSelectedGame(game.name)}>
                  <Icon name={game.icon} size={22} /><span><strong>{game.name}</strong><small>{game.detail}</small></span>
                </button>
              ))}
            </div>

            <div className="booking-row">
              <div>
                <div className="step-label"><span>02</span><div><strong>Pick a date</strong><small>24-hour notice required</small></div></div>
                <CalendarPicker selected={date} onSelect={setDate} />
              </div>
              <div>
                <div className="step-label"><span>03</span><div><strong>Set your session</strong><small>Duration and start time</small></div></div>
                <label className="field">
                  <span>Duration</span>
                  <select value={duration} onChange={(event) => setDuration(Number(event.target.value))}>
                    {durations.map((item) => <option value={item.minutes} key={item.minutes}>{item.label}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Time slot</span>
                  <select value={time} onChange={(event) => setTime(event.target.value)}>
                    {["12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM", "10:00 PM", "12:00 AM"].map((slot) => <option key={slot}>{slot}</option>)}
                  </select>
                </label>
                <div className="notice"><Icon name="clock" size={19} /><p><strong>Plan one day ahead.</strong> To ensure the best experience, all bookings require at least a 24-hour advance notice. Same-day bookings are not available.</p></div>
              </div>
            </div>
          </div>
          <aside className="booking-summary">
            <div className="summary-top"><small>Your reservation</small><span>04</span></div>
            <h3>Ready when<br />you are.</h3>
            <div className="summary-list">
              <p><span><Icon name="target" size={17} />Game</span><strong>{selectedGame}</strong></p>
              <p><span><Icon name="calendar" size={17} />Date</span><strong>{date ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Select date"}</strong></p>
              <p><span><Icon name="clock" size={17} />Time</span><strong>{time}</strong></p>
              <p><span><Icon name="users" size={17} />Duration</span><strong>{durations.find((item) => item.minutes === duration)?.label}</strong></p>
            </div>
            <div className="total"><span>Estimated total<small>Pay at the lounge</small></span><strong><sup>Rs.</sup>{total.toLocaleString()}</strong></div>
            <a
              className={`button summary-button ${!date ? "disabled-button" : ""}`}
              href={date ? `https://wa.me/923043138291?text=${encodeURIComponent(`Booking request: ${selectedGame}, ${date.toLocaleDateString()}, ${time}, ${duration} minutes. Total Rs. ${total}.`)}` : "#bookings"}
              target={date ? "_blank" : undefined}
              rel="noreferrer"
            >Confirm via WhatsApp <Icon name="arrow" /></a>
            <small className="secure-note">No payment required today</small>
          </aside>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-intro section">
          <div className="eyebrow reveal"><span /> Find your table</div>
          <h2 className="reveal">The lights are on.<br /><em>All that&apos;s missing is you.</em></h2>
          <a className="button reveal" href="tel:+923043138291">Call to reserve <Icon name="phone" /></a>
        </div>
        <div className="contact-grid section">
          <div className="contact-details">
            <a className="brand footer-brand" href="#home" aria-label="It's Snooker Time home">
              <img className="brand-logo footer-logo" src="/its-snooker-time-logo.png" alt="It's Snooker Time Cafe" />
            </a>
            <p>A premium gaming lounge crafted for serious play and memorable nights.</p>
            <div className="detail-row"><Icon name="map" /><div><small>Visit us</small><strong>D-3 Block A, North Nazimabad<br />Karachi, Pakistan 75600</strong></div></div>
            <div className="detail-row"><Icon name="phone" /><div><small>Call anytime</small><a href="tel:+923043138291">+92 304 3138291</a></div></div>
            <div className="detail-row"><Icon name="clock" /><div><small>Opening hours</small><strong>Open 24 hours · 7 days</strong></div></div>
            <a className="instagram" href="https://www.instagram.com/its_snookertime/" target="_blank" rel="noreferrer"><Icon name="instagram" /> @its_snookertime <Icon name="arrow" size={16} /></a>
          </div>
          <div className="map-wrap">
            <iframe
              title="It's Snooker Time location in North Nazimabad"
              src="https://www.openstreetmap.org/export/embed.html?bbox=67.025%2C24.915%2C67.075%2C24.955&layer=mapnik&marker=24.935%2C67.05"
              loading="lazy"
            />
            <div className="map-pin"><span /><strong>IT&apos;S SNOOKER TIME</strong><small>North Nazimabad</small></div>
          </div>
        </div>
        <footer className="footer section">
          <span>© {new Date().getFullYear()} It&apos;s Snooker Time</span>
          <div>{navItems.slice(0, 4).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div>
          <a href="#home">Back to top ↑</a>
        </footer>
      </section>
    </main>
  );
}
