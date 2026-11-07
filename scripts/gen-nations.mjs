/**
 * Generates official national team TypeScript data files.
 * Run: node scripts/gen-nations.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("src/data/nations", { recursive: true });

/** @typedef {{name:string,nameEn:string,number:number,position:string,age:number,club:string,tier?:string,isCaptain?:boolean,preferredFoot?:string}} RP */

function p(name, nameEn, number, position, age, club, tier = "solid", extra = {}) {
  return { name, nameEn, number, position, age, club, tier, ...extra };
}

const teams = [];

function add(t) {
  teams.push(t);
}

// ========== EUROPE ==========
add({
  name: "스페인", nameEn: "Spain", fifaCode: "ESP", iso2: "es", confederation: "UEFA", fifaRank: 1,
  colors: { primary: "#E60D2E", secondary: "#F1BF00", accent: "#FFFFFF", pattern: "solid" },
  stadium: "산티아고 베르나베우 (마드리드)", worldCupTitles: 1,
  manager: { name: "루이스 데 라 푸엔테", nameEn: "Luis de la Fuente", nationality: "스페인", personality: "점유율", preferredFormation: "4-1-2-3", since: 2022 },
  tactics: { formation: "4-1-2-3", mentality: "attacking", pressing: 8, tempo: 7, width: 7, buildUp: "short", defensiveLine: 8 },
  players: [
    p("우나이 시몬", "Unai Simón", 23, "GK", 28, "Athletic Club", "star"),
    p("다비드 라야", "David Raya", 1, "GK", 30, "Arsenal", "solid"),
    p("호안 가르시아", "Joan García", 13, "GK", 24, "Barcelona", "fringe"),
    p("페드로 포로", "Pedro Porro", 12, "RB", 26, "Tottenham", "star"),
    p("마르크 쿠쿠레야", "Marc Cucurella", 24, "LB", 27, "Chelsea", "star"),
    p("에므리크 라포르트", "Aymeric Laporte", 14, "CB", 31, "Al-Nassr", "solid"),
    p("파우 쿠바르시", "Pau Cubarsí", 22, "CB", 19, "Barcelona", "star"),
    p("로빈 레 노르망", "Robin Le Normand", 3, "CB", 29, "Atlético Madrid", "solid"),
    p("다니 카르바할", "Dani Carvajal", 2, "RB", 34, "Real Madrid", "solid"),
    p("알레한드로 그리말도", "Alejandro Grimaldo", 18, "LB", 30, "Bayer Leverkusen", "solid"),
    p("로드리", "Rodri", 16, "CDM", 29, "Manchester City", "star", { isCaptain: true }),
    p("파비안 루이스", "Fabián Ruiz", 8, "CM", 29, "PSG", "star"),
    p("페드리", "Pedri", 20, "CM", 23, "Barcelona", "star"),
    p("다니 올모", "Dani Olmo", 10, "CAM", 27, "Barcelona", "star"),
    p("미켈 메리노", "Mikel Merino", 6, "CM", 29, "Arsenal", "solid"),
    p("마르틴 수비멘디", "Martín Zubimendi", 4, "CDM", 26, "Arsenal", "solid"),
    p("라민 야말", "Lamine Yamal", 19, "RW", 18, "Barcelona", "star"),
    p("니코 윌리암스", "Nico Williams", 17, "LW", 23, "Athletic Club", "star"),
    p("미켈 오야르사발", "Mikel Oyarzabal", 21, "ST", 28, "Real Sociedad", "star"),
    p("페란 토레스", "Ferran Torres", 7, "ST", 26, "Barcelona", "solid"),
    p("알바로 모라타", "Álvaro Morata", 9, "ST", 33, "Como", "solid"),
    p("알렉스 바에나", "Álex Baena", 15, "LW", 24, "Atlético Madrid", "solid"),
    p("마르코스 요렌테", "Marcos Llorente", 5, "CM", 30, "Atlético Madrid", "fringe"),
  ],
});

