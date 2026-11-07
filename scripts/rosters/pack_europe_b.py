#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, "/workspace/scripts/rosters")
from packlib import p, mgr, tac, col, T, save

teams = []

teams.append(T("노르웨이","Norway","NOR","no","UEFA",29,col("#BA0C2F","#00205B","#FFFFFF"),"Ullevaal Stadion",
 mgr("스톨레 솔바켄","Ståle Solbakken","Norway","공격적","4-3-3",2020),tac("4-3-3","attacking",7,7,7,"mixed",6),[
  p("외르얀 나이란드","Ørjan Nyland",1,"GK",35,"Sevilla","solid"),p("에위리크 홀멘","Egil Selvik",12,"GK",28,"Haaland","fringe"),p("모르텐 사테르","Morten Sætra",23,"GK",28,"Rosenborg","fringe"),
  p("율리안 뤼에르손","Julian Ryerson",14,"RB",27,"Borussia Dortmund","solid"),p("마르кус 페데르센","Marcus Pedersen",2,"RB",25,"Torino","solid"),
  p("크리스토페르 아예르","Kristoffer Ajer",3,"CB",27,"Brentford","star"),p("안드레아스 헤게봄","Andreas Hanche-Olsen",4,"CB",28,"Mainz","solid"),p("레오 외스티고르","Leo Østigård",5,"CB",26,"Rennes","solid"),p("다비드 뫼르","David Møller Wolfe",17,"LB",23,"AZ","solid"),
  p("비르길 라센","Birger Meling",16,"LB",30,"København","solid"),
  p("마르틴 외데고르","Martin Ødegaard",10,"CAM",26,"Arsenal","star",True),p("산데르 베르게","Sander Berge",8,"CDM",27,"Fulham","solid"),p("모튼 토르스비","Morten Thorsby",6,"CM",29,"Genoa","solid"),p("페트릭 베리","Patrick Berg",15,"CDM",27,"Bodø/Glimt","solid"),
  p("안토니오 누사","Antonio Nusa",7,"LW",20,"RB Leipzig","star"),p("오스카 보브","Oscar Bobb",11,"RW",22,"Manchester City","solid"),p("아르만드 흐레크야","Arnór Ingvi Traustason",18,"CM",32,"IFK Norrköping","fringe"),
  p("엘링 홀란","Erling Haaland",9,"ST",25,"Manchester City","star"),p("알렉산데르 쇠를로트","Alexander Sørloth",19,"ST",29,"Atlético Madrid","star"),p("요르겐 스트란드 라르센","Jørgen Strand Larsen",23,"ST",25,"Wolverhampton","solid"),
  p("모하메드 엘윤시","Mohamed Elyounoussi",21,"LW",31,"København","solid"),p("크리스토페르 올센","Kristian Thorstvedt",22,"CM",26,"Sassuolo","solid"),p("펠릭스 혼 미를레","Felix Horn Myhre",13,"CM",26,"Brann","fringe"),
]))

