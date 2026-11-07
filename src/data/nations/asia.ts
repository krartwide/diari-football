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
    confederation: 'AFC',
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

export const asiaTeams = [
  team('일본', 'Japan', 'JPN', 'jp', 15, 'Saitama Stadium 2002', 'Hajime Moriyasu', '일본', ['#0000ad', '#ffffff', '#e60012'], [
    '스즈키 자이온/Zion Suzuki,오사코 게이스케/Keisuke Osako',
    '스가와라 유키나리/Yukinari Sugawara,이타쿠라 고/Ko Itakura,도미야스 다케히로/Takehiro Tomiyasu,마치다 고키/Koki Machida,이토 히로키/Hiroki Ito,나가토모 유토/Yuto Nagatomo',
    '*엔도 와타루/Wataru Endo,모리타 히데마사/Hidemasa Morita,다나카 아오/Ao Tanaka,가마다 다이치/Daichi Kamada,하타테 레오/Reo Hatate,미나미노 다쿠미/Takumi Minamino',
    '이토 준야/Junya Ito,우에다 아야세/Ayase Ueda,오가와 고키/Koki Ogawa,미토마 가오루/Kaoru Mitoma,구보 다케후사/Takefusa Kubo,도안 리쓰/Ritsu Doan',
  ]),
  team('이란', 'Iran', 'IRN', 'ir', 20, 'Azadi Stadium', 'Amir Ghalenoei', '이란', ['#ffffff', '#da0000', '#239f40'], [
    '알리레자 베이란반드/Alireza Beiranvand,호세인 호세이니/Hossein Hosseini',
    '라민 레자에이안/Ramin Rezaeian,쇼자 칼릴자데/Shoja Khalilzadeh,모르테자 푸랄리간지/Morteza Pouraliganji,마지드 호세이니/Majid Hosseini,밀라드 모함마디/Milad Mohammadi,아볼파즐 잘랄리/Abolfazl Jalali',
    '사에이드 에자톨라히/Saeid Ezatolahi,사만 고도스/Saman Ghoddos,메흐디 토라비/Mehdi Torabi,알리 골리자데/Ali Gholizadeh,모하마드 모헤비/Mohammad Mohebi,알리레자 자한바흐시/Alireza Jahanbakhsh',
    '메흐디 가예디/Mehdi Ghayedi,*메흐디 타레미/Mehdi Taremi,사르다르 아즈문/Sardar Azmoun,마흐디 하셈네자드/Mehdi Hashemnejad,알라햐르 사야드마네시/Allahyar Sayyadmanesh,레자 아사디/Reza Asadi',
  ]),
  team('호주', 'Australia', 'AUS', 'au', 26, 'Stadium Australia', 'Tony Popovic', '호주', ['#ffcd00', '#00843d', '#ffffff'], [
    '매슈 라이언/Mathew Ryan,조 가우치/Joe Gauci',
    '루이스 밀러/Lewis Miller,해리 수타/Harry Souttar,카이 롤스/Kye Rowles,캐머런 버지스/Cameron Burgess,아지즈 베히치/Aziz Behich,조던 보스/Jordan Bos',
    '잭슨 어바인/Jackson Irvine,에이든 오닐/Aiden O Neill,코너 멧캐프/Connor Metcalfe,라일리 맥그리/Riley McGree,키아누 배커스/Keanu Baccus,제이크 브리머/Jake Brimmer',
    '크레이그 굿윈/Craig Goodwin,미첼 듀크/Mitchell Duke,니시 벨루필레이/Nishan Velupillay,*마틴 보일/Martin Boyle,쿠시니 옌기/Kusini Yengi,샘 실베라/Sam Silvera',
  ]),
  team('대한민국', 'South Korea', 'KOR', 'kr', 23, '서울월드컵경기장', '홍명보', '대한민국', ['#e6002d', '#ffffff', '#111e6c'], [
    '조현우/Jo Hyeon-woo,김승규/Kim Seung-gyu',
    '설영우/Seol Young-woo,김민재/Kim Min-jae,조유민/Cho Yu-min,권경원/Kwon Kyung-won,이명재/Lee Myung-jae,김진수/Kim Jin-su',
    '박용우/Park Yong-woo,황인범/Hwang In-beom,이재성/Lee Jae-sung,이강인/Lee Kang-in,배준호/Bae Jun-ho,홍현석/Hong Hyun-seok',
    '황희찬/Hwang Hee-chan,오현규/Oh Hyeon-gyu,조규성/Cho Gue-sung,*손흥민/Son Heung-min,엄지성/Eom Ji-sung,양현준/Yang Hyun-jun',
  ]),
  team('사우디아라비아', 'Saudi Arabia', 'KSA', 'sa', 56, 'King Fahd International Stadium', 'Herve Renard', '프랑스', ['#006c35', '#ffffff', '#d4af37'], [
    '모하메드 알오와이스/Mohammed Al Owais,아흐메드 알카사르/Ahmed Al Kassar',
    '사우드 압둘하미드/Saud Abdulhamid,알리 알불라이히/Ali Al Bulayhi,하산 탐박티/Hassan Tambakti,압둘라 알암리/Abdulelah Al Amri,야세르 알샤흐라니/Yasser Al Shahrani,무타브 알하르비/Muteb Al Harbi',
    '모하메드 칸노/Mohamed Kanno,압둘라 알말키/Abdulelah Al Malki,나세르 알다우사리/Nasser Al Dawsari,살렘 알다우사리/Salem Al Dawsari,파이살 알감디/Faisal Al Ghamdi,무사브 알주와이르/Musab Al Juwayr',
    '압둘라흐만 가리브/Abdulrahman Ghareeb,피라스 알부라이칸/Firas Al Buraikan,살레 알셰흐리/Saleh Al Shehri,*살렘 알다우사리/Salem Al Dawsari,아이만 야히야/Ayman Yahya,마르완 알사하피/Marwan Al Sahafi',
  ]),
  team('우즈베키스탄', 'Uzbekistan', 'UZB', 'uz', 55, 'Bunyodkor Stadium', 'Fabio Cannavaro', '이탈리아', ['#ffffff', '#0099b5', '#1eb53a'], [
    '우트키르 유수포프/Utkir Yusupov,아브두보히드 네마토프/Abduvohid Nematov',
    '후스니딘 알리쿨로프/Khusniddin Alikulov,압두코디르 후사노프/Abdukodir Khusanov,루스탐 아슈르마토프/Rustam Ashurmatov,우마르 에슈무로도프/Umar Eshmurodov,파루흐 사이피예프/Farrukh Sayfiyev,셰르조드 나스룰라예프/Sherzod Nasrullaev',
    '오딜존 함로베코프/Odiljon Hamrobekov,오타벡 슈쿠로프/Otabek Shukurov,잘롤리딘 마샤리포프/Jaloliddin Masharipov,아지즈벡 투르군보예프/Azizbek Turgunboev,압보스벡 파이줄라예프/Abbosbek Fayzullaev,디요르 홀마토프/Diyor Kholmatov',
    '호지마트 에르키노프/Khojimat Erkinov,*엘도르 쇼무로도프/Eldor Shomurodov,이고르 세르게예프/Igor Sergeev,오스톤 우루노프/Oston Urunov,셰르조드 에사노프/Sherzod Esanov,자보히르 시디코프/Javokhir Sidikov',
  ]),
  team('카타르', 'Qatar', 'QAT', 'qa', 53, 'Lusail Stadium', 'Julen Lopetegui', '스페인', ['#8a1538', '#ffffff', '#d4af37'], [
    '메샬 바르샴/Meshaal Barsham,사드 알시브/Saad Al Sheeb',
    '페드루 미겔/Pedro Miguel,부알렘 쿠키/Boualem Khoukhi,타렉 살만/Tarek Salman,루카스 멘데스/Lucas Mendes,호맘 아흐메드/Homam Ahmed,술탄 알브레이크/Sultan Al Brake',
    '아심 마디보/Assim Madibo,카림 부디아프/Karim Boudiaf,압둘라 알아흐락/Abdullah Al Ahrak,아흐메드 파티/Ahmed Fathy,무스타파 메샬/Mostafa Meshaal,알리 아사달라/Ali Asadalla',
    '유수프 압두리사그/Yusuf Abdurisag,알모에즈 알리/Almoez Ali,모하메드 문타리/Mohammed Muntari,*아크람 아피프/Akram Afif,에드밀송 주니오르/Edmilson Junior,아흐메드 알라위/Ahmed Al Rawi',
  ]),
  team('이라크', 'Iraq', 'IRQ', 'iq', 58, 'Basra International Stadium', 'Graham Arnold', '호주', ['#017b3d', '#ffffff', '#ce1126'], [
    '잘랄 하산/Jalal Hassan,아흐메드 바실/Ahmed Basil',
    '후세인 알리/Hussein Ali,레빈 술라카/Rebin Sulaka,사드 나티크/Saad Natiq,지드 타흐신/Zaid Tahseen,메르차스 도스키/Merchas Doski,아흐메드 야히야/Ahmed Yahya',
    '아미르 알암마리/Amir Al Ammari,오사마 라시드/Osama Rashid,지단 이크발/Zidane Iqbal,이브라힘 바예시/Ibrahim Bayesh,알리 자심/Ali Jasim,유세프 아민/Youssef Amyn',
    '바샤르 레산/Bashar Resan,아이멘 후세인/Aymen Hussein,모하나드 알리/Mohanad Ali,*알리 아드난/Ali Adnan,다닐로 알사에드/Danilo Al Saed,후세인 알리/Hussein Ali',
  ]),
  team('아랍에미리트', 'United Arab Emirates', 'UAE', 'ae', 65, 'Zayed Sports City Stadium', 'Cosmin Olaroiu', '루마니아', ['#ffffff', '#ff0000', '#00732f'], [
    '칼리드 에이사/Khalid Eisa,알리 카시프/Ali Khaseif',
    '칼리파 알함마디/Khalifa Al Hammadi,알리 살민/Ali Salmeen,쿠아메 오통/Kouame Autonne,마르쿠스 멜로니/Marcus Meloni,압둘라 이드리스/Abdulla Idrees,자예드 술탄/Zayed Sultan',
    '야히아 나데르/Yahia Nader,마지드 하산/Majid Hassan,압달라 라마단/Abdalla Ramadan,파비우 리마/Fabio Lima,타흐눈 알자비/Tahnoun Al Zaabi,마켄지 헌트/Mackenzie Hunt',
    '카이우 카네두/Caio Canedo,술탄 아딜/Sultan Adil,알리 맙쿠트/Ali Mabkhout,*파비우 리마/Fabio Lima,하리브 압달라/Harib Abdalla,야히아 알가사니/Yahya Al Ghassani',
  ]),
  team('요르단', 'Jordan', 'JOR', 'jo', 64, 'Amman International Stadium', 'Jamal Sellami', '모로코', ['#ffffff', '#000000', '#ce1126'], [
    '야지드 아부 라일라/Yazeed Abulaila,압달라 알파쿠리/Abdallah Al Fakhouri',
    '에흐산 하다드/Ehsan Haddad,야잔 알아랍/Yazan Al Arab,압달라 나십/Abdallah Nasib,바라 마리/Bara Marei,모하마드 아부 하셰시/Mohammad Abu Hasheesh,살렘 알아잘린/Salem Al Ajalin',
    '니자르 알라슈단/Nizar Al Rashdan,누르 알라와브데h/Noor Al Rawabdeh,마흐무드 알마르디/Mahmoud Al Mardi,라자이 아예드/Rajaei Ayed,이브라힘 사데/Ibrahim Sadeh,아레프 알하지/Aref Al Haj',
    '무사 알타마리/Mousa Al Tamari,야잔 알나이마트/Yazan Al Naimat,알리 올완/Ali Olwan,*에흐산 하다드/Ehsan Haddad,모하마드 아부 주라이크/Mohammad Abu Zrayq,오다이 올완/Oday Olwan',
  ]),
  team('오만', 'Oman', 'OMA', 'om', 78, 'Sultan Qaboos Sports Complex', 'Carlos Queiroz', '포르투갈', ['#ffffff', '#db161b', '#008000'], [
    '이브라힘 알무카이니/Ibrahim Al Mukhaini,파이즈 알루샤이디/Faiyz Al Rusheidi',
    '아흐메드 알카미시/Ahmed Al Khamisi,칼리드 알브라이키/Khalid Al Braiki,모하메드 알무살라미/Mohammed Al Musalami,아르샤드 알아라위/Arshad Al Alawi,알리 알부사이디/Ali Al Busaidi,아흐메드 알카비/Ahmed Al Kabi',
    '하립 알사디/Harib Al Saadi,자밀 알야흐마디/Jameel Al Yahmadi,압둘라 파와즈/Abdullah Fawaz,살라 알야흐야이/Salah Al Yahyaei,아흐메드 알카미시/Ahmed Al Khamisi,오마르 알말키/Omar Al Malki',
    '아르샤드 알아라미/Arshad Al Alawi,이삼 알사브히/Issam Al Sabhi,무센 알가사니/Muhsen Al Ghassani,*하립 알사디/Harib Al Saadi,압둘라 알무샤이프리/Abdulrahman Al Mushaifri,자히르 알아그바리/Zahir Al Aghbari',
  ]),
  team('시리아', 'Syria', 'SYR', 'sy', 95, 'Abbasiyyin Stadium', 'Jose Lana', '스페인', ['#ce1126', '#ffffff', '#000000'], [
    '에스테반 글레예/Esteban Glellel,아흐마드 마다니에/Ahmad Madanieh',
    '압둘 라흐만 와이스/Abdul Rahman Oues,타에르 크루마/Thaer Krouma,아므르 미다니/Amro Jenyat,아이함 오우수/Aiham Ousou,모아이아드 아잔/Mouaiad Al Ajaan,칼레드 쿠르다글리/Khaled Kerdagli',
    '모하마드 오스만/Mohammed Osman,에세키엘 함/Ezequiel Ham,마흐무드 알아스와드/Mahmoud Al Aswad,파블로 사바그/Pablo Sabbag,모하마드 알할락/Mohammad Al Hallak,노아 샤문/Noah Shamoun',
    '마흐무드 알마와스/Mahmoud Al Mawas,오마르 알소마/Omar Al Somah,오마르 크리빈/Omar Khribin,*모하마드 오스만/Mohammed Osman,토비아스 시베라/Tobias Cervera,안토니오 야쿠브/Antonio Yakoub',
  ]),
  team('팔레스타인', 'Palestine', 'PLE', 'ps', 101, 'Faisal Al Husseini Stadium', 'Ihab Abu Jazar', '팔레스타인', ['#ce1126', '#ffffff', '#007a3d'], [
    '라미 하마데/Rami Hamadeh,바라 하룬/Baraa Kharoub',
    '무사브 알바타트/Musab Al Battat,모하메드 살레/Mohammed Saleh,야세르 하메드/Yaser Hamed,미켈 테르마니니/Michel Termanini,카밀 세이아디/Kamil Seyadi,모하메드 칼릴/Mohammed Khalil',
    '오다이 카루브/Oday Kharoub,아타 자베르/Attaa Jaber,사메르 존디/Samer Jondi,마흐무드 아부 와르다/Mahmoud Abu Warda,모하메드 라시드/Mohammed Rashid,아미드 마하즈나/Amid Mahajna',
    '타메르 세얌/Tamer Seyam,오다이 다바그/Oday Dabbagh,자이드 쿤바르/Zaid Qunbar,*무사브 알바타트/Musab Al Battat,위삼 아부 알리/Wessam Abou Ali,알라 알딘 하산/Alaa Al Din Hassan',
  ]),
  team('태국', 'Thailand', 'THA', 'th', 96, 'Rajamangala National Stadium', 'Anthony Hudson', '잉글랜드', ['#1d2b64', '#ffffff', '#a51931'], [
    '파티왓 캄마이/Patiwat Khammai,캄폰 파톰마카쿨/Kampol Pathomakkakul',
    '니콜라스 미켈손/Nicholas Mickelson,엘리아스 돌라/Elias Dolah,판사 헴비분/Pansa Hemviboon,수판 통송/Suphan Thongsong,테라톤 분마탄/Theerathon Bunmathan,사살락 하이쁘라콘/Sasalak Haiprakhon',
    '사라치 유옌/Sarach Yooyen,피라돌 참라사미/Peeradol Chamrasamee,위라텝 폼판/Weerathep Pomphan,차나팁 송크라신/Chanathip Songkrasin,수파촉 사라차트/Supachok Sarachat,에카닛 파냐/Ekanit Panya',
    '차오와트 위라차트/Chaowat Veerachat,수파차이 차이뎃/Supachai Chaided,티라실 당다/Teerasil Dangda,*테라톤 분마탄/Theerathon Bunmathan,포라멧 아르즈비라이/Poramet Arjvirai,벤 데이비스/Ben Davis',
  ]),
  team('중국', 'China PR', 'CHN', 'cn', 94, 'Workers Stadium', 'Shao Jiayi', '중국', ['#de2910', '#ffffff', '#ffde00'], [
    '왕다레이/Wang Dalei,옌쥔링/Yan Junling',
    '가오준이/Gao Zhunyi,장광타이/Jiang Guangtai,주천제/Zhu Chenjie,장성룽/Jiang Shenglong,류양/Liu Yang,리레이/Li Lei',
    '왕상위안/Wang Shangyuan,쉬하오양/Xu Haoyang,웨이시하오/Wei Shihao,셰원넝/Xie Wenneng,린량밍/Lin Liangming,황정위/Huang Zhengyu',
    '페르난지뉴/Fernandinho,장위닝/Zhang Yuning,바이허라무 압두와이리/Behram Abduweli,*우레이/Wu Lei,아란/Alan,타오창룽/Tao Qianglong',
  ]),
  team('바레인', 'Bahrain', 'BHR', 'bh', 81, 'Bahrain National Stadium', 'Dragan Talajic', '크로아티아', ['#ce1126', '#ffffff', '#8a1538'], [
    '에브라힘 루트팔라/Ebrahim Lutfalla,사예드 모하메드 자페르/Sayed Mohamed Jaffer',
    '하마드 샴산/Hamad Shamsan,왈리드 알하얌/Waleed Al Hayam,아민 베나디/Amin Benaddi,빈센트 에마뉘엘/Vincent Emmanuel,하자 알리/Hazza Ali,압둘라 알칼라시/Abdulla Al Khalasi',
    '모하메드 마르훈/Mohamed Marhoon,알리 마단/Ali Madan,카밀 알아스와드/Kamil Al Aswad,모세스 아테데/Moses Atede,자심 알샤이크/Jasim Al Shaikh,마흐디 후마이단/Mahdi Humaidan',
    '모하메드 알루마이히/Mohamed Al Romaihi,압둘라 유수프/Abdulla Yusuf Helal,이스마일 압둘라티프/Ismail Abdullatif,*사예드 디야 사이드/Sayed Dhiya Saeed,마흐디 압둘자바르/Mahdi Abduljabbar,알리 하산 이사/Ali Hassan Isa',
  ]),
  team('베트남', 'Vietnam', 'VIE', 'vn', 114, 'My Dinh National Stadium', '김상식', '대한민국', ['#da251d', '#ffff00', '#ffffff'], [
    '응우옌 딘 찌에우/Nguyen Dinh Trieu,당 반 럼/Dang Van Lam',
    '호 떤 따이/Ho Tan Tai,부이 띠엔 중/Bui Tien Dung,응우옌 타인 빈/Nguyen Thanh Binh,도 주이 마인/Do Duy Manh,도안 반 허우/Doan Van Hau,판 뚜언 따이/Phan Tuan Tai',
    '응우옌 호앙 득/Nguyen Hoang Duc,도 훙 중/Do Hung Dung,응우옌 꽝 하이/Nguyen Quang Hai,응우옌 타이 선/Nguyen Thai Son,쩌우 응옥 꽝/Chau Ngoc Quang,응우옌 하이 롱/Nguyen Hai Long',
    '응우옌 반 또안/Nguyen Van Toan,응우옌 띠엔 린/Nguyen Tien Linh,팜 뚜언 하이/Pham Tuan Hai,*도 주이 마인/Do Duy Manh,응우옌 쑤언 선/Nguyen Xuan Son,부 반 타인/Vu Van Thanh',
  ]),
  team('타지키스탄', 'Tajikistan', 'TJK', 'tj', 104, 'Pamir Stadium', 'Gela Shekiladze', '조지아', ['#cc0000', '#ffffff', '#006600'], [
    '루스탐 야티모프/Rustam Yatimov,무흐리딘 하사노프/Mukhriddin Khasanov',
    '마누체흐르 사파로프/Manuchekhr Safarov,조이르 주라보예프/Zoir Dzhuraboev,바흐다트 하노노프/Vahdat Hanonov,아흐탐 나자로프/Akhtam Nazarov,타브레즈 이슬로모프/Tabrez Islomov,달레르 이모므나자로프/Daler Imomnazarov',
    '에흐손 판샨베/Ehson Panjshanbe,알리셰르 잘릴로프/Alisher Dzhalilov,파르비존 우마르보예프/Parvizdzhon Umarbaev,루슬란 하일로예프/Ruslan Khailoev,아미르벡 주라보예프/Amirbek Dzhuraboev,무함마존 라히모프/Muhammadzhon Rakhimov',
    '샤롬 사미예프/Shahrom Samiev,마누체흐르 잘릴로프/Manuchekhr Dzhalilov,루스탐 소이로프/Rustam Soirov,*에흐손 판샨베/Ehson Panjshanbe,알리셰르 슈쿠로프/Alisher Shukurov,누리딘 함로쿨로프/Nuriddin Khamrokulov',
  ]),
  team('키르기스스탄', 'Kyrgyzstan', 'KGZ', 'kg', 103, 'Dolen Omurzakov Stadium', 'Robert Prosinecki', '크로아티아', ['#e8112d', '#ffffff', '#ffef00'], [
    '에르잔 토코타예프/Erzhan Tokotaev,쿠르만벡 누를란베코프/Kurmanbek Nurlanbekov',
    '카이라트 지르갈벡 울루/Kayrat Zhyrgalbek Uulu,타미를란 코주바예프/Tamyrlan Kozubaev,발레리 키친/Valery Kichin,아이자르 아크마토프/Aizar Akmatov,벡잔 사긴바예프/Bekzhan Sagynbaev,알렉산드르 미슈첸코/Aleksandr Mishchenko',
    '오딜존 압두라흐마노프/Odilzhon Abdurakhmanov,굴지기트 알리쿨로프/Gulzhigit Alykulov,파르하트 무사베코프/Farkhat Musabekov,카이 메르크/Kai Merk,아딜 카디르자노프/Adil Kadyrzhanov,아타이 주마셰프/Atay Dzhumashev',
    '조엘 코조/Joel Kojo,비탈리 룩스/Vitalij Lux,에르니스트 바티르카노프/Ernist Batyrkanov,*발레리 키친/Valery Kichin,엘디야르 자리프베코프/Eldiyar Zarypbekov,알리마르돈 슈쿠로프/Alimardon Shukurov',
  ]),
  team('레바논', 'Lebanon', 'LBN', 'lb', 112, 'Camille Chamoun Sports City Stadium', 'Miodrag Radulovic', '몬테네그로', ['#ed1c24', '#ffffff', '#00a651'], [
    '메흐디 칼릴/Mehdi Khalil,모스타파 마타르/Mostafa Matar',
    '후세인 제인/Hussein Zein,로베르트 멜키/Robert Melki,조안 오우마리/Joan Oumari,카셈 알제인/Kassem El Zein,누르 만수르/Nour Mansour,하산 사드/Hassan Saad',
    '바셀 즈라디/Bassel Jradi,하산 마툭/Hassan Maatouk,왈리드 쇼우르/Walid Shour,모하마드 하이다르/Mohamad Haidar,알리 트네이시/Ali Tneich,나데르 마타르/Nader Matar',
    '라비 아타야/Rabih Ataya,힐랄 엘헬웨/Hilal El Helwe,오마르 부기엘/Omar Bugiel,*하산 마툭/Hassan Maatouk,다니엘 라후드/Daniel Lajud,카림 다르위시/Karim Darwiche',
  ]),
  team('인도네시아', 'Indonesia', 'IDN', 'id', 127, 'Gelora Bung Karno Stadium', 'John Herdman', '잉글랜드', ['#e70011', '#ffffff', '#00529c'], [
    '마르턴 파스/Maarten Paes,에밀 아우데로/Emil Audero',
    '케빈 딕스/Kevin Diks,제이 이즈스/Jay Idzes,메이스 힐허르스/Mees Hilgers,저스틴 허브너/Justin Hubner,칼빈 베르동크/Calvin Verdonk,셰인 파티나마/Shayne Pattynama',
    '톰 하예/Thom Haye,조이 펠루페시/Joe Pelupessy,이바르 예너/Ivar Jenner,리키 캄부아야/Ricky Kambuaya,마르셀리노 페르디난/Marselino Ferdinan,네이선 트조어온/Nathan Tjoe-A-On',
    '야쿠프 사유리/Yakob Sayuri,올레 로메니/Ole Romeny,라파엘 스트라위크/Rafael Struick,*제이 이즈스/Jay Idzes,라그나르 오라트망운/Ragnar Oratmangoen,엘리아노 레인더르스/Eliano Reijnders',
  ]),
  team('카자흐스탄', 'Kazakhstan', 'KAZ', 'kz', 115, 'Astana Arena', 'Talgat Baysufinov', '카자흐스탄', ['#00afca', '#ffec2d', '#ffffff'], [
    '알렉산드르 자루츠키/Aleksandr Zarutskiy,이고르 샤츠키/Igor Shatskiy',
    '마랏 비스트로프/Marat Bystrov,누랄리 알립/Nuraly Alip,알렉산드르 마로치킨/Aleksandr Marochkin,세르게이 말리/Sergey Maliy,얀 보로곱스키/Yan Vorogovskiy,티무르 도스마감베토프/Timur Dosmagambetov',
    '아스하트 타기베르겐/Askhat Tagybergen,이슬람 체슬로코프/Islam Chesnokov,라다트 압둘린/Ramazan Orazov,바흐티요르 자이누트디노프/Bakhtiyor Zaynutdinov,게오르기 주코프/Georgiy Zhukov,아빌라이한 주마베코프/Abilkhan Zhumabek',
    '막심 사모로도프/Maksim Samorodov,아바트 아임베토프/Abat Aimbetov,바우르잔 이슬람한/Bauyrzhan Islamkhan,*아스하트 타기베르겐/Askhat Tagybergen,엘한 아스타노프/Elkhan Astanov,오랄한 오미르타예프/Oralkhan Omirtayev',
  ]),
  team('북한', 'North Korea', 'PRK', 'kp', 118, 'Kim Il Sung Stadium', 'Sin Yong-nam', '북한', ['#ed1c27', '#ffffff', '#024fa2'], [
    '강주혁/Kang Ju-hyok,신혁/Sin Hyok',
    '최옥철/Choe Ok-chol,장국철/Jang Kuk-chol,김유성/Kim Yu-song,김범혁/Kim Pom-hyok,리일성/Ri Il-song,로학수/Ro Hak-su',
    '강국철/Kang Kuk-chol,리은철/Ri Un-chol,김국진/Kim Kuk-jin,백충성/Paek Chung-song,정일관/Jong Il-gwan,최주성/Choe Ju-song',
    '한광성/Han Kwang-song,김유성/Kim Yu-song,리조국/Ri Jo-guk,*정일관/Jong Il-gwan,김국범/Kim Kuk-bom,박광룡/Pak Kwang-ryong',
  ]),
];
