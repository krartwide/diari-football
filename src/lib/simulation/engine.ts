import { nanoid } from "nanoid";
import type {
  EventGraphic,
  MatchEvent,
  MatchResult,
  MatchSettings,
  Player,
  PlayerMatchLine,
  Team,
  TeamMatchStats,
} from "@/types/football";
import { effectiveAttributes } from "@/lib/ovr";
import { selectStartingXi, toMatchLines } from "./lineup";
import { createRng, type Rng } from "./rng";

function emptyStats(): TeamMatchStats {
  return {
    goals: 0,
    possession: 50,
    contestedPossession: 0,
    shots: 0,
    shotsOnTarget: 0,
    corners: 0,
    passes: 0,
    passesCompleted: 0,
    fouls: 0,
    yellowCards: 0,
    redCards: 0,
    offsides: 0,
    tackles: 0,
    interceptions: 0,
    saves: 0,
  };
}

function mentalityMult(
  m: Team["tactics"]["mentality"],
): { attack: number; defense: number } {
  switch (m) {
    case "ultra-defensive":
      return { attack: 0.75, defense: 1.25 };
    case "defensive":
      return { attack: 0.88, defense: 1.12 };
    case "attacking":
      return { attack: 1.12, defense: 0.9 };
    case "ultra-attacking":
      return { attack: 1.25, defense: 0.78 };
    default:
      return { attack: 1, defense: 1 };
  }
}

function personalityBoost(p: Team["manager"]["personality"]): number {
  const map: Record<string, number> = {
    공격적: 1.06,
    수비적: 0.94,
    균형: 1,
    압박형: 1.04,
    점유율: 1.02,
    카리스마: 1.03,
    냉철: 1.01,
    열정적: 1.05,
    실험적: 1.0,
    수비우선: 0.92,
  };
  return map[p] ?? 1;
}

function avgOvr(lines: PlayerMatchLine[], players: Player[]): number {
  const on = lines.filter((l) => l.onPitch && !l.redCard);
  if (on.length === 0) return 70;
  return (
    on.reduce((s, l) => {
      const p = players.find((x) => x.id === l.playerId);
      return s + (p?.ovr ?? 70);
    }, 0) / on.length
  );
}

function attackStrength(team: Team, lines: PlayerMatchLine[]): number {
  const on = lines.filter((l) => l.onPitch && !l.redCard);
  const attackers = on.filter((l) =>
    ["ST", "CF", "LW", "RW", "CAM", "LM", "RM"].includes(l.position),
  );
  const pool = attackers.length ? attackers : on;
  const base =
    pool.reduce((s, l) => {
      const p = team.players.find((x) => x.id === l.playerId);
      const a = p ? effectiveAttributes(p) : null;
      return s + (a?.shooting ?? 70) + (a?.dribbling ?? 70);
    }, 0) /
    (pool.length * 2);
  const m = mentalityMult(team.tactics.mentality);
  return base * m.attack * personalityBoost(team.manager.personality) * (0.9 + team.tactics.tempo / 50);
}

function defenseStrength(team: Team, lines: PlayerMatchLine[]): number {
  const on = lines.filter((l) => l.onPitch && !l.redCard);
  const defs = on.filter((l) =>
    ["GK", "CB", "LB", "RB", "LWB", "RWB", "CDM"].includes(l.position),
  );
  const pool = defs.length ? defs : on;
  const base =
    pool.reduce((s, l) => {
      const p = team.players.find((x) => x.id === l.playerId);
      const a = p ? effectiveAttributes(p) : null;
      const gk = a?.goalkeeping ?? 0;
      return s + (a?.defending ?? 70) + gk * 0.3 + (a?.physical ?? 70) * 0.3;
    }, 0) / pool.length;
  const m = mentalityMult(team.tactics.mentality);
  return base * m.defense * (0.95 + team.tactics.defensiveLine / 80);
}

