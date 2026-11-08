/**
 * Club quality bands used when a player has no published EA FC rating.
 * Bands approximate real-world squad level (not FIFA national ranking).
 */
export type ClubBand = "elite" | "top" | "strong" | "midPlus" | "mid" | "lower" | "amateur";

const ELITE = [
  "real madrid",
  "manchester city",
  "bayern munich",
  "bayern münchen",
  "liverpool",
  "arsenal",
  "barcelona",
  "fc barcelona",
  "paris saint-germain",
  "psg",
  "inter milan",
  "internazionale",
];

const TOP = [
  "chelsea",
  "manchester united",
  "tottenham hotspur",
  "tottenham",
  "atlético madrid",
  "atletico madrid",
  "juventus",
  "ac milan",
  "napoli",
  "borussia dortmund",
  "bayer leverkusen",
  "rb leipzig",
  "newcastle united",
  "aston villa",
  "benfica",
  "sporting cp",
  "porto",
  "fc porto",
  "ajax",
  "galatasaray",
  "fenerbahçe",
  "fenerbahce",
];

const STRONG = [
  "west ham united",
  "brighton",
  "brighton & hove albion",
  "crystal palace",
  "fulham",
  "brentford",
  "nottingham forest",
  "wolverhampton",
  "wolves",
  "everton",
  "bologna",
  "roma",
  "as roma",
  "lazio",
  "atalanta",
  "fiorentina",
  "torino",
  "sevilla",
  "real sociedad",
  "athletic bilbao",
  "athletic club",
  "villarreal",
  "real betis",
  "girona",
  "valencia",
  "lyon",
  "olympique lyonnais",
  "marseille",
  "olympique de marseille",
  "monaco",
  "as monaco",
  "lille",
  "nice",
  "rennes",
  "borussia mönchengladbach",
  "eintracht frankfurt",
  "vfb stuttgart",
  "sc freiburg",
  "wolfsburg",
  "hoffenheim",
  "werder bremen",
  "ajax amsterdam",
  "psv",
  "psv eindhoven",
  "feyenoord",
  "celtic",
  "rangers",
  "club brugge",
  "anderlecht",
  "red bull salzburg",
  "shakhtar donetsk",
  "dynamo kyiv",
  "al-hilal",
  "al hilal",
  "al-nassr",
  "al nassr",
  "al-ittihad",
  "inter miami",
  "olympiacos",
  "panathinaikos",
  "beşiktaş",
  "besiktas",
  "trabzonspor",
  "zenit",
  "sparta prague",
  "slavia prague",
  "dinamo zagreb",
  "red star belgrade",
  "partizan",
  "mamelodi sundowns",
  "al ahly",
  "wydad",
  "esperance",
];

const MID_PLUS = [
  "leicester",
  "leicester city",
  "southampton",
  "leeds united",
  "burnley",
  "sheffield united",
  "getafe",
  "osasuna",
  "celta vigo",
  "mallorca",
  "las palmas",
  "strasbourg",
  "lens",
  "nantes",
  "toulouse",
  "mainz",
  "augsburg",
  "union berlin",
  "heidenheim",
  "udinese",
  "sassuolo",
  "cagliari",
  "genoa",
  "monza",
  "empoli",
  "braga",
  "vitesse",
  "az alkmaar",
  "twente",
  "standard liège",
  "genk",
  "gent",
  "basel",
  "young boys",
  "copenhagen",
  "fc copenhagen",
  "malmö",
  "rosenborg",
  "bodø/glimt",
  "bodo/glimt",
  "flamengo",
  "palmeiras",
  "são paulo",
  "sao paulo",
  "corinthians",
  "fluminense",
  "internacional",
  "atlético mineiro",
  "river plate",
  "boca juniors",
  "racing club",
  "independiente",
  "monterrey",
  "club américa",
  "america",
  "tigres",
  "guadalajara",
  "lafc",
  "seattle sounders",
  "urawa",
  "kawasaki frontale",
  "yokohama f. marinos",
  "vissel kobe",
  "jeonbuk",
  "ulsan",
  "fc seoul",
  "al-ain",
  "alain",
  "persepolis",
  "esteghlal",
];

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function hit(club: string, list: string[]): boolean {
  const c = norm(club);
  return list.some((x) => {
    const n = norm(x);
    return c === n || c.includes(n) || n.includes(c);
  });
}

export function clubBand(club: string): ClubBand {
  const c = norm(club);
  if (!c || c === "free agent" || c === "free" || c === "unknown") return "amateur";
  if (hit(club, ELITE)) return "elite";
  if (hit(club, TOP)) return "top";
  if (hit(club, STRONG)) return "strong";
  if (hit(club, MID_PLUS)) return "midPlus";
  // Heuristics for remaining leagues
  if (
    /premier|bundesliga|serie a|la liga|ligue 1|eredivisie|primeira|championship/.test(c)
  ) {
    return "midPlus";
  }
  if (
    /mls|liga mx|j1|j2|k league|saudi|qatar|uae|egypt|south africa|argentina|brasil|brazil|chile|colombia|uruguay|peru|ekstraklasa|super lig|allsvenskan|eliteserien|a league|chinese|csl/.test(
      c,
    )
  ) {
    return "mid";
  }
  // Domestic / obscure clubs default lower
  if (
    /flora|levadia|nomme|faroe|klaksvik|b36|hb tórshavn|suriname|tajik|kyrgyz|comoros|madagascar|namibia|guinea-bissau|equatorial/.test(
      c,
    )
  ) {
    return "amateur";
  }
  return "lower";
}

/** Typical solid starter OVR at that club level */
export function clubBaseOvr(club: string): number {
  switch (clubBand(club)) {
    case "elite":
      return 84;
    case "top":
      return 80;
    case "strong":
      return 76;
    case "midPlus":
      return 72;
    case "mid":
      return 68;
    case "lower":
      return 62;
    case "amateur":
      return 55;
  }
}
