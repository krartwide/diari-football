import { makeTeam, type RawPlayer } from './_helpers';

type Groups = [string, string, string, string];

const positions: RawPlayer['position'][][] = [
  ['GK', 'GK'],
  ['RB', 'CB', 'CB', 'CB', 'LB', 'LB'],
  ['CDM', 'CM', 'CM', 'CAM', 'RM', 'LM'],
  ['RW', 'ST', 'ST', 'LW', 'CF', 'RW'],
];

function roster(groups: Groups): RawPlayer[] {
  let number = 0;
  return groups.flatMap((group, groupIndex) =>
    group.split(',').map((entry, index) => {
      number += 1;
      const captain = entry.startsWith('*');
      const value = captain ? entry.slice(1) : entry;
      const [displayName, englishName = displayName] = value.split('/');
      return {
        name: displayName,
        nameEn: englishName,
        number,
        position: positions[groupIndex][index],
        age: 21 + ((number * 7 + englishName.length) % 13),
        club: '국가대표팀',
        isCaptain: captain || undefined,
        tier: number <= 3 ? 'star' : number <= 16 ? 'solid' : 'fringe',
      };
    }),
  );
}

function team(
  name: string,
  nameEn: string,
  fifaCode: string,
  iso2: string,
  fifaRank: number,
  stadium: string,
  managerName: string,
  managerNationality: string,
  colors: [string, string, string],
  groups: Groups,
  formation = '4-3-3',
) {
  return makeTeam({
    name,
    nameEn,
    fifaCode,
    iso2,
    confederation: 'CAF',
    fifaRank,
    colors: { primary: colors[0], secondary: colors[1], accent: colors[2] },
    stadium,
    manager: {
      name: managerName,
      nameEn: managerName,
      nationality: managerNationality,
      personality: '균형',
      preferredFormation: formation,
      since: 2024,
    },
    tactics: {
      formation,
      mentality: 'balanced',
      pressing: 7,
      tempo: 7,
      width: 6,
      buildUp: 'mixed',
      defensiveLine: 6,
    },
    players: roster(groups),
  });
}

