import type { Position } from '@/types/football';
import { makeTeam } from './_helpers';

type RosterRow = [
  name: string,
  nameEn: string,
  position: Position,
  age: number,
  club: string,
  tier: 'star' | 'solid' | 'fringe',
  isCaptain: boolean,
  number: number,
];

function roster(rows: RosterRow[]) {
  return rows.map(([name, nameEn, position, age, club, tier, isCaptain, number]) => ({
    name,
    nameEn,
    position,
    age,
    club,
    tier,
    isCaptain: isCaptain || undefined,
    number,
  }));
}

export const oceaniaTeams = [
  makeTeam({
    name: "뉴질랜드",
    nameEn: "New Zealand",
    fifaCode: "NZL",
    iso2: "nz",
    confederation: "OFC",
    fifaRank: 88,
    colors: { primary: "#FFFFFF", secondary: "#000000", accent: "#FFFFFF" },
    stadium: "New Zealand National Stadium",
    manager: {
      name: "대런 베이즐리",
      nameEn: "Darren Bazeley",
      nationality: "New Zealand",
      personality: "수비적",
      preferredFormation: "4-3-3",
      since: 2024,
    },
    tactics: {
      formation: "4-3-3",
      mentality: "balanced",
      pressing: 5,
      tempo: 6,
      width: 6,
      buildUp: "mixed",
      defensiveLine: 5,
    },
    players: roster([
      ["알렉스 폴슨", "Alex Paulsen", "GK", 24, "Motherwell", "solid", false, 1],
      ["마이클 우드", "Michael Woud", "GK", 27, "Auckland FC", "fringe", false, 12],
      ["헨리 그레이", "Henry Gray", "GK", 21, "Wellington Phoenix", "fringe", false, 23],
      ["캘런 엘리엇", "Callan Elliot", "CB", 27, "Auckland FC", "solid", false, 2],
      ["타일러 빈던", "Tyler Bindon", "LB", 21, "Charlton Athletic", "solid", false, 3],
      ["빌 투일로마", "Bill Tuiloma", "RB", 31, "Wellington Phoenix", "star", false, 4],
      ["제임스 맥개리", "James McGarry", "CB", 28, "Wellington Phoenix", "fringe", false, 5],
      ["난도 피나케르", "Nando Pijnaker", "LWB", 27, "Auckland FC", "solid", false, 6],
      ["매튜 셰리던", "Matthew Sheridan", "RWB", 22, "Unattached", "fringe", false, 7],
      ["핀 서먼", "Finn Surman", "CB", 23, "Portland Timbers", "solid", false, 8],
      ["프란시스 드 브리스", "Francis de Vries", "LB", 31, "Auckland FC", "solid", false, 9],
      ["라클란 베일리스", "Lachlan Bayliss", "CM", 24, "Auckland FC", "fringe", false, 10],
      ["알렉스 루퍼", "Alex Rufer", "CDM", 30, "Wellington Phoenix", "solid", false, 11],
      ["오웬 파커-프라이스", "Owen Parker-Price", "CAM", 27, "Örgryte", "fringe", false, 13],
      ["매트 가베트", "Matt Garbett", "CM", 24, "Peterborough United", "solid", false, 14],
      ["칼럼 맥코와트", "Callum McCowatt", "RM", 27, "AGF", "solid", false, 15],
      ["로건 로저슨", "Logan Rogerson", "ST", 28, "Auckland FC", "solid", false, 16],
      ["크리스 우드", "Chris Wood", "LW", 34, "Nottingham Forest", "star", true, 17],
      ["제시 랜달", "Jesse Randall", "RW", 24, "Dundee United", "solid", false, 18],
      ["리암 길리온", "Liam Gillion", "CF", 24, "Unattached", "fringe", false, 19],
      ["코르반 파이퍼", "Corban Piper", "ST", 24, "Unattached", "fringe", false, 20],
      ["네이선 워커", "Nathan Walker", "ST", 20, "Unattached", "fringe", false, 21],
      ["마이클 박스올", "Michael Boxall", "RB", 38, "Minnesota United", "star", false, 22],
    ]),
  }),
];