teams.append(T("덴마크","Denmark","DEN","dk","UEFA",21,col("#C8102E","#FFFFFF","#C8102E"),"Parken Stadium",
 mgr("브라이언 리머","Brian Riemer","Denmark","균형","4-3-3",2024),tac("4-3-3","balanced",7,6,6,"short",6),[
  p("카스페르 슈마이켈","Kasper Schmeichel",1,"GK",38,"Anderlecht","star"),p("프레데리크 뢴노브","Frederik Rønnow",16,"GK",33,"Union Berlin","solid"),p("마즈 헤르만센","Mads Hermansen",22,"GK",25,"Leicester City","fringe"),
  p("요아킴 안데르센","Joachim Andersen",2,"CB",29,"Fulham","star"),p("안드레아스 크리스텐센","Andreas Christensen",4,"CB",29,"Barcelona","star"),p("빅토르 넬손","Victor Nelsson",3,"CB",26,"Galatasaray","solid"),p("야니크 베스테르고르","Jannik Vestergaard",5,"CB",33,"Leicester City","solid"),
  p("알렉산데르 바","Alexander Bah",18,"RB",27,"Benfica","solid"),p("라스무스 크리스티안센","Rasmus Kristensen",13,"RB",28,"Frankfurt","solid"),
  p("요아킴 멜레","Joakim Mæhle",17,"LB",28,"Wolfsburg","solid"),p("빅토르 크리스텐센","Victor Kristiansen",15,"LB",22,"Leicester City","solid"),
  p("피에르에밀 호이비에르","Pierre-Emile Højbjerg",6,"CDM",30,"Marseille","star"),p("크리스티안 에릭센","Christian Eriksen",10,"CM",33,"Manchester United","star",True),p("모르텐 힐드레고르","Morten Hjulmand",8,"CDM",26,"Sporting CP","star"),
  p("미켈 담스고르","Mikkel Damsgaard",11,"CAM",25,"Brentford","solid"),p("크리스티안 노르고르","Christian Nørgaard",16,"CDM",31,"Brentford","solid"),p("매티어스 엔젠","Mathias Jensen",7,"CM",29,"Brentford","solid"),
  p("안드레아스 스코우 올슨","Andreas Skov Olsen",19,"RW",25,"Club Brugge","solid"),p("미켈 요르겐센","Mikkel Duelund",21,"CAM",28,"Aalborg","fringe"),
  p("라스무스 호일룬","Rasmus Højlund",9,"ST",22,"Manchester United","star"),p("요나스 빈","Jonas Wind",23,"ST",26,"Wolfsburg","solid"),p("카스페르 돌베르그","Kasper Dolberg",12,"ST",28,"Anderlecht","solid"),p("유수프 포울센","Yussuf Poulsen",20,"ST",31,"RB Leipzig","solid"),
]))

teams.append(T("오스트리아","Austria","AUT","at","UEFA",24,col("#ED2939","#FFFFFF","#ED2939"),"Ernst-Happel-Stadion",
 mgr("랄프 랑닉","Ralf Rangnick","Germany","압박형","4-2-3-1",2022),tac("4-2-3-1","attacking",9,8,6,"mixed",8),[
  p("파트리크 펜츠","Patrick Pentz",1,"GK",28,"Brøndby","solid"),p("하인츠 린드너","Heinz Lindner",12,"GK",35,"Sion","fringe"),p("니클라스 헤들","Nikolas Hedl",13,"GK",24,"Rapid Wien","fringe"),
  p("슈테판 포슈","Stefan Posch",2,"RB",28,"Bologna","solid"),p("필립 리엔하르트","Philipp Lienhart",4,"CB",29,"Freiburg","solid"),p("다비드 알라바","David Alaba",8,"CB",33,"Real Madrid","star"),p("막시밀리안 벤더러","Maximilian Wöber",5,"CB",27,"Leeds United","solid"),
  p("케빈 단소","Kevin Danso",3,"CB",26,"Lens","star"),p("알렉산데르 프라슬","Alexander Prass",17,"LB",24,"Hoffenheim","solid"),p("필립 므웬스","Phillipp Mwene",16,"LB",31,"Mainz","solid"),
  p("니콜라스 자이발드","Nicolas Seiwald",6,"CDM",24,"RB Leipzig","star"),p("플로리안 그릴리치","Florian Grillitsch",10,"CM",29,"Hoffenheim","solid"),p("크리스토프 바움가르트너","Christoph Baumgartner",19,"CAM",26,"RB Leipzig","star"),
  p("콘라트 라이머","Konrad Laimer",14,"CM",28,"Bayern Munich","star"),p("마르셀 자비처","Marcel Sabitzer",9,"CM",31,"Borussia Dortmund","star",True),
  p("미하엘 그레고리치","Michael Gregoritsch",11,"ST",31,"Freiburg","solid"),p("마르코 아르나우토비치","Marko Arnautović",7,"ST",36,"Inter Milan","solid"),p("안드레아스 바이만","Andreas Weimann",21,"ST",34,"Bristol City","fringe"),
  p("파트릭 부슈바움","Patrick Wimmer",18,"RW",24,"Wolfsburg","solid"),p("로만 슈미트","Romano Schmid",20,"CAM",26,"Werder Bremen","solid"),p("율리안 바움가르트링거","Julian Baumgartlinger",15,"CDM",37,"retired/Austria","fringe"),
  p("마테오 야슈케","Matteo Jusić",22,"ST",22,"Sturm Graz","fringe"),p("알렉산더 슐라거","Alexander Schlager",23,"GK",29,"RB Salzburg","solid"),
]))