add({
  name: "프랑스", nameEn: "France", fifaCode: "FRA", iso2: "fr", confederation: "UEFA", fifaRank: 3,
  colors: { primary: "#002395", secondary: "#FFFFFF", accent: "#ED2939", pattern: "solid" },
  stadium: "스타드 드 프랑스 (생드니)", worldCupTitles: 2,
  manager: { name: "디디에 데샹", nameEn: "Didier Deschamps", nationality: "프랑스", personality: "수비적", preferredFormation: "4-2-3-1", since: 2012 },
  tactics: { formation: "4-2-3-1", mentality: "balanced", pressing: 7, tempo: 6, width: 6, buildUp: "mixed", defensiveLine: 6 },
  players: [
    p("마이크 메냥", "Mike Maignan", 16, "GK", 30, "AC Milan", "star"),
    p("브리스 삼바", "Brice Samba", 1, "GK", 31, "Lens", "solid"),
    p("로뱅 리세", "Robin Risser", 23, "GK", 20, "Strasbourg", "fringe"),
    p("쥘 쿤데", "Jules Koundé", 5, "RB", 27, "Barcelona", "star"),
    p("윌리엄 살리바", "William Saliba", 17, "CB", 24, "Arsenal", "star"),
    p("다요 우파메카노", "Dayot Upamecano", 4, "CB", 27, "Bayern Munich", "star"),
    p("이브라히마 코나테", "Ibrahima Konaté", 15, "CB", 26, "Liverpool", "solid"),
    p("테오 에르난데스", "Theo Hernández", 22, "LB", 28, "Al-Hilal", "star"),
    p("뤼카 디뉴", "Lucas Digne", 3, "LB", 32, "Aston Villa", "solid"),
    p("막상스 라크루아", "Maxence Lacroix", 26, "CB", 25, "Crystal Palace", "fringe"),
    p("오렐리앵 추아메니", "Aurélien Tchouaméni", 8, "CDM", 25, "Real Madrid", "star"),
    p("아드리앙 라비오", "Adrien Rabiot", 14, "CM", 30, "Marseille", "solid"),
    p("마누 코네", "Manu Koné", 6, "CM", 24, "Roma", "solid"),
    p("에두아르두 카망징가", "Eduardo Camavinga", 13, "CM", 23, "Real Madrid", "star"),
    p("우스만 뎀벨레", "Ousmane Dembélé", 7, "RW", 28, "PSG", "star"),
    p("마이클 올리세", "Michael Olise", 11, "CAM", 24, "Bayern Munich", "star"),
    p("브래들리 바르콜라", "Bradley Barcola", 12, "LW", 23, "PSG", "solid"),
    p("데지레 두에", "Désiré Doué", 20, "LW", 20, "PSG", "star"),
    p("킬리안 음바페", "Kylian Mbappé", 10, "ST", 27, "Real Madrid", "star", { isCaptain: true }),
    p("라얀 셰르키", "Rayan Cherki", 24, "CAM", 22, "Manchester City", "solid"),
    p("마르쿠스 튀랑", "Marcus Thuram", 9, "ST", 28, "Inter", "solid"),
    p("킹슬리 코만", "Kingsley Coman", 18, "LW", 29, "Bayern Munich", "solid"),
    p("요우스푸 포파나", "Youssouf Fofana", 19, "CDM", 26, "AC Milan", "fringe"),
  ],
});

