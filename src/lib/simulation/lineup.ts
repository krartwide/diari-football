import { FORMATIONS, positionFit } from "@/data/formations";
import type { Player, PlayerMatchLine, Position, Team } from "@/types/football";

export function selectStartingXi(team: Team): {
  starters: Player[];
  bench: Player[];
  slots: { player: Player; position: Position }[];
} {
  const formation = FORMATIONS[team.tactics.formation] ?? FORMATIONS["4-3-3"]!;
  const available = [...team.players].sort((a, b) => b.ovr - a.ovr);
  const used = new Set<string>();
  const slots: { player: Player; position: Position }[] = [];

  for (const slot of formation.slots) {
    let best: Player | undefined;
    let bestScore = -1;
    for (const p of available) {
      if (used.has(p.id)) continue;
      const fit = positionFit(p.position, slot.position);
      const score = p.ovr * fit + (p.isCaptain ? 1 : 0);
      if (score > bestScore) {
        bestScore = score;
        best = p;
      }
    }
    if (best) {
      used.add(best.id);
      slots.push({ player: best, position: slot.position });
    }
  }

  const starters = slots.map((s) => s.player);
  const bench = available.filter((p) => !used.has(p.id)).slice(0, 12);
  return { starters, bench, slots };
}

export function toMatchLines(
  starters: { player: Player; position: Position }[],
  bench: Player[],
): PlayerMatchLine[] {
  const lines: PlayerMatchLine[] = starters.map((s) => ({
    playerId: s.player.id,
    name: s.player.name,
    number: s.player.number,
    position: s.position,
    started: true,
    onPitch: true,
    minutesPlayed: 0,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCard: false,
    fouls: 0,
    shots: 0,
    shotsOnTarget: 0,
    passes: 0,
    passesCompleted: 0,
    tackles: 0,
    interceptions: 0,
    injured: false,
    rating: 6.5,
    isCaptain: !!s.player.isCaptain,
  }));

  for (const p of bench) {
    lines.push({
      playerId: p.id,
      name: p.name,
      number: p.number,
      position: p.position,
      started: false,
      onPitch: false,
      minutesPlayed: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCard: false,
      fouls: 0,
      shots: 0,
      shotsOnTarget: 0,
      passes: 0,
      passesCompleted: 0,
      tackles: 0,
      interceptions: 0,
      injured: false,
      rating: 6.0,
      isCaptain: !!p.isCaptain,
    });
  }
  return lines;
}