teams.append(T("튀르키예","Türkiye","TUR","tr","UEFA",25,col("#E30A17","#FFFFFF","#E30A17"),"Atatürk Olimpiyat",
 mgr("빈첸초 몬텔라","Vincenzo Montella","Italy","공격적","4-2-3-1",2023),tac("4-2-3-1","attacking",7,7,7,"mixed",6),[
  p("우구르잔 차키르","Uğurcan Çakır",1,"GK",29,"Trabzonspor","star"),p("메르탄 꽤르크","Mert Günok",12,"GK",36,"Beşiktaş","solid"),p("알툰 바이인데르","Altay Bayındır",23,"GK",27,"Manchester United","solid"),
  p("제키 첼리크","Zeki Çelik",2,"RB",28,"Roma","solid"),p("메르트 뮐덜","Mert Müldür",18,"RB",26,"Fenerbahçe","solid"),
  p("아브둘케림 바르닥치","Abdulkerim Bardakcı",4,"CB",31,"Galatasaray","solid"),p("사미르 우찬","Samet Akaydın",5,"CB",31,"Panathinaikos","solid"),p("잔 외즈칸","Çağlar Söyüncü",3,"CB",29,"Fenerbahçe","star"),p("외메르 바이람","Ozan Kabak",15,"CB",25,"Hoffenheim","solid"),
  p("페린 카디오글루","Ferdi Kadıoğlu",17,"LB",26,"Brighton","star"),p("에렌 엘말르","Eren Elmalı",16,"LB",25,"Galatasaray","solid"),
  p("하칸 찰하노글루","Hakan Çalhanoğlu",10,"CDM",31,"Inter Milan","star",True),p("이스마일 유크세크","İsmail Yüksek",8,"CDM",26,"Fenerbahçe","solid"),p("오르쿤 쾨크추","Orkun Kökçü",6,"CM",24,"Benfica","star"),
  p("아르다 귈레르","Arda Güler",7,"CAM",20,"Real Madrid","star"),p("케난 일드즈","Kenan Yıldız",11,"CAM",20,"Juventus","star"),p("이르판 카흐베치","İrfan Kahveci",19,"CM",30,"Fenerbahçe","solid"),
  p("바리스 일마즈","Barış Alper Yılmaz",21,"RW",25,"Galatasaray","solid"),p("케렘 악튀","Kerem Aktürkoğlu",9,"LW",26,"Benfica","star"),
  p("젠기즈 운데르","Cengiz Ünder",14,"RW",28,"Fenerbahçe","solid"),p("유수프 예니샤르","Yusuf Yazıcı",20,"CAM",28,"Lille","solid"),p("제키 암도니","Cenk Tosun",22,"ST",34,"Beşiktaş","fringe"),p("에네스 위날","Enes Ünal",13,"ST",28,"Bournemouth","solid"),
]))

teams.append(T("스웨덴","Sweden","SWE","se","UEFA",43,col("#FECC02","#006AA7","#FECC02"),"Friends Arena",
 mgr("그레이엄 포터","Graham Potter","England","점유율","4-3-3",2025),tac("4-3-3","balanced",6,6,6,"short",6),[
  p("로빈 올센","Robin Olsen",1,"GK",35,"Aston Villa","solid"),p("크리스토페르 노르드펠트","Kristoffer Nordfeldt",12,"GK",36,"AIK","fringe"),p("이사크 페테르손","Isak Pettersson",23,"GK",28,"Stabæk","fringe"),
  p("에밀 크라프트","Emil Krafth",2,"RB",31,"Newcastle United","solid"),p("빅토르 린델로프","Victor Lindelöf",3,"CB",31,"Manchester United","star",True),p("이스마엘 칼슨","Isak Hien",4,"CB",26,"Atalanta","solid"),p("카를 스타르크펠트","Carl Starfelt",5,"CB",30,"Celta","solid"),
  p("루드비그 아우구스틴손","Ludwig Augustinsson",6,"LB",31,"Anderlecht","solid"),p("가브리엘 구드문손","Gabriel Gudmundsson",17,"LB",26,"Lille","solid"),
  p("데얀 쿨루세프스키","Dejan Kulusevski",10,"RW",25,"Tottenham Hotspur","star"),p("안토니 일란드","Anthony Elanga",11,"LW",23,"Nottingham Forest","star"),p("빅토르 요만","Viktor Gyökeres",9,"ST",27,"Sporting CP","star"),
  p("마츠 셀스","Mattias Svanberg",8,"CM",26,"Wolfsburg","solid"),p("예스페르 칼스트룀","Jesper Karlström",16,"CDM",30,"Lech Poznań","solid"),p("휴고 라르손","Hugo Larsson",14,"CM",21,"Frankfurt","solid"),
  p("알렉산데르 이사크","Alexander Isak",19,"ST",26,"Newcastle United","star"),p("로빈 쿠아이손","Robin Quaison",20,"ST",31,"Al-Ettifaq","fringe"),
  p("예스페르 칼손","Jesper Karlsson",18,"LW",27,"Bologna","solid"),p("사무엘 구스타프손","Samuel Gustafson",7,"CM",30,"BK Häcken","solid"),
  p("필립 헬란데르","Filip Helander",15,"CB",32,"Omonia","fringe"),p("요엘 아스페르","Joel Asoro",21,"RW",26,"Djurgården","fringe"),p("세바스티안 난","Sebastian Nanasi",22,"LW",23,"Strasbourg","solid"),p("빅토르 클라에손","Viktor Claesson",13,"CAM",33,"København","solid"),
]))