add({
  name: "잉글랜드", nameEn: "England", fifaCode: "ENG", iso2: "gb-eng", confederation: "UEFA", fifaRank: 4,
  colors: { primary: "#FFFFFF", secondary: "#000066", accent: "#C8102E", pattern: "solid" },
  stadium: "웸블리 스타디움 (런던)", worldCupTitles: 1,
  manager: { name: "토마스 투헬", nameEn: "Thomas Tuchel", nationality: "독일", personality: "냉철", preferredFormation: "4-2-3-1", since: 2025 },
  tactics: { formation: "4-2-3-1", mentality: "attacking", pressing: 7, tempo: 7, width: 7, buildUp: "mixed", defensiveLine: 7 },
  players: [
    p("조던 픽포드", "Jordan Pickford", 1, "GK", 31, "Everton", "star"),
    p("딘 헨더슨", "Dean Henderson", 13, "GK", 28, "Crystal Palace", "solid"),
    p("제임스 트래퍼드", "James Trafford", 22, "GK", 23, "Manchester City", "fringe"),
    p("리스 제임스", "Reece James", 2, "RB", 26, "Chelsea", "star"),
    p("마크 게히", "Marc Guéhi", 6, "CB", 25, "Crystal Palace", "star"),
    p("에즈리 콘사", "Ezri Konsa", 14, "CB", 28, "Aston Villa", "solid"),
    p("존 스톤스", "John Stones", 5, "CB", 31, "Manchester City", "solid"),
    p("니코 오라일리", "Nico O'Reilly", 3, "LB", 20, "Manchester City", "solid"),
    p("티노 리브라멘토", "Tino Livramento", 12, "RB", 23, "Newcastle", "solid"),
    p("댄 번", "Dan Burn", 15, "CB", 33, "Newcastle", "fringe"),
    p("데클런 라이스", "Declan Rice", 4, "CDM", 27, "Arsenal", "star", { isCaptain: true }),
    p("주드 벨링엄", "Jude Bellingham", 10, "CAM", 22, "Real Madrid", "star"),
    p("코비 메인우", "Kobbie Mainoo", 16, "CM", 20, "Manchester United", "solid"),
    p("엘리엇 앤더슨", "Elliot Anderson", 8, "CM", 23, "Nottingham Forest", "solid"),
    p("부카요 사카", "Bukayo Saka", 7, "RW", 24, "Arsenal", "star"),
    p("에베레치 에제", "Eberechi Eze", 11, "CAM", 27, "Arsenal", "star"),
    p("앤서니 고든", "Anthony Gordon", 17, "LW", 24, "Newcastle", "solid"),
    p("해리 케인", "Harry Kane", 9, "ST", 32, "Bayern Munich", "star"),
    p("올리 왓킨스", "Ollie Watkins", 19, "ST", 29, "Aston Villa", "solid"),
    p("자로드 보웬", "Jarrod Bowen", 20, "RW", 29, "West Ham", "solid"),
    p("모건 로저스", "Morgan Rogers", 18, "CAM", 23, "Aston Villa", "fringe"),
    p("비언 사카", "Noni Madueke", 21, "RW", 23, "Chelsea", "fringe"),
    p("코너 갤러거", "Conor Gallagher", 23, "CM", 25, "Atlético Madrid", "fringe"),
  ],
});

add({
  name: "포르투갈", nameEn: "Portugal", fifaCode: "POR", iso2: "pt", confederation: "UEFA", fifaRank: 7,
  colors: { primary: "#006600", secondary: "#FF0000", accent: "#FFFF00", pattern: "solid" },
  stadium: "이스타디우 다 루스 (리스본)", worldCupTitles: 0,
  manager: { name: "로베르토 마르티네스", nameEn: "Roberto Martínez", nationality: "스페인", personality: "점유율", preferredFormation: "4-3-3", since: 2023 },
  tactics: { formation: "4-3-3", mentality: "attacking", pressing: 6, tempo: 6, width: 7, buildUp: "short", defensiveLine: 6 },
  players: [
    p("디오고 코스타", "Diogo Costa", 1, "GK", 26, "Porto", "star"),
    p("조제 사", "José Sá", 12, "GK", 32, "Wolves", "solid"),
    p("후벤 디아스", "Rúben Dias", 4, "CB", 28, "Manchester City", "star", { isCaptain: true }),
    p("누누 멘데스", "Nuno Mendes", 5, "LB", 23, "PSG", "star"),
    p("주앙 칸셀루", "João Cancelo", 2, "RB", 31, "Al-Hilal", "solid"),
    p("곤살루 이나시우", "Gonçalo Inácio", 3, "CB", 24, "Sporting", "solid"),
    p("안토니우 실바", "António Silva", 13, "CB", 22, "Benfica", "solid"),
    p("디오구 달로", "Diogo Dalot", 20, "RB", 26, "Manchester United", "solid"),
    p("비티냐", "Vitinha", 6, "CM", 25, "PSG", "star"),
    p("브루누 페르난데스", "Bruno Fernandes", 8, "CAM", 31, "Manchester United", "star"),
    p("주앙 네베스", "João Neves", 15, "CDM", 20, "PSG", "star"),
    p("마테우스 누네스", "Matheus Nunes", 16, "CM", 27, "Manchester City", "solid"),
    p("베르나르두 실바", "Bernardo Silva", 10, "RW", 31, "Manchester City", "star"),
    p("히파엘 레앙", "Rafael Leão", 17, "LW", 26, "AC Milan", "star"),
    p("크리스티아누 호날두", "Cristiano Ronaldo", 7, "ST", 41, "Al-Nassr", "star"),
    p("주앙 펠릭스", "João Félix", 11, "CF", 26, "Chelsea", "solid"),
    p("곤살루 하무스", "Gonçalo Ramos", 9, "ST", 24, "PSG", "solid"),
    p("프란시스쿠 콘세이상", "Francisco Conceição", 21, "RW", 22, "Juventus", "solid"),
    p("페드루 네투", "Pedro Neto", 18, "RW", 25, "Chelsea", "solid"),
    p("후벤 네베스", "Rúben Neves", 14, "CDM", 28, "Al-Hilal", "solid"),
    p("오토멘디", "Otávio", 19, "CM", 30, "Al-Nassr", "fringe"),
    p("조제 폰테", "José Fonte", 22, "CB", 42, "Retired/Legacy", "fringe"),
    p("후이 파트리시우", "Rui Patrício", 23, "GK", 37, "Free Agent", "fringe"),
  ],
});

