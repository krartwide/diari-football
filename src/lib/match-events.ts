import type { MatchEventType } from "@/types/football";

/** Events that play at normal speed and can open the visualizer. */
export const MAJOR_EVENT_TYPES = new Set<MatchEventType | string>([
  "goal",
  "penalty_goal",
  "own_goal",
  "foul",
  "yellow_card",
  "red_card",
  "second_yellow",
  "offside",
  "shot",
  "shot_on_target",
  "shot_blocked",
  "save",
  "injury",
  "penalty_miss",
  "substitution",
  "corner",
  "dribble",
  "interception",
  "free_kick",
  "tackle",
  "kickoff",
  "half_time",
  "second_half",
  "full_time",
]);

export function isMajorEvent(type: string): boolean {
  return MAJOR_EVENT_TYPES.has(type);
}