teams.append(T("러시아","Russia","RUS","ru","UEFA",33,col("#FFFFFF","#0039A6","#D52B1E"),"Luzhniki Stadium",
 mgr("발레리 카르핀","Valeri Karpin","Russia","균형","4-3-3",2021),tac("4-3-3","balanced",6,6,6,"mixed",6),[
  p("마트베이 사포노프","Matvey Safonov",1,"GK",26,"Paris Saint-Germain","star"),p("안드레이 루뇨프","Andrey Lunyov",12,"GK",34,"Qarabağ","solid"),p("일리야 라니스트리","Ilya Lantratov",16,"GK",29,"Lokomotiv Moscow","fringe"),
  p("마리오 페르난데스","Mário Fernandes",2,"RB",34,"Zenit","fringe"),p("유리 지르코프","Yuri Zhirkov",18,"LB",41,"retired","fringe"),
  p("게오르기 지키야","Georgi Dzhikiya",5,"CB",31,"Lokomotiv Moscow","solid"),p("막심 오시펜코","Maxim Osipenko",3,"CB",31,"Rostov","solid"),p("알렉산드르 솔다텐코프","Aleksandr Soldatenkov",4,"CB",29,"Krylia","solid"),p("이고리 디베예프","Igor Diveyev",14,"CB",26,"CSKA Moscow","solid"),
  p("드미트리 바라노프","Daniil Krugovoy",17,"LB",27,"CSKA Moscow","solid"),p("비야체슬라프 카라바예프","Vyacheslav Karavayev",13,"RB",30,"Zenit","solid"),
  p("알렉세이 미란추크","Aleksei Miranchuk",10,"CAM",30,"Atlanta United","star"),p("다닐 폼","Daniil Fomin",8,"CDM",28,"Dynamo Moscow","solid"),p("안톤 미란추크","Anton Miranchuk",11,"CAM",30,"Torpedo","solid"),
  p("일리야트 아흐메토프","Ilzat Akhmetov",6,"CM",28,"Zenit","solid"),p("막심 글루셴코프","Maksim Glushenkov",7,"RW",26,"Zenit","star"),
  p("알렉산드르 골로빈","Aleksandr Golovin",17,"CAM",29,"Monaco","star",True),p("아르템 주바","Artem Dzyuba",9,"ST",37,"Akron","solid"),
  p("표도르 찰로프","Fyodor Chalov",19,"ST",27,"PAOK","solid"),p("이반 오브랴드킨","Ivan Oblyakov",20,"CM",26,"CSKA Moscow","solid"),p("니콜라이 콤리첸코","Nikolai Komlichenko",21,"ST",30,"Rostov","fringe"),
  p("안드레이 모스토보이","Andrey Mostovoy",22,"LW",27,"Zenit","solid"),p("세르게이 피냐예프","Sergey Pinyaev",23,"LW",20,"Lokomotiv Moscow","solid"),
]))