add({
  name: "독일", nameEn: "Germany", fifaCode: "GER", iso2: "de", confederation: "UEFA", fifaRank: 10,
  colors: { primary: "#000000", secondary: "#FFFFFF", accent: "#DD0000", pattern: "solid" },
  stadium: "알리안츠 아레나 (뮌헨)", worldCupTitles: 4,
  manager: { name: "율리안 나겔스만", nameEn: "Julian Nagelsmann", nationality: "독일", personality: "실험적", preferredFormation: "4-2-3-1", since: 2023 },
  tactics: { formation: "4-2-3-1", mentality: "attacking", pressing: 9, tempo: 8, width: 7, buildUp: "short", defensiveLine: 8 },
  players: [
    p("마누엘 노이어", "Manuel Neuer", 1, "GK", 39, "Bayern Munich", "star", { isCaptain: true }),
    p("마르크안드레 테어 슈테겐", "Marc-André ter Stegen", 22, "GK", 33, "Barcelona", "solid"),
    p("올리버 바우만", "Oliver Baumann", 12, "GK", 35, "Hoffenheim", "fringe"),
    p("요슈아 키미히", "Joshua Kimmich", 6, "RB", 30, "Bayern Munich", "star"),
    p("안토니오 뤼디거", "Antonio Rüdiger", 2, "CB", 32, "Real Madrid", "star"),
    p("요나탄 타", "Jonathan Tah", 4, "CB", 29, "Bayern Munich", "star"),
    p("니코 슐로터벡", "Nico Schlotterbeck", 3, "CB", 25, "Borussia Dortmund", "solid"),
    p("다비드 라움", "David Raum", 21, "LB", 27, "RB Leipzig", "solid"),
    p("말리크 티아우", "Malick Thiaw", 15, "CB", 24, "Newcastle", "solid"),
    p("알렉산더 파블로비치", "Aleksandar Pavlović", 8, "CDM", 21, "Bayern Munich", "star"),
    p("레온 고레츠카", "Leon Goretzka", 18, "CM", 30, "Bayern Munich", "solid"),
    p("플로리안 비르츠", "Florian Wirtz", 10, "CAM", 22, "Liverpool", "star"),
    p("야말 무지알라", "Jamal Musiala", 7, "CAM", 22, "Bayern Munich", "star"),
    p("세르주 그나브리", "Serge Gnabry", 11, "RW", 30, "Bayern Munich", "solid"),
    p("레로이 사네", "Leroy Sané", 19, "RW", 29, "Galatasaray", "solid"),
    p("카이 하베르츠", "Kai Havertz", 9, "ST", 26, "Arsenal", "star"),
    p("닉 볼테마데", "Nick Woltemade", 14, "ST", 23, "Newcastle", "solid"),
    p("막시밀리안 바이어", "Maximilian Beier", 17, "ST", 22, "Borussia Dortmund", "solid"),
    p("안젤로 슈틸러", "Angelo Stiller", 16, "CDM", 24, "Stuttgart", "solid"),
    p("펠릭스 느메차", "Felix Nmecha", 5, "CM", 24, "Borussia Dortmund", "fringe"),
    p("나디엠 아미리", "Nadiem Amiri", 20, "CM", 29, "Mainz", "fringe"),
    p("발데마르 안톤", "Waldemar Anton", 23, "CB", 28, "Borussia Dortmund", "fringe"),
    p("야미 르벨링", "Jamie Leweling", 13, "RW", 24, "Stuttgart", "fringe"),
  ],
});

