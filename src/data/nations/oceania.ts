import { makeTeam, type RawPlayer } from './_helpers';

const positions: RawPlayer['position'][] = [
  'GK', 'GK',
  'RB', 'CB', 'CB', 'CB', 'LB', 'LB',
  'CDM', 'CM', 'CM', 'CAM', 'RM', 'LM',
  'RW', 'ST', 'ST', 'LW', 'CF', 'RW',
];

function newZealandRoster(): RawPlayer[] {
  const names = [
    '올리버 세일/Oliver Sail',
    '알렉스 폴슨/Alex Paulsen',
    '팀 페인/Tim Payne',
    '마이클 복솔/Michael Boxall',
    '토미 스미스/Tommy Smith',
    '핀 서먼/Finn Surman',
    '리베라토 카카체/Liberato Cacace',
    '칼럼 엘리엇/Callan Elliot',
    '조 벨/Joe Bell',
    '마크 스타메니치/Marko Stamenic',
    '맷 가벳/Matt Garbett',
    '사프리트 싱/Sarpreet Singh',
    '엘리 저스트/Elijah Just',
    '클레이턴 루이스/Clayton Lewis',
    '벤 올드/Ben Old',
    '*크리스 우드/Chris Wood',
    '코스타 바바루시스/Kosta Barbarouses',
    '캘럼 매카왓/Callum McCowatt',
    '맥스 마타/Max Mata',
    '알렉스 그리브/Alex Greive',
  ];

  return names.map((entry, index) => {
    const captain = entry.startsWith('*');
    const [name, nameEn] = (captain ? entry.slice(1) : entry).split('/');
    return {
      name,
      nameEn,
      number: index + 1,
      position: positions[index],
      age: 21 + (((index + 1) * 7 + nameEn.length) % 13),
      club: '국가대표팀',
      isCaptain: captain || undefined,
      tier: index < 3 ? 'star' : index < 16 ? 'solid' : 'fringe',
    };
  });
}

export const oceaniaTeams = [
  makeTeam({
    name: '뉴질랜드',
    nameEn: 'New Zealand',
    fifaCode: 'NZL',
    iso2: 'nz',
    confederation: 'OFC',
    fifaRank: 86,
    colors: {
      primary: '#ffffff',
      secondary: '#000000',
      accent: '#c0c0c0',
    },
    stadium: 'Eden Park',
    manager: {
      name: '대런 베이즐리',
      nameEn: 'Darren Bazeley',
      nationality: '잉글랜드',
      personality: '균형',
      preferredFormation: '4-3-3',
      since: 2023,
    },
    tactics: {
      formation: '4-3-3',
      mentality: 'balanced',
      pressing: 6,
      tempo: 7,
      width: 7,
      buildUp: 'mixed',
      defensiveLine: 6,
    },
    players: newZealandRoster(),
  }),
];