teams.append(T("우크라이나","Ukraine","UKR","ua","UEFA",28,col("#0057B7","#FFD700","#0057B7"),"Stadion Narodowy",
 mgr("세르히 레브로프","Serhiy Rebrov","Ukraine","균형","4-3-3",2023),tac("4-3-3","balanced",7,7,6,"short",6),[
  p("안드리 루닌","Andriy Lunin",1,"GK",26,"Real Madrid","star"),p("헤오르히 부슈찬","Heorhiy Bushchan",12,"GK",31,"Al-Shamal","solid"),p("아나톨리 트루빈","Anatoliy Trubin",23,"GK",24,"Benfica","star"),
  p("올렉산드르 팀치크","Oleksandr Tymchyk",2,"RB",28,"Dynamo Kyiv","solid"),p("유히 코노플리야","Yukhym Konoplya",13,"RB",26,"Shakhtar","solid"),
  p("일리야 자바르니","Illia Zabarnyi",4,"CB",23,"Bournemouth","star"),p("미콜라 마타비엔코","Mykola Matviyenko",5,"CB",29,"Shakhtar","solid"),p("발레리 본다르","Valeriy Bondar",3,"CB",26,"Shakhtar","solid"),
  p("비탈리 미콜렌코","Vitaliy Mykolenko",16,"LB",26,"Everton","star"),p("올렉산드르 시로타","Oleksandr Sirota",17,"CB",25,"Dynamo Kyiv","fringe"),
  p("올렉산드르 진첸코","Oleksandr Zinchenko",17,"LB",28,"Arsenal","star"),p("타라스 스테파넨코","Taras Stepanenko",6,"CDM",36,"Shakhtar","solid",True),
  p("미하일로 무드리크","Mykhailo Mudryk",10,"LW",24,"Chelsea","star"),p("루슬란 말리노프스키","Ruslan Malinovskyi",8,"CM",32,"Genk","solid"),p("헤오르히 수다코프","Heorhiy Sudakov",7,"CAM",23,"Shakhtar","star"),
  p("안드리 야르몰렌코","Andriy Yarmolenko",19,"RW",36,"Dynamo Kyiv","fringe"),p("빅토르 치겐코프스키","Viktor Tsygankov",15,"RW",28,"Girona","star"),
  p("아르템 도브비크","Artem Dovbyk",11,"ST",28,"Roma","star"),p("로만 야렘추크","Roman Yaremchuk",9,"ST",30,"Olympiacos","solid"),p("블라디슬라프 바나트","Vladyslav Vanat",14,"ST",23,"Dynamo Kyiv","solid"),
  p("올렉산드르 주브코프","Oleksandr Zubkov",20,"RW",29,"Shakhtar","solid"),p("세르히 시두르추크","Serhiy Sydorchuk",18,"CDM",34,"Westerlo","fringe"),p("일리야 크루페니","Illya Kvasnytsya",21,"ST",22,"Rukh Lviv","fringe"),
]))