add({
  name: "네덜란드", nameEn: "Netherlands", fifaCode: "NED", iso2: "nl", confederation: "UEFA", fifaRank: 9,
  colors: { primary: "#FF6600", secondary: "#FFFFFF", accent: "#21468B", pattern: "solid" },
  stadium: "요한 크루이프 아레나 (암스테르담)", worldCupTitles: 0,
  manager: { name: "로날트 쿠만", nameEn: "Ronald Koeman", nationality: "네덜란드", personality: "공격적", preferredFormation: "4-2-3-1", since: 2023 },
  tactics: { formation: "4-2-3-1", mentality: "attacking", pressing: 7, tempo: 7, width: 8, buildUp: "short", defensiveLine: 7 },
  players: [
    p("바르트 베르브뤼헌", "Bart Verbruggen", 1, "GK", 23, "Brighton", "star"),
    p("마르크 플레켄", "Mark Flekken", 13, "GK", 32, "Bayer Leverkusen", "solid"),
    p("버질 반 다이크", "Virgil van Dijk", 4, "CB", 34, "Liverpool", "star", { isCaptain: true }),
    p("미키 반 더 펜", "Micky van de Ven", 5, "CB", 24, "Tottenham", "star"),
    p("나탄 아케", "Nathan Aké", 3, "CB", 30, "Manchester City", "solid"),
    p("덴젤 둠프리스", "Denzel Dumfries", 22, "RB", 29, "Inter", "star"),
    p("요리얼 하토", "Jorrel Hato", 12, "LB", 19, "Chelsea", "solid"),
    p("위리언 팀버", "Jurriën Timber", 2, "RB", 24, "Arsenal", "solid"),
    p("프렌키 더 용", "Frenkie de Jong", 21, "CM", 28, "Barcelona", "star"),
    p("라이언 흐라번베르흐", "Ryan Gravenberch", 8, "CDM", 23, "Liverpool", "star"),
    p("티야니 레인더스", "Tijjani Reijnders", 14, "CM", 27, "Manchester City", "star"),
    p("코디 가크포", "Cody Gakpo", 11, "LW", 26, "Liverpool", "star"),
    p("도니엘 말렌", "Donyell Malen", 18, "RW", 26, "Roma", "solid"),
    p("멤피스 데파이", "Memphis Depay", 10, "ST", 32, "Corinthians", "star"),
    p("바우트 베호르스트", "Wout Weghorst", 9, "ST", 33, "Ajax", "solid"),
    p("저스틴 클루이베르트", "Justin Kluivert", 7, "RW", 26, "Bournemouth", "solid"),
    p("노아 랑", "Noa Lang", 17, "LW", 26, "Galatasaray", "solid"),
    p("마틴 더 룬", "Marten de Roon", 6, "CDM", 34, "Atalanta", "solid"),
    p("퀸틴 팀버", "Quinten Timber", 16, "CM", 24, "Marseille", "fringe"),
    p("테운 쿠프메이너스", "Teun Koopmeiners", 20, "CM", 27, "Juventus", "solid"),
    p("브라이언 브로베이", "Brian Brobbey", 19, "ST", 23, "Sunderland", "fringe"),
    p("얀 파울 반 헤커", "Jan Paul van Hecke", 15, "CB", 25, "Brighton", "fringe"),
    p("로빈 루프스", "Robin Roefs", 23, "GK", 22, "Sunderland", "fringe"),
  ],
});

