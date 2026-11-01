// Swap these placeholders for your real details.

export const site = {
  name: "Mittal Soni",
  initials: "Ms",
  email: "hello@mittalsoni.studio",
  phone: "+91 98200 00000",
  instagram: { handle: "@mittalsoni", href: "https://instagram.com/mittalsoni" },
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Behance", href: "https://behance.net/" },
    { label: "Instagram", href: "https://instagram.com/" },
  ],
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Artwork", href: "#artwork" },
  { label: "Contact", href: "#contact" },
];

export function photoId(id: number, w: number, h: number, gray = false) {
  return `https://picsum.photos/id/${id}/${w}/${h}${gray ? "?grayscale" : ""}`;
}

export const roles = [
  { title: "Director", icon: "🎬", note: "Short films, music videos & ads" },
  { title: "Cinematographer", icon: "🎥", note: "Light, lenses & movement" },
  { title: "Photographer", icon: "📷", note: "35mm film, people & streets" },
  { title: "Supervisor", icon: "🎛️", note: "Shoots from brief to final cut" },
  { title: "Artist", icon: "🎨", note: "Prints, collages & zines" },
];

/* ---------- work: three categories ----------
 * Poster per role; the title is part of the artwork. Keep w/h = the image's
 * real size. Files live in /public/work/. */

export const work = [
  { title: "Director", href: "/director", src: "/work/director-poster-square.jpg", w: 1254, h: 1254 },
  { title: "Photographer", href: "/photographer", src: "/work/photographer-poster.jpg", w: 1254, h: 1254 },
  { title: "Cinematographer", href: "/cinematographer", src: "/work/cinematographer-poster.jpg", w: 1254, h: 1254 },
];

/* ---------- artwork (pinterest grid) ----------
 * Replace `src` with your own files, e.g. "/art/01.jpg" (keep w/h = the
 * image's real size so the grid reserves the right space). */

export function photo(seed: string, w: number, h: number) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const sizes: [number, number][] = [
  [1200, 820], [900, 1350], [1200, 760], [1200, 860], [1000, 1250], [1000, 1000],
  [900, 1200], [1200, 800], [1000, 1300], [1200, 900], [900, 1150], [1200, 780],
  [1000, 1250], [1200, 840], [900, 1300], [1100, 1100], [1200, 800], [900, 1200],
  [1200, 880], [1000, 1350], [1200, 760], [900, 1150], [1200, 900], [1000, 1200],
];

const titles = [
  "Low tide, dog", "Last orders", "Washing line", "Haze", "Sunflower", "Window seat",
  "Crawford market", "Sea face", "Nani", "First rain", "Cricket boy", "Virar fast",
  "Mira, studio", "Morning ghat", "Kaali-peeli", "Hands", "Salt pans", "Blue hour",
  "Terrace", "Night bus", "Lamp", "Monsoon", "Chai stall", "Roll 36",
];

export const artworks = sizes.map(([w, h], i) => ({
  id: i + 1,
  src: photo(`art-${i + 1}`, w, h),
  w,
  h,
  title: titles[i],
  year: 2026 - (i % 5),
}));

/* ---------- director shelf ----------
 * One book per film. `thick` is the spine width and `tall` the book height
 * (px) so the shelf reads uneven, like a real one. `binding`/`ink` colour the
 * book; keep them light-ish so the page stays white. */

export type Film = {
  title: string;
  kind: string;
  year: number;
  runtime: string;
  format: string;
  role: string;
  logline: string;
  binding: string;
  ink: string;
  thick: number;
  tall: number;
};

export const films: Film[] = [
  { title: "Salt & Static", kind: "Short film", year: 2026, runtime: "14 min", format: "16mm, 4:3", role: "Writer · Director", logline: "A night-shift radio host in Alibaug keeps talking to the one caller who never answers.", binding: "#c87046", ink: "#fff8f1", thick: 58, tall: 300 },
  { title: "Kaali-peeli", kind: "Music video", year: 2026, runtime: "3 min 40", format: "Digital, 2.39:1", role: "Director", logline: "One taxi, one driver, one song on loop from Colaba to Bandra before sunrise.", binding: "#f1ece4", ink: "#111111", thick: 44, tall: 272 },
  { title: "Nani's Kitchen", kind: "Documentary", year: 2025, runtime: "22 min", format: "Super 8 + digital", role: "Director · DP", logline: "Three recipes, three generations, and the arguments that come with each one.", binding: "#1d1d1d", ink: "#f4efe7", thick: 64, tall: 286 },
  { title: "First Rain", kind: "Commercial", year: 2025, runtime: "60 sec", format: "Digital, 16:9", role: "Director", logline: "The first monsoon afternoon in a city that has been waiting all summer.", binding: "#dfe5df", ink: "#24302a", thick: 40, tall: 258 },
  { title: "Virar Fast", kind: "Short film", year: 2024, runtime: "11 min", format: "Digital, 1.85:1", role: "Writer · Director", logline: "Two strangers share a ladies' compartment and a secret for nine stations.", binding: "#e9dccb", ink: "#3a2a1c", thick: 52, tall: 294 },
  { title: "Blue Hour", kind: "Music video", year: 2024, runtime: "4 min 12", format: "35mm, 1.66:1", role: "Director", logline: "A singer walks home along Marine Drive while the streetlights come on behind her.", binding: "#d9dee8", ink: "#1e2636", thick: 46, tall: 266 },
  { title: "Roll 36", kind: "Experimental", year: 2023, runtime: "7 min", format: "Found film", role: "Director · Editor", logline: "Built from the last frame of every roll I shot in a year.", binding: "#f7f4ef", ink: "#c87046", thick: 38, tall: 280 },
];