teams.append(T("폴란드","Poland","POL","pl","UEFA",31,col("#FFFFFF","#DC143C","#FFFFFF"),"Stadion Narodowy",
 mgr("얀 우르반","Jan Urban","Poland","균형","3-5-2",2025),tac("3-5-2","balanced",6,6,6,"mixed",5),[
  p("보이치에흐 슈체스니","Wojciech Szczęsny",1,"GK",35,"Barcelona","star"),p("우카시 스코룹스키","Łukasz Skorupski",12,"GK",34,"Bologna","solid"),p("마르친 불카","Marcin Bułka",22,"GK",26,"Nice","solid"),
  p("마테우시 케흐","Matty Cash",2,"RB",28,"Aston Villa","solid"),p("프르제미수아프 프란코프스키","Przemysław Frankowski",19,"RWB",30,"Lens","solid"),
  p("얀 베드나레크","Jan Bednarek",5,"CB",29,"Southampton","solid"),p("야쿠프 키비오르","Jakub Kiwior",4,"CB",25,"Arsenal","star"),p("파베우 다비도비치","Paweł Dawidowicz",3,"CB",30,"Hellas Verona","solid"),
  p("니콜라 잘레프스키","Nicola Zalewski",21,"LWB",23,"Inter Milan","solid"),p("바르토시 베레신스키","Bartosz Bereszyński",18,"RB",33,"Salernitana","fringe"),
  p("피오트르 질린스키","Piotr Zieliński",10,"CM",31,"Inter Milan","star"),p("야쿠프 모데르","Jakub Moder",8,"CM",26,"Brighton","solid"),p("세바스티안 시마니스키","Sebastian Szymański",14,"CAM",26,"Fenerbahçe","star"),
  p("카밀 그로시츠키","Kamil Grosicki",16,"LW",37,"Pogoń Szczecin","fringe"),p("카롤 리네티","Karol Linetty",6,"CM",30,"Torino","solid"),
  p("로베르트 레반도프스키","Robert Lewandowski",9,"ST",37,"Barcelona","star",True),p("아르카디우시 밀리크","Arkadiusz Milik",7,"ST",31,"Juventus","solid"),p("카롤 스위데르스키","Karol Świderski",11,"ST",28,"Charlotte FC","solid"),
  p("야쿠프 카미엔스키","Jakub Kamiński",17,"LW",23,"Wolfsburg","solid"),p("니콜라 잘레브스키2","Kacper Urbański",15,"CM",21,"Bologna","solid"),
  p("바르토시 슬라슈크","Bartosz Slisz",13,"CDM",26,"Atlanta United","solid"),p("크지슈토프 피옹테크","Krzysztof Piątek",23,"ST",30,"İstanbul Başakşehir","solid"),p("우카시 피슈체크","Łukasz Piszczek",20,"RB",40,"retired","fringe"),
]))

teams.append(T("헝가리","Hungary","HUN","hu","UEFA",41,col("#CE2939","#FFFFFF","#477050"),"Puskás Aréna",
 mgr("마르코 로시","Marco Rossi","Italy","수비적","3-4-2-1",2018),tac("3-4-2-1","defensive",7,6,5,"mixed",5),[
  p("페테르 굴라치","Péter Gulácsi",1,"GK",35,"RB Leipzig","star"),p("데네스 디부슈","Dénes Dibusz",12,"GK",34,"Ferencváros","solid"),p("발라주 토트","Balázs Tóth",22,"GK",28,"Fehérvár","fringe"),
  p("벤데구즈 보르버티","Bendegúz Bolla",2,"RB",25,"Servette","solid"),p("아담 랑","Ádám Lang",4,"CB",32,"Omonia","solid"),p("빌모스 나지","Willi Orbán",3,"CB",32,"RB Leipzig","star",True),p("아틸라 살로이","Attila Szalai",5,"CB",27,"TSG Hoffenheim","solid"),
  p("마르톤 덴스","Márton Dárdai",6,"CB",23,"Hertha BSC","solid"),p("졸트 나디","Zsolt Nagy",17,"LWB",32,"Puskás Akadémia","solid"),
  p("아담 나지","Ádám Nagy",8,"CDM",30,"Spezia","solid"),p("안드라시 셰퍼","András Schäfer",13,"CM",26,"Union Berlin","solid"),p("도미닉 소보슬라이","Dominik Szoboszlai",10,"CM",24,"Liverpool","star"),
  p("칼만 켈러","Callum Styles",15,"CM",25,"Barnsley","solid"),p("로란트 사나이","Roland Sallai",7,"RW",28,"Galatasaray","star"),
  p("바르너바시 바르거","Barnabás Varga",9,"ST",31,"Ferencváros","star"),p("마르틴 아담","Martin Ádám",19,"ST",30,"Ulsan HD","solid"),
  p("케빈 찬크","Kevin Csoboth",11,"LW",25,"Újpest","solid"),p("다니엘 가지","Dániel Gazdag",16,"CAM",29,"Philadelphia Union","solid"),
  p("볼터 홀렌더","Botond Balogh",14,"CB",23,"Parma","solid"),p("엔드레 보츠카이","Endre Botka",18,"CB",31,"Ferencváros","fringe"),
  p("네메트 안드라시","András Németh",20,"ST",23,"Hamburger SV","solid"),p("솔라르 페트르","Péter Baráth",21,"CM",23,"Raków","solid"),p("로날드 바르고","Loïc Négo",23,"RB",34,"Le Havre","solid"),
]))

save("europe_b", teams)
print("done europe_b", len(teams))