add({
  name: "벨기에", nameEn: "Belgium", fifaCode: "BEL", iso2: "be", confederation: "UEFA", fifaRank: 8,
  colors: { primary: "#000000", secondary: "#FDDA24", accent: "#EF3340", pattern: "stripes" },
  stadium: "킹 보드앵 스타디움 (브뤼셀)", worldCupTitles: 0,
  manager: { name: "뤼디 가르시아", nameEn: "Rudi Garcia", nationality: "프랑스", personality: "균형", preferredFormation: "4-3-3", since: 2025 },
  tactics: { formation: "4-3-3", mentality: "balanced", pressing: 6, tempo: 6, width: 6, buildUp: "mixed", defensiveLine: 6 },
  players: [
    p("코엥 카스테일스", "Koen Casteels", 1, "GK", 33, "Al-Qadsiah", "star"),
    p("맛츠 셀스", "Matz Sels", 12, "GK", 33, "Nottingham Forest", "solid"),
    p("티모티 카스타뉴", "Timothy Castagne", 21, "RB", 29, "Fulham", "solid"),
    p("바우트 파스베어", "Wout Faes", 4, "CB", 27, "Leicester", "solid"),
    p("얀 페르통언", "Jan Vertonghen", 5, "CB", 38, "Anderlecht", "solid"),
    p("막시밀리아노 데 케이르펠러", "Maxim De Cuyper", 3, "LB", 24, "Brighton", "solid"),
    p("아멜 아흐마두", "Amadou Onana", 6, "CDM", 24, "Aston Villa", "star"),
    p("유수프 포파나", "Youri Tielemans", 8, "CM", 28, "Aston Villa", "star", { isCaptain: true }),
    p("케빈 더 브라위너", "Kevin De Bruyne", 7, "CAM", 34, "Napoli", "star"),
    p("제레미 도쿠", "Jérémy Doku", 11, "LW", 23, "Manchester City", "star"),
    p("로멜루 루카쿠", "Romelu Lukaku", 9, "ST", 32, "Napoli", "star"),
    p("로이스 오펜다", "Loïs Openda", 10, "ST", 25, "RB Leipzig", "star"),
    p("르안드로 트로사르", "Leandro Trossard", 17, "LW", 31, "Arsenal", "solid"),
    p("샤를 드 케텔라러", "Charles De Ketelaere", 14, "CAM", 24, "Atalanta", "solid"),
    p("요한 바쿠아이오", "Johan Bakayoko", 19, "RW", 22, "PSV", "solid"),
    p("아서 테아테", "Arthur Theate", 2, "CB", 25, "Eintracht Frankfurt", "solid"),
    p("올리비에 뎀프", "Olivier Deman", 15, "LB", 25, "Werder Bremen", "fringe"),
    p("아스트 판 케넨", "Aster Vranckx", 16, "CM", 22, "VfL Wolfsburg", "fringe"),
    p("미시 바추아이", "Michy Batshuayi", 18, "ST", 32, "Eintracht Frankfurt", "fringe"),
    p("도디 루케바키오", "Dodi Lukebakio", 20, "RW", 27, "Sevilla", "solid"),
    p("토마 뫼니에", "Thomas Meunier", 22, "RB", 34, "Trabzonspor", "fringe"),
    p("잘레우스키", "Alexis Saelemaekers", 13, "RM", 26, "Roma", "fringe"),
    p("마에스", "Orel Mangala", 23, "CDM", 27, "Lyon", "fringe"),
  ],
});

add({
  name: "이탈리아", nameEn: "Italy", fifaCode: "ITA", iso2: "it", confederation: "UEFA", fifaRank: 9,
  colors: { primary: "#0066CC", secondary: "#FFFFFF", accent: "#F1C40F", pattern: "solid" },
  stadium: "스타디오 올림피코 (로마)", worldCupTitles: 4,
  manager: { name: "루치아노 스팔레티", nameEn: "Luciano Spalletti", nationality: "이탈리아", personality: "점유율", preferredFormation: "3-4-2-1", since: 2023 },
  tactics: { formation: "3-4-2-1", mentality: "balanced", pressing: 7, tempo: 6, width: 6, buildUp: "short", defensiveLine: 7 },
  players: [
    p("잔루이지 돈나룸마", "Gianluigi Donnarumma", 1, "GK", 26, "PSG", "star", { isCaptain: true }),
    p("알렉스 메레트", "Alex Meret", 12, "GK", 28, "Napoli", "solid"),
    p("알레산드로 바스토니", "Alessandro Bastoni", 23, "CB", 26, "Inter", "star"),
    p("프란체스코 아체르비", "Francesco Acerbi", 15, "CB", 37, "Inter", "solid"),
    p("리카르도 칼라피오리", "Riccardo Calafiori", 5, "CB", 23, "Arsenal", "star"),
    p("조반니 디 로렌초", "Giovanni Di Lorenzo", 2, "RB", 32, "Napoli", "star"),
    p("페데리코 디마르코", "Federico Dimarco", 3, "LWB", 27, "Inter", "star"),
    p("니콜로 바렐라", "Nicolò Barella", 18, "CM", 28, "Inter", "star"),
    p("산드로 토날리", "Sandro Tonali", 8, "CDM", 25, "Newcastle", "star"),
    p("로렌초 펠레그리니", "Lorenzo Pellegrini", 10, "CAM", 29, "Roma", "solid"),
    p("자코모 라스파도리", "Giacomo Raspadori", 11, "ST", 25, "Napoli", "solid"),
    p("마테오 레텔리", "Mateo Retegui", 9, "ST", 26, "Atalanta", "star"),
    p("페데리코 키에사", "Federico Chiesa", 7, "RW", 28, "Liverpool", "star"),
    p("도메니코 베라르디", "Domenico Berardi", 17, "RW", 31, "Sassuolo", "solid"),
    p("다비데 프라테시", "Davide Frattesi", 16, "CM", 26, "Inter", "solid"),
    p("미카엘 폴로간", "Michael Folorunsho", 14, "CM", 27, "Napoli", "fringe"),
    p("안드레아 캄비아소", "Andrea Cambiaso", 19, "LB", 25, "Juventus", "solid"),
    p("주세페 디 마르티노", "Gianluca Mancini", 4, "CB", 29, "Roma", "solid"),
    p("모이제 킨", "Moise Kean", 20, "ST", 25, "Fiorentina", "solid"),
    p("마테오 폴리타노", "Matteo Politano", 21, "RW", 32, "Napoli", "fringe"),
    p("브라이언 크리스탄테", "Bryan Cristante", 6, "CDM", 30, "Roma", "fringe"),
    p("구글리엘모 비카리오", "Guglielmo Vicario", 13, "GK", 28, "Tottenham", "solid"),
    p("라파엘레 디 젠나로", "Raoul Bellanova", 22, "RWB", 25, "Atalanta", "fringe"),
  ],
});