function pickOnPitch(
  lines: PlayerMatchLine[],
  team: Team,
  prefer: string[],
  rng: Rng,
): PlayerMatchLine | undefined {
  const candidates = lines.filter(
    (l) => l.onPitch && !l.redCard && !l.injured,
  );
  const preferred = candidates.filter((l) => prefer.includes(l.position));
  const pool = preferred.length ? preferred : candidates;
  if (!pool.length) return undefined;
  const weights = pool.map((l) => {
    const p = team.players.find((x) => x.id === l.playerId);
    return Math.max(1, (p?.ovr ?? 70) - 50);
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rng.next() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i]!;
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

function goalGraphic(rng: Rng, isPenalty: boolean): EventGraphic {
  const shotFrom = isPenalty
    ? { x: 88.5, y: 50 }
    : { x: 70 + rng.next() * 22, y: 15 + rng.next() * 70 };
  const goalEntry = {
    x: 20 + rng.next() * 60,
    y: 15 + rng.next() * 70,
  };
  const mid = {
    x: (shotFrom.x + 100) / 2,
    y: (shotFrom.y + goalEntry.x) / 2 + (rng.next() - 0.5) * 20,
  };
  return {
    goal: {
      shotFrom,
      trajectory: [shotFrom, mid, { x: 100, y: goalEntry.x }],
      goalEntry,
      bodyPart: rng.pick(["right_foot", "left_foot", "head", "other"]),
      shotType: isPenalty
        ? "penalty"
        : rng.pick(["ground", "curled", "driven", "chip", "volley"]),
    },
  };
}

function foulGraphic(rng: Rng): EventGraphic {
  return {
    foul: {
      location: { x: 20 + rng.next() * 60, y: 10 + rng.next() * 80 },
      foulerAction: rng.pick([
        "trip",
        "push",
        "hold",
        "high_foot",
        "charge",
        "handball",
        "dangerous",
      ]),
      severity: rng.pick(["soft", "medium", "hard"]),
      victimDirection: rng.next() * 360,
    },
  };
}

function offsideGraphic(rng: Rng): EventGraphic {
  const line = 55 + rng.next() * 30;
  return {
    offside: {
      attacker: { x: line + 2 + rng.next() * 6, y: 20 + rng.next() * 60 },
      ball: { x: line - 10 - rng.next() * 15, y: 25 + rng.next() * 50 },
      defensiveLineY: line,
      offsideDistance: 1 + rng.next() * 4,
    },
  };
}

interface SideState {
  team: Team;
  lines: PlayerMatchLine[];
  stats: TeamMatchStats;
  fatigue: Map<string, number>;
}

function bumpRating(line: PlayerMatchLine, delta: number) {
  line.rating = Math.max(4, Math.min(10, +(line.rating + delta).toFixed(2)));
}

export function simulateMatch(
  homeTeam: Team,
  awayTeam: Team,
  settings: MatchSettings,
  seed = Date.now(),
): MatchResult {
  const rng = createRng(seed);
  const homeXi = selectStartingXi(homeTeam);
  const awayXi = selectStartingXi(awayTeam);
  const home: SideState = {
    team: homeTeam,
    lines: toMatchLines(homeXi.slots, homeXi.bench),
    stats: emptyStats(),
    fatigue: new Map(),
  };
  const away: SideState = {
    team: awayTeam,
    lines: toMatchLines(awayXi.slots, awayXi.bench),
    stats: emptyStats(),
    fatigue: new Map(),
  };

  const events: MatchEvent[] = [];
  let homeScore = 0;
  let awayScore = 0;
  let period: 1 | 2 = 1;

  const homeAdv = settings.homeAdvantage ? 1.08 : 1;
  const homePress = homeTeam.tactics.pressing;
  const awayPress = awayTeam.tactics.pressing;

  const push = (e: Omit<MatchEvent, "id">) => {
    events.push({ ...e, id: nanoid(10) });
  };

  push({
    minute: 0,
    period: 1,
    type: "kickoff",
    teamId: homeTeam.id,
    text: `${homeTeam.name}와 ${awayTeam.name}의 경기가 시작됩니다. 주심의 휘슬과 함께 킥오프!`,
  });

  const possessionBias = () => {
    const h =
      avgOvr(home.lines, homeTeam.players) *
      (homeTeam.tactics.buildUp === "short" ? 1.05 : 1) *
      homeAdv *
      (0.95 + homeTeam.tactics.tempo / 100);
    const a =
      avgOvr(away.lines, awayTeam.players) *
      (awayTeam.tactics.buildUp === "short" ? 1.05 : 1) *
      (0.95 + awayTeam.tactics.tempo / 100);
    return h / (h + a);
  };

  let homePossTicks = 0;
  let awayPossTicks = 0;
  let contestedTicks = 0;

  const trySubstitution = (side: SideState, minute: number, reason: string) => {
    const onPitch = side.lines.filter((l) => l.onPitch && !l.redCard);
    const bench = side.lines.filter((l) => !l.started && !l.onPitch && !l.injured && l.substitutedOn === undefined);
    if (!bench.length) return;
    const tired = [...onPitch].sort(
      (a, b) => (side.fatigue.get(b.playerId) ?? 0) - (side.fatigue.get(a.playerId) ?? 0),
    )[0];
    if (!tired) return;
    const incoming = bench.find((b) => positionCompat(tired.position, b.position)) ?? bench[0]!;
    tired.onPitch = false;
    tired.substitutedOff = minute;
    incoming.onPitch = true;
    incoming.substitutedOn = minute;
    push({
      minute,
      period,
      type: "substitution",
      teamId: side.team.id,
      playerId: incoming.playerId,
      playerName: incoming.name,
      relatedPlayerId: tired.playerId,
      relatedPlayerName: tired.name,
      text: `${minute}' ${side.team.name} 교체 — ${tired.name} OUT, ${incoming.name} IN (${reason})`,
      meta: { out: tired.name, in: incoming.name },
    });
  };

  const simulateMinute = (minute: number) => {
    for (const side of [home, away]) {
      for (const l of side.lines.filter((x) => x.onPitch)) {
        l.minutesPlayed += 1;
        side.fatigue.set(l.playerId, (side.fatigue.get(l.playerId) ?? 0) + 0.8 + rng.next() * 0.4);
      }
    }

    const bias = possessionBias();
    const roll = rng.next();
    let attackSide: SideState;
    let defendSide: SideState;
    if (roll < bias * 0.92) {
      attackSide = home;
      defendSide = away;
      homePossTicks++;
    } else if (roll < bias * 0.92 + (1 - bias) * 0.92) {
      attackSide = away;
      defendSide = home;
      awayPossTicks++;
    } else {
      contestedTicks++;
      return;
    }

    const atk = attackStrength(attackSide.team, attackSide.lines) * (attackSide === home ? homeAdv : 1);
    const def = defenseStrength(defendSide.team, defendSide.lines);
    const press = attackSide === home ? awayPress : homePress;
    const eventChance = 0.22 + (atk - def) / 400 + attackSide.team.tactics.pressing / 80;

    // Pass volume
    const passer = pickOnPitch(attackSide.lines, attackSide.team, ["CM", "CDM", "CAM", "CB", "LB", "RB"], rng);
    if (passer) {
      const p = attackSide.team.players.find((x) => x.id === passer.playerId);
      const acc = ((p ? effectiveAttributes(p).passing : 70) ) / 100;
      const attempts = rng.int(2, 6);
      passer.passes += attempts;
      attackSide.stats.passes += attempts;
      const completed = Math.round(attempts * (0.7 + acc * 0.25));
      passer.passesCompleted += completed;
      attackSide.stats.passesCompleted += completed;
    }

    if (!rng.chance(Math.min(0.55, Math.max(0.08, eventChance)))) {
      // Quiet minute — still log possession / build-up so the full timeline is complete
      const carrier = pickOnPitch(
        attackSide.lines,
        attackSide.team,
        ["CM", "CDM", "CB", "LB", "RB", "CAM"],
        rng,
      );
      const quietRoll = rng.next();
      if (quietRoll < 0.45) {
        push({
          minute,
          period,
          type: "possession",
          teamId: attackSide.team.id,
          playerId: carrier?.playerId,
          playerName: carrier?.name,
          text: rng.pick([
            `${minute}' ${attackSide.team.name}${carrier ? ` ${carrier.name}` : ""}이(가) 후방에서 볼을 소유합니다.`,
            `${minute}' ${attackSide.team.name}이(가) 중원에서 차분히 볼을 돌립니다.`,
            `${minute}' ${defendSide.team.name}의 수비 라인이 높게 올라와 압박합니다.`,
          ]),
        });
      } else if (quietRoll < 0.75 && passer) {
        push({
          minute,
          period,
          type: "pass",
          teamId: attackSide.team.id,
          playerId: passer.playerId,
          playerName: passer.name,
          text: `${minute}' ${passer.name}의 짧은 패스로 ${attackSide.team.name}이(가) 빌드업합니다.`,
        });
      } else if (quietRoll < 0.9) {
        const clearer = pickOnPitch(defendSide.lines, defendSide.team, ["CB", "LB", "RB", "CDM"], rng);
        push({
          minute,
          period,
          type: "clearance",
          teamId: defendSide.team.id,
          playerId: clearer?.playerId,
          playerName: clearer?.name,
          text: `${minute}' ${clearer?.name ?? defendSide.team.name}이(가) 위험을 걷어냅니다.`,
        });
      } else {
        push({
          minute,
          period,
          type: "commentary",
          teamId: attackSide.team.id,
          text: rng.pick([
            `${minute}' 양 팀의 압박 강도가 높아지며 템포가 올라갑니다.`,
            `${minute}' ${attackSide.team.name} 측면으로 볼을 전개합니다.`,
            `${minute}' 관중석의 함성이 커집니다.`,
          ]),
        });
      }
      return;
    }

    const action = rng.next();
    const pressingFactor = press / 10;

    // Injury
    if (rng.chance(0.012)) {
      const victim = pickOnPitch(attackSide.lines, attackSide.team, ["ST", "CM", "CB", "LW", "RW"], rng);
      if (victim && rng.chance(0.35)) {
        victim.injured = true;
        victim.onPitch = false;
        bumpRating(victim, -0.8);
        push({
          minute,
          period,
          type: "injury",
          teamId: attackSide.team.id,
          playerId: victim.playerId,
          playerName: victim.name,
          text: `${minute}' 부상! ${victim.name}이(가) 그라운드에 쓰러집니다. 의료진이 들어옵니다.`,
          graphic: { generic: { location: { x: 40 + rng.next() * 30, y: 30 + rng.next() * 40 }, label: "부상" } },
        });
        trySubstitution(attackSide, minute, "부상 교체");
        return;
      }
    }

    // Foul / cards
    if (action < 0.18 + pressingFactor * 0.05) {
      const fouler = pickOnPitch(defendSide.lines, defendSide.team, ["CDM", "CB", "CM", "LB", "RB"], rng);
      const victim = pickOnPitch(attackSide.lines, attackSide.team, ["ST", "CAM", "LW", "RW", "CM"], rng);
      if (!fouler || !victim) return;
      fouler.fouls += 1;
      defendSide.stats.fouls += 1;
      bumpRating(fouler, -0.05);
      const graphic = foulGraphic(rng);
      push({
        minute,
        period,
        type: "foul",
        teamId: defendSide.team.id,
        playerId: fouler.playerId,
        playerName: fouler.name,
        relatedPlayerId: victim.playerId,
        relatedPlayerName: victim.name,
        text: `${minute}' 파울! ${fouler.name}이(가) ${victim.name}을(를) 넘어뜨립니다.`,
        graphic,
      });

      const cardRoll = rng.next();
      if (cardRoll < 0.08 || (fouler.yellowCards >= 1 && cardRoll < 0.15)) {
        if (fouler.yellowCards >= 1) {
          fouler.yellowCards += 1;
          fouler.redCard = true;
          fouler.onPitch = false;
          defendSide.stats.redCards += 1;
          defendSide.stats.yellowCards += 1;
          bumpRating(fouler, -1.5);
          push({
            minute,
            period,
            type: "second_yellow",
            teamId: defendSide.team.id,
            playerId: fouler.playerId,
            playerName: fouler.name,
            text: `${minute}' 경고 누적 퇴장! ${fouler.name}이(가) 두 번째 옐로 카드를 받고 퇴장합니다.`,
            graphic,
          });
        } else {
          fouler.redCard = true;
          fouler.onPitch = false;
          defendSide.stats.redCards += 1;
          bumpRating(fouler, -2);
          push({
            minute,
            period,
            type: "red_card",
            teamId: defendSide.team.id,
            playerId: fouler.playerId,
            playerName: fouler.name,
            text: `${minute}' 레드 카드! ${fouler.name}이(가) 퇴장당합니다.`,
            graphic,
          });
        }
      } else if (cardRoll < 0.35) {
        fouler.yellowCards += 1;
        defendSide.stats.yellowCards += 1;
        bumpRating(fouler, -0.3);
        push({
          minute,
          period,
          type: "yellow_card",
          teamId: defendSide.team.id,
          playerId: fouler.playerId,
          playerName: fouler.name,
          text: `${minute}' 옐로 카드 — ${fouler.name}`,
          graphic,
        });
      }

      // Free kick chance occasionally becomes shot
      if (rng.chance(0.25)) {
        resolveShot(attackSide, defendSide, minute, false, true);
      }
      return;
    }

    // Offside
    if (action < 0.28 && attackSide.team.tactics.defensiveLine > 5) {
      // actually offside is attacking team's mistake vs high line of defense
    }
    if (action < 0.28) {
      const attacker = pickOnPitch(attackSide.lines, attackSide.team, ["ST", "CF", "LW", "RW"], rng);
      if (!attacker) return;
      attackSide.stats.offsides += 1;
      bumpRating(attacker, -0.1);
      push({
        minute,
        period,
        type: "offside",
        teamId: attackSide.team.id,
        playerId: attacker.playerId,
        playerName: attacker.name,
        text: `${minute}' 오프사이드! ${attacker.name}의 침투가 조금 이릅니다.`,
        graphic: offsideGraphic(rng),
      });
      return;
    }

    // Corner / cross sequences -> shot
    if (action < 0.38) {
      attackSide.stats.corners += 1;
      const taker = pickOnPitch(attackSide.lines, attackSide.team, ["LM", "RM", "LW", "RW", "CAM", "CM"], rng);
      push({
        minute,
        period,
        type: "corner",
        teamId: attackSide.team.id,
        playerId: taker?.playerId,
        playerName: taker?.name,
        text: `${minute}' 코너킥 — ${attackSide.team.name}`,
      });
      if (rng.chance(0.45)) resolveShot(attackSide, defendSide, minute, false, false);
      return;
    }

    // Open play attack
    if (action < 0.55) {
      const dribbler = pickOnPitch(attackSide.lines, attackSide.team, ["LW", "RW", "CAM", "ST", "LM", "RM"], rng);
      if (dribbler && rng.chance(0.5)) {
        push({
          minute,
          period,
          type: "dribble",
          teamId: attackSide.team.id,
          playerId: dribbler.playerId,
          playerName: dribbler.name,
          text: `${minute}' ${dribbler.name}이(가) 돌파를 시도합니다!`,
        });
      }
      const interceptor = pickOnPitch(defendSide.lines, defendSide.team, ["CDM", "CB", "CM"], rng);
      if (interceptor && rng.chance(def / (atk + def))) {
        interceptor.interceptions += 1;
        defendSide.stats.interceptions += 1;
        bumpRating(interceptor, 0.08);
        push({
          minute,
          period,
          type: "interception",
          teamId: defendSide.team.id,
          playerId: interceptor.playerId,
          playerName: interceptor.name,
          text: `${minute}' ${interceptor.name}의 인터셉트! 공격을 차단합니다.`,
        });
        return;
      }
    }

    resolveShot(attackSide, defendSide, minute, rng.chance(0.08), false);

    function resolveShot(
      atkSide: SideState,
      defSide: SideState,
      min: number,
      isPenalty: boolean,
      fromSetPiece: boolean,
    ) {
      const shooter = pickOnPitch(
        atkSide.lines,
        atkSide.team,
        isPenalty ? ["ST", "CF", "CAM", "LW", "RW"] : ["ST", "CF", "LW", "RW", "CAM", "CM"],
        rng,
      );
      if (!shooter) return;
      const sp = atkSide.team.players.find((x) => x.id === shooter.playerId);
      const gkLine = defSide.lines.find((l) => l.onPitch && l.position === "GK");
      const gk = gkLine
        ? defSide.team.players.find((x) => x.id === gkLine.playerId)
        : undefined;

      shooter.shots += 1;
      atkSide.stats.shots += 1;

      const shotQuality =
        (((sp ? effectiveAttributes(sp).shooting : 70) ) / 100) *
        (isPenalty ? 1.35 : fromSetPiece ? 1.1 : 1) *
        (0.85 + rng.next() * 0.3);
      const gkAttr = gk ? effectiveAttributes(gk) : null;
      const saveQuality =
        ((gkAttr?.goalkeeping ?? gk?.ovr ?? 70) / 100) * (0.9 + rng.next() * 0.25);
      const blockChance = def / 220;

      if (!isPenalty && rng.chance(blockChance)) {
        push({
          minute: min,
          period,
          type: "shot_blocked",
          teamId: atkSide.team.id,
          playerId: shooter.playerId,
          playerName: shooter.name,
          text: `${min}' ${shooter.name}의 슈팅이 수비수에 막힙니다.`,
        });
        return;
      }

      const onTarget = isPenalty || rng.chance(0.35 + shotQuality * 0.35);
      if (!onTarget) {
        push({
          minute: min,
          period,
          type: "shot",
          teamId: atkSide.team.id,
          playerId: shooter.playerId,
          playerName: shooter.name,
          text: `${min}' ${shooter.name}의 슈팅! 골대를 벗어납니다.`,
          graphic: goalGraphic(rng, false),
        });
        return;
      }

      shooter.shotsOnTarget += 1;
      atkSide.stats.shotsOnTarget += 1;

      const scores = isPenalty
        ? rng.chance(0.78)
        : rng.chance(Math.min(0.55, Math.max(0.08, shotQuality - saveQuality * 0.55 + (atk - def) / 300)));

      if (!scores) {
        if (gkLine) {
          defSide.stats.saves += 1;
          bumpRating(gkLine, 0.15);
        }
        push({
          minute: min,
          period,
          type: "save",
          teamId: defSide.team.id,
          playerId: gkLine?.playerId,
          playerName: gkLine?.name,
          relatedPlayerId: shooter.playerId,
          relatedPlayerName: shooter.name,
          text: `${min}' ${gkLine?.name ?? "골키퍼"}의 선방! ${shooter.name}의 유효슈팅을 막아냅니다.`,
          graphic: goalGraphic(rng, isPenalty),
        });
        return;
      }

      // Goal!
      const assister = pickOnPitch(
        atkSide.lines.filter((l) => l.playerId !== shooter.playerId),
        atkSide.team,
        ["CAM", "CM", "LW", "RW", "LM", "RM", "ST"],
        rng,
      );
      const withAssist = !isPenalty && assister && rng.chance(0.72);

      shooter.goals += 1;
      bumpRating(shooter, 0.6);
      if (withAssist && assister) {
        assister.assists += 1;
        bumpRating(assister, 0.35);
      }

      if (atkSide === home) {
        homeScore += 1;
        home.stats.goals += 1;
      } else {
        awayScore += 1;
        away.stats.goals += 1;
      }

      const assistText =
        withAssist && assister ? ` (A. ${assister.name})` : isPenalty ? " (PK)" : "";
      push({
        minute: min,
        period,
        type: isPenalty ? "penalty_goal" : "goal",
        teamId: atkSide.team.id,
        playerId: shooter.playerId,
        playerName: shooter.name,
        assistId: withAssist ? assister?.playerId : undefined,
        assistName: withAssist ? assister?.name : undefined,
        text: `${min}' 골! ${shooter.name}${assistText} — ${homeTeam.name} ${homeScore} : ${awayScore} ${awayTeam.name}`,
        scoreAfter: [homeScore, awayScore],
        graphic: goalGraphic(rng, isPenalty),
      });
    }
  };

  // First half
  for (let m = 1; m <= 45; m++) simulateMinute(m);
  // stoppage
  const stop1 = rng.int(1, 4);
  for (let s = 1; s <= stop1; s++) simulateMinute(45);

  push({
    minute: 45,
    stoppage: stop1,
    period: 1,
    type: "half_time",
    teamId: homeTeam.id,
    text: `전반 종료 ${homeTeam.name} ${homeScore} : ${awayScore} ${awayTeam.name}`,
    scoreAfter: [homeScore, awayScore],
  });

  // HT substitutions
  if (rng.chance(0.7)) trySubstitution(home, 46, "전술 교체");
  if (rng.chance(0.7)) trySubstitution(away, 46, "전술 교체");

  period = 2;
  push({
    minute: 45,
    period: 2,
    type: "second_half",
    teamId: homeTeam.id,
    text: `후반전이 시작됩니다.`,
  });

  for (let m = 46; m <= 90; m++) {
    simulateMinute(m);
    if (m === 60 || m === 70 || m === 75 || m === 80) {
      if (rng.chance(0.55)) trySubstitution(home, m, "체력/전술 교체");
      if (rng.chance(0.55)) trySubstitution(away, m, "체력/전술 교체");
    }
  }
  const stop2 = rng.int(2, 6);
  for (let s = 1; s <= stop2; s++) simulateMinute(90);

  push({
    minute: 90,
    stoppage: stop2,
    period: 2,
    type: "full_time",
    teamId: homeTeam.id,
    text: `경기 종료! ${homeTeam.name} ${homeScore} : ${awayScore} ${awayTeam.name}`,
    scoreAfter: [homeScore, awayScore],
  });

  // Possession %
  const totalPoss = homePossTicks + awayPossTicks + contestedTicks || 1;
  home.stats.possession = Math.round((homePossTicks / totalPoss) * 100);
  away.stats.possession = Math.round((awayPossTicks / totalPoss) * 100);
  const contested = Math.max(0, 100 - home.stats.possession - away.stats.possession);
  home.stats.contestedPossession = contested;
  away.stats.contestedPossession = contested;
  // normalize slight drift
  const drift = home.stats.possession + away.stats.possession + contested - 100;
  if (drift !== 0) home.stats.possession -= drift;

  // Player of the match
  const allLines = [
    ...home.lines.map((l) => ({ l, teamId: homeTeam.id })),
    ...away.lines.map((l) => ({ l, teamId: awayTeam.id })),
  ];
  const potm = [...allLines].sort((a, b) => {
    const score = (x: PlayerMatchLine) =>
      x.rating + x.goals * 0.3 + x.assists * 0.2 - (x.redCard ? 2 : 0);
    return score(b.l) - score(a.l);
  })[0];

  const referees = [
    "이반 바르톤 (엘살바도르)",
    "안토니 테일러 (잉글랜드)",
    "펠릭스 츠바이어 (독일)",
    "윌튼 삼파이우 (브라질)",
    "예수 발렌수엘라 (베네수엘라)",
    "슬라브코 빈치치 (슬로베니아)",
    "프랑수아 레테시에 (프랑스)",
  ];

  return {
    id: nanoid(12),
    createdAt: new Date().toISOString(),
    settings: {
      ...settings,
      referee: settings.referee ?? rng.pick(referees),
      attendance: settings.attendance ?? rng.int(28000, 82000),
      kickoffIso: settings.kickoffIso ?? new Date().toISOString(),
      venueOverride: settings.venueOverride ?? (settings.homeAdvantage ? homeTeam.stadium : "중립 구장"),
    },
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    homeStats: home.stats,
    awayStats: away.stats,
    homeLineup: home.lines,
    awayLineup: away.lines,
    events,
    playerOfTheMatch: potm
      ? { playerId: potm.l.playerId, teamId: potm.teamId, name: potm.l.name }
      : undefined,
    seed,
  };
}

function positionCompat(a: string, b: string): boolean {
  if (a === b) return true;
  const groups = [
    ["CB"],
    ["LB", "LWB", "LM", "LW"],
    ["RB", "RWB", "RM", "RW"],
    ["CDM", "CM", "CAM"],
    ["ST", "CF", "CAM", "LW", "RW"],
    ["GK"],
  ];
  return groups.some((g) => g.includes(a) && g.includes(b));
}