export const africaTeams = [
  team('모로코', 'Morocco', 'MAR', 'ma', 11, 'Prince Moulay Abdellah Stadium', 'Walid Regragui', '모로코', ['#c1272d', '#ffffff', '#006233'], [
    '야신 부누/Yassine Bounou,무니르 엘 카주이/Munir El Kajoui',
    '아슈라프 하키미/Achraf Hakimi,나예프 아게르드/Nayef Aguerd,로맹 사이스/Romain Saiss,샤디 리아드/Chadi Riad,누사이르 마즈라위/Noussair Mazraoui,아담 아즈누/Adam Aznou',
    '소피안 암라바트/Sofyan Amrabat,아제딘 우나히/Azzedine Ounahi,이스마엘 사이바리/Ismael Saibari,빌랄 엘 카누스/Bilal El Khannouss,아미르 리샤르드송/Amir Richardson,우사마 타르갈린/Oussama Targhalline',
    '*브라힘 디아스/Brahim Diaz,유세프 엔네시리/Youssef En-Nesyri,아유브 엘 카비/Ayoub El Kaabi,압데 에잘줄리/Abde Ezzalzouli,엘리아스 벤 세기르/Eliesse Ben Seghir,하킴 지예시/Hakim Ziyech',
  ]),
  team('세네갈', 'Senegal', 'SEN', 'sn', 18, 'Stade Abdoulaye Wade', 'Pape Thiaw', '세네갈', ['#00853f', '#ffffff', '#fdef42'], [
    '에두아르 멘디/Edouard Mendy,예후반 디우프/Yehvann Diouf',
    '크레팽 디아타/Krepin Diatta,칼리두 쿨리발리/Kalidou Koulibaly,무사 니아카테/Moussa Niakhate,압두 디알로/Abdou Diallo,이스마일 야콥스/Ismail Jakobs,엘 하지 말릭 디우프/El Hadji Malick Diouf',
    '이드리사 게예/Idrissa Gueye,파페 마타르 사르/Pape Matar Sarr,라민 카마라/Lamine Camara,아비브 디아라/Habib Diarra,파테 시스/Pathe Ciss,파페 게예/Pape Gueye',
    '이스마일라 사르/Ismaila Sarr,니콜라 잭슨/Nicolas Jackson,불라예 디아/Boulaye Dia,*사디오 마네/Sadio Mane,일리만 은디아예/Iliman Ndiaye,셰리프 은디아예/Cherif Ndiaye',
  ]),
  team('이집트', 'Egypt', 'EGY', 'eg', 35, 'Cairo International Stadium', 'Hossam Hassan', '이집트', ['#ce1126', '#ffffff', '#000000'], [
    '모하메드 엘 셰나위/Mohamed El Shenawy,모스타파 쇼베이르/Mostafa Shobeir',
    '모하메드 하니/Mohamed Hany,라미 라비아/Ramy Rabia,모하메드 압델모넴/Mohamed Abdelmonem,아흐메드 헤가지/Ahmed Hegazi,아흐메드 파투/Ahmed Fatouh,모하메드 함디/Mohamed Hamdy',
    '함디 파티/Hamdy Fathy,마르완 아티아/Marwan Attia,에맘 아슈르/Emam Ashour,아흐메드 사이드 지조/Ahmed Sayed Zizo,마흐무드 트레제게/Mahmoud Trezeguet,이브라힘 아델/Ibrahim Adel',
    '*모하메드 살라/Mohamed Salah,모스타파 모하메드/Mostafa Mohamed,오마르 마르무시/Omar Marmoush,라마단 소비/Ramadan Sobhi,모하메드 셰리프/Mohamed Sherif,모스타파 파티/Mostafa Fathi',
  ]),
  team('알제리', 'Algeria', 'ALG', 'dz', 37, 'Nelson Mandela Stadium', 'Vladimir Petkovic', '스위스', ['#ffffff', '#006233', '#d21034'], [
    '알렉시스 겐두즈/Alexis Guendouz,앙토니 만드레아/Anthony Mandrea',
    '유세프 아탈/Youcef Atal,아이사 만디/Aissa Mandi,라미 벤세바이니/Ramy Bensebaini,모하메드 아민 투가이/Mohamed Amine Tougai,자우엔 하지암/Jaouen Hadjam,라얀 아이트누리/Rayan Ait-Nouri',
    '이스마엘 벤나세르/Ismael Bennacer,히셈 부다위/Hicham Boudaoui,아담 제로가/Adem Zorgane,파레스 샤이비/Fares Chaibi,후셈 아우아르/Houssem Aouar,이브라힘 마자/Ibrahim Maza',
    '*리야드 마레즈/Riyad Mahrez,아민 구이리/Amine Gouiri,바그다드 부네자/Baghdad Bounedjah,사이드 벤라마/Said Benrahma,모하메드 아무라/Mohamed Amoura,아니스 하지무사/Anis Hadj Moussa',
  ]),
  team('코트디부아르', 'Ivory Coast', 'CIV', 'ci', 42, 'Alassane Ouattara Stadium', 'Emerse Fae', '코트디부아르', ['#f77f00', '#ffffff', '#009e60'], [
    '야히아 포파나/Yahia Fofana,바드라 알리 상가레/Badra Ali Sangare',
    '윌프리드 싱고/Wilfried Singo,오딜롱 코수누/Odilon Kossounou,에반 은디카/Evan Ndicka,우스만 디오망드/Ousmane Diomande,기슬랭 코낭/Ghislain Konan,와요 쿨리발리/Woyo Coulibaly',
    '프랑크 케시에/Franck Kessie,이브라힘 상가레/Ibrahim Sangare,세코 포파나/Seko Fofana,장 미카엘 세리/Jean Michael Seri,하메드 주니오르 트라오레/Hamed Junior Traore,게일 두에/Guela Doue',
    '니콜라 페페/Nicolas Pepe,세바스티앵 알레/Sebastien Haller,에마뉘엘 라테 라스/Emmanuel Latte Lath,시몽 아딩그라/Simon Adingra,*윌프리드 자하/Wilfried Zaha,오마르 디아키테/Oumar Diakite',
  ]),
  team('나이지리아', 'Nigeria', 'NGA', 'ng', 44, 'Moshood Abiola National Stadium', 'Eric Chelle', '말리', ['#008753', '#ffffff', '#005a36'], [
    '스탠리 은와발리/Stanley Nwabali,마두카 오코예/Maduka Okoye',
    '올라 아이나/Ola Aina,윌리엄 트루스트에콩/William Troost-Ekong,캘빈 배시/Calvin Bassey,세미 아자이/Semi Ajayi,브루노 오니에마에치/Bruno Onyemaechi,자이두 사누시/Zaidu Sanusi',
    '윌프레드 은디디/Wilfred Ndidi,알렉스 이워비/Alex Iwobi,프랭크 오니에카/Frank Onyeka,조 아리보/Joe Aribo,라파엘 오니에디카/Raphael Onyedika,피사요 델레바시루/Fisayo Dele-Bashiru',
    '사무엘 추쿠에제/Samuel Chukwueze,*빅터 오시멘/Victor Osimhen,빅터 보니페이스/Victor Boniface,아데몰라 루크먼/Ademola Lookman,모지스 사이먼/Moses Simon,나단 텔라/Nathan Tella',
  ]),
  team('콩고민주공화국', 'DR Congo', 'COD', 'cd', 48, 'Stade des Martyrs', 'Sebastien Desabre', '프랑스', ['#007fff', '#f7d618', '#ce1021'], [
    '리오넬 음파시/Lionel Mpasi,디미트리 베르토/Dimitry Bertaud',
    '가엘 카쿠타/Gedeon Kalulu,샹셀 음벰바/Chancel Mbemba,악셀 튀앙제브/Axel Tuanzebe,록키 부싱리/Rocky Bushiri,아르튀르 마쉬아퀴/Arthur Masuaku,요리스 카옘베/Joris Kayembe',
    '사뮈엘 무투사미/Samuel Moutoussamy,샤를 피켈/Charles Pickel,에도 카옘베/Edo Kayembe,테오 봉곤다/Theo Bongonda,가엘 카쿠타/Gael Kakuta,노아 사디키/Noah Sadiki',
    '메샤크 엘리아/Meschack Elia,세드리크 바캄부/Cedric Bakambu,시몽 반자/Simon Banza,요안 위사/Yoane Wissa,*그라디 디앙가나/Grady Diangana,피스톤 마옐레/Fiston Mayele',
  ]),
  team('카메룬', 'Cameroon', 'CMR', 'cm', 51, 'Olembe Stadium', 'David Pagou', '카메룬', ['#007a5e', '#ce1126', '#fcd116'], [
    '앙드레 오나나/Andre Onana,파브리스 온도아/Fabrice Ondoa',
    '잭슨 차추아/Jackson Tchatchoua,크리스토페르 우/Christopher Wooh,장샤를 카스텔레토/Jean-Charles Castelletto,마이클 은가되/Michael Ngadeu,누 우 톨로/Nouhou Tolo,다를린 용와/Darlin Yongwa',
    '앙드레프랑크 잠보 앙기사/Andre-Frank Zambo Anguissa,카를로스 발레바/Carlos Baleba,마르탱 옹글라/Martin Hongla,올리비에 은참/Olivier Ntcham,이반 네유/Yvan Neyou,가엘 온두아/Gael Ondoua',
    '브리앙 음뵈모/Bryan Mbeumo,*뱅상 아부바카르/Vincent Aboubakar,프랑크 마그리/Frank Magri,조르주케빈 은쿠두/Georges-Kevin Nkoudou,크리스티앙 바소고그/Christian Bassogog,파리스 무움바냐/Faris Moumbagna',
  ]),
  team('말리', 'Mali', 'MLI', 'ml', 54, 'Stade du 26 Mars', 'Tom Saintfiet', '벨기에', ['#14b53a', '#fcd116', '#ce1126'], [
    '지기 디아라/Djigui Diarra,이스마엘 디아와라/Ismael Diawara',
    '아마리 트라오레/Hamari Traore,부바카르 쿠야테/Boubakar Kouyate,시쿠 니아카테/Sikou Niakate,마마두 포파나/Mamadou Fofana,팔라예 사코/Falaye Sacko,마시디오 아이다라/Massadio Haidara',
    '이브 비수마/Yves Bissouma,아마두 아이다라/Amadou Haidara,모하메드 카마라/Mohamed Camara,알리우 디엥/Aliou Dieng,라사나 쿨리발리/Lassana Coulibaly,카모리 둠비아/Kamory Doumbia',
    '세쿠 코이타/Sekou Koita,엘 빌랄 투레/El Bilal Toure,라시네 시나요코/Lassine Sinayoko,아다마 트라오레/Adama Traore,*네네 도르젤레스/Nene Dorgeles,마마두 둠비아/Mamadou Doumbia',
  ]),
  team('남아프리카공화국', 'South Africa', 'RSA', 'za', 57, 'FNB Stadium', 'Hugo Broos', '벨기에', ['#ffb81c', '#007749', '#002395'], [
    '론웬 윌리엄스/Ronwen Williams,리카르도 고스/Ricardo Goss',
    '카니소 무다우/Khuliso Mudau,시야봉가 은게자나/Siyabonga Ngezana,모타비 음발라/Mothobi Mvala,그랜트 케카나/Grant Kekana,오브리 모디바/Aubrey Modiba,파와즈 바시에라딘/Fawaaz Basadien',
    '테보호 모코에나/Teboho Mokoena,스피셸레 시톨레/Sphephelo Sithole,타펠로 모레나/Thapelo Morena,패트릭 마시왕고/Pattick Maswanganyi,레보항 모토바/LeBohang Mothiba,시푸메렐레 음쿨리세/Sphephelo Mkhulise',
    '엘리아스 모카와나/Elias Mokwana,라일 포스터/Lyle Foster,이끄람 레이너스/Iqraam Rayners,*퍼시 타우/Percy Tau,오스윈 아폴리스/Oswin Appollis,에비던스 막고파/Evidence Makgopa',
  ]),
  team('튀니지', 'Tunisia', 'TUN', 'tn', 49, 'Hammadi Agrebi Stadium', 'Sami Trabelsi', '튀니지', ['#e70013', '#ffffff', '#a50018'], [
    '아이멘 다멘/Aymen Dahmen,베시르 벤 사이드/Bechir Ben Said',
    '와즈디 케크리다/Wajdi Kechrida,야신 메리아/Yassine Meriah,몽타사르 탈비/Montassar Talbi,딜런 브론/Dylan Bronn,알리 압디/Ali Abdi,우사마 하다디/Oussama Haddadi',
    '엘리에스 스키리/Ellyes Skhiri,아이사 라이두니/Aissa Laidouni,모하메드 알리 벤 롬단/Mohamed Ali Ben Romdhane,한니발 메지브리/Hannibal Mejbri,페르자니 사시/Ferjani Sassi,아니스 벤 슬리만/Anis Ben Slimane',
    '엘리아스 아슈리/Elias Achouri,하젬 마스투리/Hazem Mastouri,세이페딘 자지리/Seifeddine Jaziri,*유세프 므사크니/Youssef Msakni,사이팔라 르타이에프/Sayfallah Ltaief,모르타다 벤 와네스/Mortadha Ben Ouanes',
  ]),
  team('부르키나파소', 'Burkina Faso', 'BFA', 'bf', 62, 'Stade du 4 Aout', 'Brama Traore', '부르키나파소', ['#009e49', '#ef2b2d', '#fcd116'], [
    '에르베 코피/Herve Koffi,킬리안 니키에마/Killian Nikiema',
    '이사 카보레/Issa Kabore,에드몽 탑소바/Edmond Tapsoba,이수프 다요/Issoufou Dayo,스테브 야고/Steeve Yago,야쿠바 쿨리발리/Yacouba Coulibaly,아르센 쿨라/Arsene Kouassi',
    '이브라힘 블라티 투레/Ibrahim Blati Toure,이스마힐라 우에드라오고/Ismahila Ouedraogo,세드리크 바도롤로/Cedric Badolo,구스타보 상가레/Gustavo Sangare,모하메드 주그라나/Mohamed Zougrana,스테판 아지즈 키/Stephane Aziz Ki',
    '당고 우아타라/Dango Ouattara,모하메드 코나테/Mohamed Konate,라시나 트라오레/Lassina Traore,*베르트랑 트라오레/Bertrand Traore,시릴 바얄라/Cyrille Bayala,하사네 방데/Hassane Bande',
  ]),
  team('카보베르데', 'Cape Verde', 'CPV', 'cv', 72, 'Estadio Nacional de Cabo Verde', 'Bubista', '카보베르데', ['#003893', '#ffffff', '#cf2027'], [
    '보지냐/Vozinha,마르시우 호자/Marcio Rosa',
    '스티븐 모레이라/Steven Moreira,로베르토 로페스/Roberto Lopes,로강 코스타/Logan Costa,딜란 타바레스/Dylan Tavares,주앙 파울루 페르난데스/Joao Paulo Fernandes,케니 호샤 산투스/Kenny Rocha Santos',
    '케빈 피나/Kevin Pina,자미루 몬테이루/Jamiro Monteiro,데를레이 두아르테/Deroy Duarte,주앙 파울루 페르난데스/Joao Paulo Fernandes,텔모 아르칸주/Telmo Arcanjo,파트리크 안드라데/Patrick Andrade',
    '라이언 멘데스/Ryan Mendes,베베/Bebe,지우송 타바레스/Gilson Tavares,조반 카브랄/Jovane Cabral,*가리 호드리게스/Garry Rodrigues,윌리 세메두/Willy Semedo',
  ]),
  team('가나', 'Ghana', 'GHA', 'gh', 76, 'Baba Yara Stadium', 'Otto Addo', '가나', ['#ffffff', '#000000', '#fcd116'], [
    '로런스 아티지기/Lawrence Ati-Zigi,벤저민 아산테/Benjamin Asare',
    '타리크 램프티/Tariq Lamptey,알렉산더 지쿠/Alexander Djiku,모하메드 살리수/Mohammed Salisu,제롬 오포쿠/Jerome Opoku,기디언 멘사/Gideon Mensah,데니스 오도이/Denis Odoi',
    '토마스 파티/Thomas Partey,살리스 압둘 사메드/Salis Abdul Samed,엘리샤 오우수/Elisha Owusu,모하메드 쿠두스/Mohammed Kudus,이브라힘 술레마나/Ibrahim Sulemana,마지드 아시메루/Majeed Ashimeru',
    '앙투안 세메뇨/Antoine Semenyo,조던 아유/Jordan Ayew,이나키 윌리엄스/Inaki Williams,*앙드레 아유/Andre Ayew,카말딘 술레마나/Kamaldeen Sulemana,어니스트 누아마/Ernest Nuamah',
  ]),
  team('기니', 'Guinea', 'GUI', 'gn', 80, 'Stade General Lansana Conte', 'Paulo Duarte', '포르투갈', ['#ce1126', '#fcd116', '#009460'], [
    '이브라힘 코네/Ibrahim Kone,무사 카마라/Moussa Camara',
    '앙투안 콩트/Antoine Conte,무크타르 디아카비/Mouctar Diakhaby,사이두 소우/Saidou Sow,줄리앙 장비에/Julian Jeanvier,이시아가 실라/Issiaga Sylla,세쿠 실라/Sekou Sylla',
    '아마두 디아와라/Amadou Diawara,일라시 모리바/Ilaix Moriba,모리 코나테/Mory Konate,아기부 카마라/Aguibou Camara,세이두바 시세/Seydouba Cisse,압둘라예 투레/Abdoulaye Toure',
    '모르강 길라보기/Morgan Guilavogui,세루 기라시/Serhou Guirassy,모하메드 바요/Mohamed Bayo,*나비 케이타/Naby Keita,프랑수아 카마노/Francois Kamano,압둘라예 카마라/Abdoulaye Camara',
  ]),
  team('앙골라', 'Angola', 'ANG', 'ao', 87, 'Estadio 11 de Novembro', 'Patrice Beaumelle', '프랑스', ['#cc092f', '#000000', '#ffcb00'], [
    '네블루/Neblu,우고 마르케스/Hugo Marques',
    '클린통 마타/Clinton Mata,키알론다 가스파르/Kialonda Gaspar,조나탕 부아투/Jonathan Buatu,바스투스/Bastos,토 카르네이루/To Carneiro,누리우 포르투나/Nurio Fortuna',
    '마누엘 켈리아누/Manuel Keliano,쇼/Show,프레디/Fredy,에스텔라/Estrela,지우베르투/Gilberto,밀송/Milson',
    '젤송 달라/Gelson Dala,음불라 은졸라/Mbala Nzola,마부룰루/Mabululu,*마누엘 카푸마나 쇼/Manuel Cafumana Show,치쿠 반자/Chico Banza,자니니/Jeremy Bela',
  ]),
  team('가봉', 'Gabon', 'GAB', 'ga', 84, 'Stade de Franceville', 'Thierry Mouyouma', '가봉', ['#fcd116', '#009e60', '#3a75c4'], [
    '로이 음바바/Loyce Mbaba,안토니 음파 파투/Anthony Mfa Mezui',
    '앙토니 오요노/Anthony Oyono,브루노 에퀴엘 망가/Bruno Ecuele Manga,아롱 아팽당고예/Aaron Appindangoye,시드니 오비사/Sidney Obissa,자크 에코미/Jacques Ekomie,요아니스 오비앙/Johann Obiang',
    '마리오 레미나/Mario Lemina,디디에 은동/Didier Ndong,게로르 캉가/Guelor Kanga,마르코 은도/Marco Ndo,메드윈 비테게/Medwin Biteghe,클레르몽 아켄당/Clermont Akendeng',
    '짐 알레비나/Jim Allevinah,드니 부앙가/Denis Bouanga,샤비 바비카/Shavy Babicka,*피에르에메리크 오바메양/Pierre-Emerick Aubameyang,악셀 메예/Axel Meye,알렉스 무쿤두/Alex Moucketou',
  ]),
  team('우간다', 'Uganda', 'UGA', 'ug', 88, 'Mandela National Stadium', 'Paul Put', '벨기에', ['#fcdc04', '#000000', '#d90000'], [
    '이스마 와툰가/Ismail Watenga,살림 자말/Salim Jamal',
    '엘리오 카프라도시/Elio Capradossi,베비스 무가비/Bevis Mugabi,할리드 아우초/Khalid Aucho,티모시 아와니/Timothy Awany,아지지 카욘도/Aziz Kayondo,니코 와두다/Nico Wadada',
    '보브라한 키즈토/Bobosi Byaruhanga,토니 마웨지/Toni Mawejje,트래비스 무티야바/Travis Mutyaba,알란 오켈로/Allan Okello,모지스 와이스와/Moses Waiswa,샤피크 카기무/Shafik Kagimu',
    '로저스 마토/Rogers Mato,스티븐 무쿠왈라/Steven Mukwala,파하드 바요/Fahad Bayo,*에마뉘엘 오크위/Emmanuel Okwi,압달라 살림/Abdallah Salim,무함마드 샤반/Muhammad Shaban',
  ]),
  team('베냉', 'Benin', 'BEN', 'bj', 92, 'Stade de l Amitie', 'Gernot Rohr', '독일', ['#008751', '#fcd116', '#e8112d'], [
    '마르셀 당댕누/Marcel Dandjinou,사투르냉 알라그베/Saturnin Allagbe',
    '이시아카 무민/Issiaka Moumini,세드리크 운톤지/Cedric Hountondji,올리비에 베르동/Olivier Verdon,모하메드 티자니/Mohamed Tijani,야리마르 베르통/Yarimar Verdon,다비드 키키/David Kiki',
    '세시 달메이다/Sessi D Almeida,조델 도수/Jodel Dossou,마테오 알린비/Matteo Ahlinvi,도도 도쿠/Dodo Dokou,사미 세시뇽/Stephane Sessegnon,주니오르 올라이터/Junior Olaitan',
    '안드레아스 운톤지/Andreas Hountondji,스티브 무니에/Steve Mounie,토신 아이예군/Tosin Aiyegun,*스티브 무니에/Steve Mounie,아나네 티자니/Anane Tidjani,로무알드 비아기/Romuald Biaou',
  ]),
  team('잠비아', 'Zambia', 'ZAM', 'zm', 94, 'Levy Mwanawasa Stadium', 'Moses Sichone', '잠비아', ['#ef7d00', '#008751', '#000000'], [
    '로런스 물렝가/Lawrence Mulenga,토스터 은사바타/Toaster Nsabata',
    '베네딕트 체페시/Benedict Chepeshi,스톱필라 순주/Stopilla Sunzu,프랭키 무손다/Frankie Musonda,도미닉 찬다/Dominic Chanda,루방보 무송다/Lubambo Musonda,로드릭 카봬/Rodrick Kabwe',
    '미겔 치앙가/Miguel Chaiwa,킹스 캉와/Kings Kangwa,클라투스 차마/Clatous Chama,에마뉘엘 반다/Emmanuel Banda,래리 음발라/Larry Mbalala,패트릭 곤돌라/Patrick Gondwe',
    '라메크 반다/Lameck Banda,팻슨 다카/Patson Daka,패션 사칼라/Fashion Sakala,*에노크 음웨푸/Enock Mwepu,에드워드 칠루피아/Edward Chilufya,케네디 무손다/Kennedy Musonda',
  ]),
  team('모잠비크', 'Mozambique', 'MOZ', 'mz', 99, 'Estadio do Zimpeto', 'Chiquinho Conde', '모잠비크', ['#d21034', '#000000', '#fce100'], [
    '에르나니 실루아네/Ernan Siluane,이바네 우라발/Ivane Urrubal',
    '나나니/Nanani,멕세르/Mexer,헤이닐두 만다바/Reinildo Mandava,에드미우송 도브레/Edmilson Dove,브루누 랑가/Bruno Langa,도밍구스 마칸자/Domingos Macandza',
    '알폰스 아마데/Alfons Amade,구이마/Guima,아마두 하이다라/Amadou Haidara,히카르두 기마랑이스/Ricardo Guimaraes,도밍게스/Domingues,샤키르/Shakir',
    '제니 카타모/Geny Catamo,스탠리 라티포/Stanley Ratifo,클레지우 바우케/Clésio Bauque,*엘리아스 페렘베/Elias Pelembe,위티/Clésio Witi,파이살 방갈/Faisal Bangal',
  ]),
  team('적도 기니', 'Equatorial Guinea', 'EQG', 'gq', 97, 'Nuevo Estadio de Malabo', 'Juan Micha', '적도 기니', ['#3e9a00', '#ffffff', '#e32118'], [
    '헤수스 오워노/Jesus Owono,마누엘 사푸가/Manuel Sapunga',
    '카를로스 아카포/Carlos Akapo,에스테반 오비앙/Esteban Obiang,사울 코코/Saul Coco,바실리오 은동/Basilio Ndong,마빈 아냬보/Marvin Aniebo,루이스 엔리케 은라보/Luis Enrique Nsue',
    '페데리코 비코로/Federico Bikoro,호세 마친/Jose Machin,파블로 가네트/Pablo Ganet,얀닉 부일라/Yannick Buyla,조시페미 엔동/Josete Miranda,알렉스 발보아/Alex Balboa',
    '이반 살바도르/Iban Salvador,에밀리오 은수에/Emilio Nsue,도리안 주니오르/Dorian Junior,루이스 은라보/Luis Nlavo,*페드로 오비앙/Pedro Obiang,호세 엘로/Jose Elo',
  ]),
  team('마다가스카르', 'Madagascar', 'MAD', 'mg', 108, 'Mahamasina Stadium', 'Corentin Martins', '프랑스', ['#ffffff', '#fc3d32', '#007e3a'], [
    '멜뱅 아드리앵/Melvin Adrien,소니 레트시마/Sonny Laiton',
    '로맹 메타니르/Romain Metanire,토마스 퐁텐/Thomas Fontaine,파스칼 라자카난테나이나/Pascal Razakanantenaina,케난 라자피마하트라트라/Kenan Razafimahatatra,켈빈 라베로손/Kelvin Rabarivony,브라이언 라부엘로손/Bryan Rabuelo',
    '마르코 일라이마하리트라/Marco Ilaimaharitra,아니세 아벨/Anicet Abel,라이안 라벨로손/Rayan Raveloson,올리비에 란드리아차/Olivier Randriatsiferana,로익 라푸시느/Loic Lapoussin,아르노 란드리아나리소아/Arnaud Randrianarisoa',
    '라라이나 노멘자나하리/Lalaina Nomenjanahary,파울린 보아비/Paulin Voavy,하지 안드리아마나토아/Hadji Andriamihaja,캐롤리스 마스투르/Karim Cisse,*파네바 이마 안드리아치마/Faneva Ima Andriatsima,차를레스 안드리아마치노로/Charles Andriamanitsinoro',
  ]),
  team('코모로', 'Comoros', 'COM', 'km', 105, 'Stade Omnisports de Malouzini', 'Stefano Cusin', '이탈리아', ['#3d8e33', '#ffffff', '#ffc61e'], [
    '얀니크 판도르/Yannick Pandor,살림 벤 부아나/Salim Ben Boina',
    '사이드 바카리/Said Bakari,카심 음다호마/Kassim M Dahoma,아흐메드 소일리히/Ahmed Soilihi,라픽 사이드/Rafiki Said,샤케르 알하두르/Chaker Alhadhur,압달라 알리 모하메드/Abdallah Ali Mohamed',
    '유수프 음창가마/Youssouf M Changama,야신 부르하네/Yacine Bourhane,아흐메드 모그니/Ahmed Mogni,하루나 알리/Haron Ali,라얀 루타/Rayan Lutin,자이드 아미르/Zaydou Youssouf',
    '파이즈 셀레마니/Faiz Selemani,미지안 마올리다/Myziane Maolida,엘 파르두 벤 나부아네/El Fardou Ben Nabouhane,*유수프 음창가마/Youssouf M Changama,라픽 사이드/Rafiki Said,벤잘루드 유수프/Benjaloud Youssouf',
  ]),
  team('감비아', 'Gambia', 'GAM', 'gm', 115, 'Independence Stadium', 'Johnathan McKinstry', '북아일랜드', ['#ce1126', '#0c1c8c', '#3a7728'], [
    '바부카르 가예/Baboucarr Gaye,셰이크 시비/Sheikh Sibi',
    '사이디 얀코/Saidy Janko,제임스 고메즈/James Gomez,오마르 콜리/Omar Colley,노아 손코 순드베리/Noah Sonko Sundberg,에브리마 다르보/Ebrima Darboe,야히아 파파나/Yahya Fofana',
    '에브리마 다르보/Ebrima Darboe,알라산 마네/Alasana Manneh,압둘리 시세/Abdoulie Ceesay,에브리마 콜리/Ebrima Colley,하무스 시세/Hamza Barry,마흐디 카마라/Mahdi Camara',
    '무사 배로/Musa Barrow,알리 소웨/Ali Sowe,무하마두 바지/Muhammed Badamosi,*아산 시세이/Assan Ceesay,얀쿠바 민테/Yankuba Minteh,압둘리 마네/Abdoulie Manneh',
  ]),
  team('모리타니', 'Mauritania', 'MTN', 'mr', 110, 'Stade Cheikha Ould Boidiya', 'Aritz Lopez Garai', '스페인', ['#00a95c', '#ffffff', '#d01c1f'], [
    '바바카르 니아세/Babacar Niasse,남부가 세쿠/Namori Diaw',
    '이지 부바카르/Yali Dellahi,누후 무사/Nouh Mohamed El Abd,아부바카르 카마라/Aly Abeid,라민 바/Lamine Ba,하루나 아부 뎀바/Harouna Abou Demba,이브라히마 케이타/Ibrahima Keita',
    '게수마 포파나/Gessouma Fofana,이드리사 티암/Idrissa Thiam,엘 하센 우드 예드/El Hacen Houeibib,오마르 은고미/Oumar Ngom,사아드 부/Saad Mint,압둘라히 마흐무드/Abdallahi Mahmoud',
    '아부바카르 카마라/Aboubakar Kamara,파프 은디아가 야데/Pape Ndiaga Yade,아마르 시디 부나/Amar Sidi Bouna,*아다마 바/Adama Ba,술레이마네 안/Souleymane Anne,시디 부나 아마르/Sidi Bouna Amar',
  ]),
  team('니제르', 'Niger', 'NIG', 'ne', 121, 'Stade General Seyni Kountche', 'Badou Zaki', '모로코', ['#e05206', '#ffffff', '#0db02b'], [
    '마하마두 탄자/Mahamadou Tanja,알하사네 세이두/Alhassane Seydou',
    '압둘 가르바/Abdoul Garba,카데르 아마두/Kader Amadou,누후 딕코/Nouhou Dicko,유수프 우마루/Youssouf Oumarou,아마두 와펠/Amadou Wonkoye,이사카 시디베/Issaka Sidibe',
    '알하산 다보/Alhassan Dabo,부레이마 카타코레/Boureima Katakore,아마두 무타리/Amadou Moutari,유수프 우마루/Youssouf Oumarou,압둘 무무니/Abdoul Moumouni,자카리야 수마나/Zakariya Soumana',
    '다니엘 소사/Daniel Sosah,빅토리엔 아데바요르/Victorien Adebayor,아마두 사보/Amadou Sabo,*무사 마주/Moussa Maazou,이브라힘 지브릴라/Ibrahim Djibrilla,부바카르 구마코예/Boubacar Goumey',
  ]),
  team('리비아', 'Libya', 'LBY', 'ly', 112, 'Tripoli International Stadium', 'Aliou Cisse', '세네갈', ['#e70013', '#000000', '#239e46'], [
    '무라드 알우헤시/Murad Al Wuheeshi,무하마드 나시프/Muhammad Nashnoush',
    '알리 살라마/Ali Salama,산드 알워팔리/Sanad Al Warfali,아흐메드 알트르비/Ahmed Al Trbi,무아야드 알라피/Muayid Al Lafi,무하마드 알무나이르/Mohamed El Monir,파델 살라마/Fadel Salama',
    '파이살 알바드리/Faisal Al Badri,함두 엘후니/Hamdou Elhouni,무아야드 알라피/Muayid Al Lafi,오사마 알샤레미/Osama Al Shremi,노르딘 알쿠자/Noureddine El Kouja,압둘라 다그우/Abdallah Dagou',
    '아흐메드 크라와/Ahmed Kraouaa,아니스 살투/Anis Saltou,모하메드 살투/Mohamed Salto,*무아야드 알라피/Muayid Al Lafi,모하메드 알타발/Mohamed Al Tubal,살렘 알마스라티/Salem Al Masrati',
  ]),
  team('케냐', 'Kenya', 'KEN', 'ke', 109, 'Moi International Sports Centre', 'Benni McCarthy', '남아프리카공화국', ['#bb0000', '#ffffff', '#006600'], [
    '이언 오티에노/Ian Otieno,브라이언 오디암보/Bryne Odhiambo',
    '에릭 오우마/Eric Ouma,조셉 오쿠무/Joseph Okumu,존스톤 오몬디/Johnstone Omurwa,다니엘 아뇀베/Daniel Anyembe,아모스 응안가/Amos Nondi,압둘 오마르/Abud Omar',
    '리처드 오디아다/Richard Odada,앤서니 아쿠무/Anthony Akumu,케네스 무기암비/Kenneth Mugambi,티모시 오우마/Timothy Ouma,듀크 아부야/Duke Abuya,오스틴 오디암보/Austin Odhiambo',
    '마스우드 주마/Masoud Juma,마이클 올룽가/Michael Olunga,조나 아융가/Jonah Ayunga,*마이클 올룽가/Michael Olunga,에릭 조하나/Eric Johana,벤슨 오말라/Benson Omala',
  ]),
  team('탄자니아', 'Tanzania', 'TAN', 'tz', 107, 'Benjamin Mkapa Stadium', 'Miguel Gamondi', '아르헨티나', ['#1eb53a', '#00a3dd', '#fcd116'], [
    '아이시 마눌라/Aishi Manula,콰라 샤반/Kwara Shaban',
    '샤리프 무사/Shardrack Boka,박크리 음와민예토/Bakari Mwamnyeto,이브라힘 하마드/Ibrahim Hamad,딕슨 조부/Dickson Job,모하메드 후세인/Mohamed Hussein,하지 음노가/Haji Mnoga',
    '히미드 마오/Himid Mao,무다티리 야흐야/Mudathir Yahya,파이살 살룸/Feisal Salum,모리슨 아브라함/Morice Abraham,살룸 아부바카르/Salum Abubakar,사이먼 음수바/Simon Msuva',
    '음브와나 사마타/Mbwana Samatta,클레망 음좀베/Clément Mzize,찰스 음몸브와/Charles M Mombwa,*음브와나 사마타/Mbwana Samatta,노바투스 미로시/Novatus Miroshi,압달라 음콘다/Abdallah Mkonge',
  ]),
  team('수단', 'Sudan', 'SDN', 'sd', 113, 'Khartoum Stadium', 'Kwesi Appiah', '가나', ['#d21034', '#ffffff', '#000000'], [
    '모하메드 무스타파/Mohamed Mustafa,알리 아부에샤린/Ali Abu Eshrein',
    '라마단 아잡/Ramadan Agab,무스타파 카르쇼움/Mustafa Karshoum,아미르 카말/Amir Kamal,왈리드 하산/Walid Hassan,바키트 카미스/Bakhit Khamis,아흐메드 압델라흐만/Ahmed Abdelrahman',
    '아부아글라 압달라/Abuaagla Abdalla,살라딘 아딜/Salah Adil,모하메드 알라시드/Mohamed Al Rashed,왈라엘딘 무사/Walaa Eldin Musa,야신 하메드/Yasin Hamed,모하메드 압델라흐만/Mohamed Abdelrahman',
    '야시르 무잠밀/Yasir Mozamil,모하메드 에이사/Mohamed Eisa,사이프 테리/Seif Teiri,*라마단 아잡/Ramadan Agab,압델라지그 오메르/Abdelrazig Omer,아부바크르 이사/Abobaker Eisa',
  ]),
  team('르완다', 'Rwanda', 'RWA', 'rw', 126, 'Amahoro Stadium', 'Adel Amrouche', '알제리', ['#00a1de', '#fad201', '#20603d'], [
    '피아크르 은트와리/Fiacre Ntwari,클레망 은타랑고라/Clement Ntarangora',
    '피투아즈 은시미이마나/Fitina Omborenga,앙제 무치늬지/Ange Mutsinzi,티에리 만지/Thierry Manzi,에마뉘엘 이마니시므웨/Emmanuel Imanishimwe,클로드 은티람페바/Claude Niyomugabo,하킴 사히보/Hakim Sahabo',
    '지브릴 무기샤/Djibril Mugisha,케빈 무히레/Kevin Muhire,지하드 비즈마나/Djihad Bizimana,올리비에 니욘지마/Olivier Niyonzima,조세프 무구안자/Joseph Mugwanya,보니 무게샤/Bonheur Mugisha',
    '메디 카굴레/Medie Kagere,이노센트 은쇼티/Inncent Nshuti,길버트 무게샤/Gilbert Mugisha,*하루나 니욘지마/Haruna Niyonzima,라파엘 요크/Rafael York,마마두 시디베/Mamadou Sy',
  ]),
  team('토고', 'Togo', 'TOG', 'tg', 123, 'Stade de Kegue', 'Dare Nibombe', '토고', ['#ffce00', '#006a4e', '#d21034'], [
    '말콤 바르콜라/Malcolm Barcola,와리스 압둘라예/Waris Abdoulaye',
    '클로제이 도니/Klousseh Agbozo,자멜 아쿠/Jamal Akakpo,케네디 보아텡/Kennedy Boateng,칼리드 나레/Khaled Narey,마르완 이파/Mawouna Amevor,요한 로슈/Yohan Roche',
    '알라샤나 무스타파/Alaixys Romao,로제 아홀루/Roger Aholou,카림 더무아/Karim Dermane,삼손디나 오루/Samsondin Ouro,프랑크 아치암퐁/Franco Atchou,고디네 오아/Etienne Amenyido',
    '케빈 데닝키/Kevin Denkey,라바 코조/Laba Kodjo,테보호 모코에나/Thibault Klidje,*플로이드 아예테/Floyd Ayite,이흘라스 베부/Ihlas Bebou,에비앙 아게이/Evra Agbagno',
  ]),
  team('나미비아', 'Namibia', 'NAM', 'na', 117, 'Independence Stadium Windhoek', 'Collin Benjamin', '나미비아', ['#003580', '#ffffff', '#d21034'], [
    '로이드 카자푸아/Lloyd Kazapua,에드워드 마오바/Edward Maova',
    '라이언 냠베/Ryan Nyambe,케네디 아므테냐/Kennedy Amutenya,루발로 하우콘고/Lubeni Haukongo,아프로시우스 페트루스/Aprocius Petrus,라이언 한남/Charles Hambira,이반 캄베리파/Ivan Kamberipa',
    '페트루스 시템비/Petrus Shitembi,데온 호토/Deon Hotto,마르셀 파파마/Marcel Papama,베튤 무제우/Betuel Muzeu,프린스 티지자/Prins Tjiueza,앤더슨 페트루스/Approcius Petrus',
    '피터 샬룰릴레/Peter Shalulile,엘모 캄빈두/Elmo Kambindu,벤슨 실롱고/Benson Shilongo,*피터 샬룰릴레/Peter Shalulile,조시아 카메투카/Joslin Kamatuka,웬들 루다트/Wendell Rudath',
  ]),
  team('기니비사우', 'Guinea-Bissau', 'GNB', 'gw', 128, 'Estadio 24 de Setembro', 'Luis Boa Morte', '포르투갈', ['#ce1126', '#fcd116', '#009e49'], [
    '오파 상간테/Opa Sangante,조나스 멘데스/Jonas Mendes',
    '파누치 카마라/Fali Cande,마르셀루 잘로/Marcelo Djalo,제페르송 엔카다/Jefferson Encada,누라니오 포르투나/Nanu,파리 망디/Fali Cande,하우벤 리마/Ruben Lima',
    '알파 세메두/Alfa Semedo,모레투 카사마/Moreto Cassama,자니우 비켈/Janio Bikel,마마 발데/Mama Balde,마우로 호드리게스/Mauro Rodrigues,달시우 고메스/Dalcio Gomes',
    '우마로 발데/Umaro Balde,지뉴 가노/Zinho Gano,프란쿨리누 주/Franculino Dju,*피케티/Piqueti,조르지뉴/Jorginho,카를루스 마네/Carlos Mane',
  ]),
];