add({
  name: "크로아티아", nameEn: "Croatia", fifaCode: "CRO", iso2: "hr", confederation: "UEFA", fifaRank: 12,
  colors: { primary: "#FF0000", secondary: "#FFFFFF", accent: "#171796", pattern: "checkered" },
  stadium: "스타디온 막시미르 (자그레브)", worldCupTitles: 0,
  manager: { name: "즐라트코 달리치", nameEn: "Zlatko Dalić", nationality: "크로아티아", personality: "균형", preferredFormation: "4-3-3", since: 2017 },
  tactics: { formation: "4-3-3", mentality: "balanced", pressing: 6, tempo: 5, width: 6, buildUp: "short", defensiveLine: 5 },
  players: [
    p("도미니크 리바코비치", "Dominik Livaković", 1, "GK", 30, "Fenerbahçe", "star"),
    p("요슈코 그바르디올", "Joško Gvardiol", 4, "CB", 23, "Manchester City", "star"),
    p("요시프 슈탈리노비치", "Josip Šutalo", 6, "CB", 25, "Ajax", "solid"),
    p("보르나 소리", "Borna Sosa", 3, "LB", 27, "Ajax", "solid"),
    p("요시프 스탄시치", "Josip Stanišić", 2, "RB", 25, "Bayern Munich", "solid"),
    p("루카 모드리치", "Luka Modrić", 10, "CM", 40, "AC Milan", "star", { isCaptain: true }),
    p("마테오 코바치치", "Mateo Kovačić", 8, "CM", 31, "Manchester City", "star"),
    p("마르셀로 브로조비치", "Marcelo Brozović", 11, "CDM", 32, "Al-Nassr", "solid"),
    p("니콜라 블라시치", "Nikola Vlašić", 13, "CAM", 27, "Torino", "solid"),
    p("로브로 마예르", "Lovro Majer", 7, "CM", 27, "VfL Wolfsburg", "solid"),
    p("안드레예 크라마리치", "Andrej Kramarić", 9, "ST", 34, "Hoffenheim", "star"),
    p("브루노 페트코비치", "Bruno Petković", 14, "ST", 31, "Dinamo Zagreb", "solid"),
    p("마리오 파샬리치", "Mario Pašalić", 15, "CM", 30, "Atalanta", "solid"),
    p("이반 페리시치", "Ivan Perišić", 4, "LW", 36, "Hajduk Split", "solid"),
    p("Ante Budimir", "Ante Budimir", 17, "ST", 34, "Osasuna", "solid"),
    p("요시프 슈탈", "Josip Juranović", 22, "RB", 29, "Union Berlin", "fringe"),
    p("마르틴 에를리치", "Martin Erlić", 5, "CB", 27, "Bologna", "fringe"),
    p("루카 수시치", "Luka Sučić", 18, "CM", 23, "Real Sociedad", "solid"),
    p("마르코 파샤리치", "Marko Pjaca", 20, "LW", 30, "Dinamo Zagreb", "fringe"),
    p("이보 그르비치", "Ivo Grbić", 12, "GK", 29, "Sheffield United", "fringe"),
    p("도마고이 비다", "Domagoj Vida", 21, "CB", 36, "AEK Athens", "fringe"),
    p("미슬라브 오르시치", "Mislav Oršić", 19, "LW", 32, "Trabzonspor", "fringe"),
    p("보르나 바리시치", "Borna Barišić", 16, "LB", 32, "Trabzonspor", "fringe"),
  ],
});