/* ---------- cinematographer: edit suite ----------
 * `scenes` are the timeline segments (dur in seconds sets their width).
 * `reel` is the stills grid, one array per column; `scene` ties a still to
 * its segment. Swap `src` for your own frames, e.g. "/reel/04.jpg". */

export const scenes = [
  { title: "Cold open", dur: 9 },
  { title: "Ash & fire", dur: 10 },
  { title: "The long table", dur: 32 },
  { title: "The crowd", dur: 9 },
  { title: "Night interior", dur: 20 },
  { title: "Coast road", dur: 9 },
  { title: "Homecoming", dur: 9 },
  { title: "Blue water", dur: 12 },
];

export const reel = {
  meta: { camera: "Ghost cam · A-roll", specs: "2.39:1 · Vision3 · 24 fps" },
  columns: [
    [
      { scene: 1, src: photo("reel-ash", 1400, 790), ratio: "16 / 9" },
      { scene: 2, src: photo("reel-table", 1400, 790), ratio: "16 / 9" },
      { scene: 7, src: photo("reel-sea", 1400, 790), ratio: "16 / 9" },
    ],
    [
      { scene: 3, src: photo("reel-crowd", 1000, 560), ratio: "16 / 9" },
      { scene: 4, src: photo("reel-night", 1000, 560), ratio: "16 / 9" },
      { scene: 6, src: photo("reel-home", 1000, 560), ratio: "16 / 9" },
      { scene: 0, src: photo("reel-open", 1000, 560), ratio: "16 / 9" },
    ],
    [
      { scene: 5, src: photo("reel-coast", 800, 1420), ratio: "9 / 16" },
      { scene: 7, src: photo("reel-water", 800, 500), ratio: "16 / 10" },
      { scene: 0, src: photo("reel-dust", 800, 1000), ratio: "4 / 5" },
    ],
  ],
};

/* ---------- photographer: timeline ----------
 * Newest first; the ruler under the strip marks where each month starts.
 * Keep w/h = the image's real size. Swap `src` for your own photos, e.g.
 * "/photos/01.jpg". */

const months = [["March", 2026], ["February", 2026], ["January", 2026], ["December", 2025], ["November", 2025], ["October", 2025]] as const;
const places = ["Bandra", "Alibaug", "Crawford Market", "Sea face", "Virar", "Colaba", "Dadar", "Worli"];
const shapes: [number, number][] = [[1000, 1260], [1000, 1330], [1200, 1010], [1000, 1260], [1200, 1010], [1000, 1400], [1200, 900], [1000, 1250]];

export const photographs = Array.from({ length: 24 }, (_, i) => {
  const [w, h] = shapes[i % shapes.length];
  const [month, year] = months[Math.floor(i / 4)];
  return { id: i + 1, src: photo(`timeline-${i + 1}`, w, h), w, h, month, year, place: places[i % places.length] };
});


/* ---------- testimonials ----------
 * Placeholder clients — swap in real quotes, names and photos
 * (e.g. avatar: "/clients/ana.jpg"). `project` ties the quote to a piece of work. */

export const testimonials = [
  {
    quote:
      "Mittal walked onto a set that was already behind schedule and somehow made it calmer. We got the shot, we got two we hadn't planned, and the crew still talks about that night.",
    name: "Ananya Rao",
    role: "Producer, Northlight Films",
    project: "Salt & Static",
    kind: "Short film",
    avatar: photoId(64, 160, 160, true),
  },
  {
    quote:
      "Most people pitch a look. Mittal pitched a feeling, then showed up with a shot list that got us there in a single day.",
    name: "Kabir Mehta",
    role: "Musician",
    project: "Kaali-peeli",
    kind: "Music video",
    avatar: photoId(22, 160, 160, true),
  },
  {
    quote:
      "Our brief was forty words long. The film said more than our whole brand book, and it came in under budget.",
    name: "Sara D'Souza",
    role: "Brand lead, Monsoon & Co.",
    project: "First Rain",
    kind: "Commercial",
    avatar: photoId(65, 160, 160, true),
  },
  {
    quote:
      "She notices the light nobody else sees. Every frame from that shoot is still on our studio wall.",
    name: "Rohan Iyer",
    role: "Creative director, Field Notes",
    project: "Blue Hour",
    kind: "Music video",
    avatar: photoId(1005, 160, 160, true),
  },
  {
    quote:
      "Patient with my family, honest with me, and ruthless in the edit. I didn't know my own story until I saw it cut.",
    name: "Meera Shah",
    role: "Subject & co-writer",
    project: "Nani's Kitchen",
    kind: "Documentary",
    avatar: photoId(338, 160, 160, true),
  },
];