// Write progress checkpoint - continue with more teams in same file
console.log("Base European teams defined:", teams.length);

// Continue adding remaining teams in a second data blob for manageability
const more = await import("./gen-nations-data.mjs").catch(() => null);
if (more?.extraTeams) {
  for (const t of more.extraTeams) add(t);
}

function serializePlayer(pl) {
  const parts = [
    `name: ${JSON.stringify(pl.name)}`,
    `nameEn: ${JSON.stringify(pl.nameEn)}`,
    `number: ${pl.number}`,
    `position: ${JSON.stringify(pl.position)}`,
    `age: ${pl.age}`,
    `club: ${JSON.stringify(pl.club)}`,
  ];
  if (pl.tier) parts.push(`tier: ${JSON.stringify(pl.tier)}`);
  if (pl.isCaptain) parts.push(`isCaptain: true`);
  if (pl.preferredFoot) parts.push(`preferredFoot: ${JSON.stringify(pl.preferredFoot)}`);
  return `{ ${parts.join(", ")} }`;
}

function serializeTeam(t) {
  return `makeTeam({
  name: ${JSON.stringify(t.name)},
  nameEn: ${JSON.stringify(t.nameEn)},
  fifaCode: ${JSON.stringify(t.fifaCode)},
  iso2: ${JSON.stringify(t.iso2)},
  confederation: ${JSON.stringify(t.confederation)},
  fifaRank: ${t.fifaRank},
  colors: ${JSON.stringify(t.colors)},
  stadium: ${JSON.stringify(t.stadium)},
  manager: ${JSON.stringify(t.manager)},
  tactics: ${JSON.stringify(t.tactics)},
  worldCupTitles: ${t.worldCupTitles ?? 0},
  players: [
    ${t.players.map(serializePlayer).join(",\n    ")}
  ],
})`;
}

// Group by confederation files
const byConf = {
  europe: [],
  southAmerica: [],
  africa: [],
  asia: [],
  concacaf: [],
  oceania: [],
};

for (const t of teams) {
  if (t.confederation === "UEFA") byConf.europe.push(t);
  else if (t.confederation === "CONMEBOL") byConf.southAmerica.push(t);
  else if (t.confederation === "CAF") byConf.africa.push(t);
  else if (t.confederation === "AFC") byConf.asia.push(t);
  else if (t.confederation === "CONCACAF") byConf.concacaf.push(t);
  else byConf.oceania.push(t);
}

const header = `import { makeTeam } from './_helpers';\n\n`;

for (const [file, list] of Object.entries(byConf)) {
  if (!list.length) continue;
  const body = `export const ${file}Teams = [\n${list.map(serializeTeam).join(",\n")}\n];\n`;
  writeFileSync(`src/data/nations/${file}.ts`, header + body);
  console.log("Wrote", file, list.length);
}

const index = `import type { Team } from '@/types/football';
import { europeTeams } from './europe';
import { southAmericaTeams } from './southAmerica';
import { africaTeams } from './africa';
import { asiaTeams } from './asia';
import { concacafTeams } from './concacaf';
import { oceaniaTeams } from './oceania';

export const ALL_OFFICIAL_TEAMS: Team[] = [
  ...europeTeams,
  ...southAmericaTeams,
  ...africaTeams,
  ...asiaTeams,
  ...concacafTeams,
  ...oceaniaTeams,
].sort((a, b) => a.fifaRank - b.fifaRank);

export function getOfficialTeam(id: string): Team | undefined {
  return ALL_OFFICIAL_TEAMS.find((t) => t.id === id || t.fifaCode === id);
}
`;
writeFileSync("src/data/nations/index.ts", index);
console.log("Total teams so far:", teams.length);
console.log("NOTE: Run gen-nations-full.mjs for complete roster of 130 teams");
