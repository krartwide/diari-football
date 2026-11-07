#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, "/workspace/scripts/rosters")
from packlib import p, mgr, tac, col, T, save

teams = []

teams.append(T("웨일스","Wales","WAL","gb-wls","UEFA",32,col("#FF0000","#00FF00","#FFFFFF"),"Cardiff City Stadium",
 mgr("크레이그 벨라미","Craig Bellamy","Wales","압박형","4-2-3-1",2024),tac("4-2-3-1","attacking",8,7,6,"mixed",7),[
  p("대니 워드","Danny Ward",1,"GK",32,"Leicester City","solid"),p("웨인 헨네시","Wayne Hennessey",12,"GK",38,"Nottingham Forest","fringe"),p("아담 데이비스","Adam Davies",21,"GK",33,"Sheffield United","fringe"),
  p("코너 로버츠","Connor Roberts",14,"RB",29,"Burnley","solid"),p("네코 윌리엄스","Neco Williams",3,"RB",24,"Nottingham Forest","star"),
  p("벤 데이비스","Ben Davies",4,"CB",32,"Tottenham Hotspur","star"),p("크리스 미팜","Chris Mepham",5,"CB",27,"Bournemouth","solid"),p("조 로드온","Joe Rodon",6,"CB",28,"Leeds United","solid"),p("벤 카반나","Ben Cabango",15,"CB",25,"Swansea","solid"),
  p("리코 루이스","Rico Lewis",2,"RB",20,"Manchester City","solid"),p("제이 다실바","Jay Dasilva",17,"LB",27,"Coventry","solid"),
  p("애런 램지","Aaron Ramsey",10,"CM",34,"Cardiff City","solid"),p("조 앨런","Joe Allen",8,"CDM",35,"Swansea","fringe"),p("이선 암파두","Ethan Ampadu",16,"CDM",24,"Leeds United","star",True),
  p("해리 윌슨","Harry Wilson",7,"RW",28,"Fulham","star"),p("대니얼 제임스","Daniel James",11,"RW",28,"Leeds United","solid"),p("데이비드 브룩스","David Brooks",19,"CAM",28,"Southampton","solid"),
  p("브렌넌 존슨","Brennan Johnson",9,"ST",24,"Tottenham Hotspur","star"),p("키퍼 무어","Kieffer Moore",13,"ST",33,"Sheffield United","solid"),p("리언 베일리","Rabbi Matondo",18,"LW",25,"Real Sociedad","solid"),
  p("조던 제임스","Jordan James",20,"CM",21,"Birmingham","solid"),p("루크 에반스","Luke Evans",22,"CB",22,"Leicester","fringe"),p("나단 브로드헤드","Nathan Broadhead",23,"ST",27,"Ipswich","solid"),
]))

teams.append(T("그리스","Greece","GRE","gr","UEFA",46,col("#0D5EAF","#FFFFFF","#0D5EAF"),"Olympic Stadium Athens",
 mgr("이반 요바노비치","Ivan Jovanović","Serbia","수비적","4-2-3-1",2024),tac("4-2-3-1","defensive",6,5,5,"mixed",5),[
  p("오디스세아스 블라호디모스","Odysseas Vlachodimos",1,"GK",31,"Newcastle United","star"),p("디미트리오스 케르케조스","Dimitrios Kerkizos",12,"GK",28,"AEK","fringe"),p("콘스탄티노스 찰레라스","Konstantinos Tzolakis",13,"GK",23,"Olympiacos","solid"),
  p("기오르고스 키리아코풀로스","Giorgos Kyriakopoulos",2,"LB",29,"Monza","solid"),p("콘스탄티노스 마브로파노스","Konstantinos Mavropanos",4,"CB",27,"West Ham United","star"),
  p("판텔리스 하지디아코스","Pantelis Hatzidiakos",5,"CB",28,"Cagliari","solid"),p("파나기오티스 레트조스","Panagiotis Retsos",3,"CB",27,"Olympiacos","solid"),p("코스타스 마놀라스","Kostas Manolas",6,"CB",34,"retired","fringe"),
  p("라자로스 로비나스","Lazaros Rota",14,"RB",28,"AEK","solid"),p("야니스 마수라스","Giannis Masouras",17,"RB",28,"Olympiacos","fringe"),
  p("디미트리스 쿨루리스","Dimitris Kourbelis",8,"CDM",31,"Trabzonspor","solid",True),p("페트로스 만탈로스","Petros Mantalos",10,"CAM",34,"AEK","solid"),p("타소스 바크세바노글루","Tasos Bakasetas",11,"CAM",32,"Panathinaikos","star"),
  p("요르고스 마수라스","Giorgos Masouras",19,"RW",31,"Olympiacos","solid"),p("안드레아스 불로스","Andreas Bouchalakis",16,"CM",32,"Torino","solid"),
  p("포티스 이오아니디스","Fotis Ioannidis",9,"ST",25,"Panathinaikos","star"),p("바실리스 파블리디스","Vangelis Pavlidis",7,"ST",26,"Benfica","star"),
  p("크리스토스 치올리","Christos Tzolis",18,"LW",23,"Club Brugge","solid"),p("안스타시오스 두비카스","Anastasios Douvikas",20,"ST",26,"Celta","solid"),
  p("마노리스 시아피스","Manolis Siopis",15,"CDM",31,"Cardiff City","solid"),p("디미트리스 리마나리","Dimitris Limnios",21,"RW",27,"Köln","solid"),
  p("콘스탄티노스 쿠치아스","Konstantinos Koulierakis",22,"CB",22,"Wolfsburg","solid"),p("예오르기오스 기아쿠마키스","Georgios Giakoumakis",23,"ST",30,"Atlanta United","solid"),
]))

teams.append(T("스코틀랜드","Scotland","SCO","gb-sct","UEFA",36,col("#0065BF","#FFFFFF","#0065BF"),"Hampden Park",
 mgr("스티브 클라크","Steve Clarke","Scotland","수비적","3-5-2",2019),tac("3-5-2","defensive",7,5,5,"long",5),[
  p("앵거스 건","Angus Gunn",1,"GK",29,"Norwich","solid"),p("리암 켈리","Liam Kelly",12,"GK",29,"Motherwell","fringe"),p("조크 로디","Zander Clark",21,"GK",33,"Heart of Midlothian","fringe"),
  p("앤서니 랜킨","Anthony Ralston",2,"RB",26,"Celtic","solid"),p("애런 힌드마쉬","Aaron Hickey",22,"RB",23,"Brentford","solid"),
  p("키ieran 티어니","Kieran Tierney",3,"LB",28,"Arsenal","star"),p("앤드류 로버트슨","Andrew Robertson",17,"LWB",31,"Liverpool","star",True),
  p("그랜트 핸리","Grant Hanley",4,"CB",33,"Norwich","solid"),p("스콧 맥토미니","Scott McTominay",8,"CM",28,"Napoli","star"),p("존 맥긴","John McGinn",7,"CM",31,"Aston Villa","star"),
  p("라이언 포르터우스","Ryan Porteous",5,"CB",26,"Watford","solid"),p("잭 헨드릭","Jack Hendry",15,"CB",30,"Al-Ettifaq","solid"),
  p("캘럼 맥그리거","Callum McGregor",6,"CDM",32,"Celtic","solid"),p("빌리 길모어","Billy Gilmour",16,"CM",24,"Brighton","solid"),
  p("라이언 크리스티","Ryan Christie",11,"CAM",30,"Bournemouth","solid"),p("스튜어트 암스트롱","Stuart Armstrong",18,"CM",33,"Southampton","fringe"),
  p("리암 쿠퍼","Liam Cooper",14,"CB",34,"Leeds","fringe"),p("리 애덤스","Ché Adams",9,"ST",29,"Torino","solid"),
  p("린던 다이스","Lyndon Dykes",10,"ST",30,"Queens Park Rangers","solid"),p("케니 맥린","Kenny McLean",13,"CM",33,"Norwich","solid"),
  p("벤 도어","Ben Doak",19,"RW",19,"Liverpool","solid"),p("제임스 포레스트","James Forrest",20,"RW",34,"Celtic","fringe"),p("토미 콘웨이","Tommy Conway",23,"ST",23,"Bristol City","solid"),
]))

teams.append(T("세르비아","Serbia","SRB","rs","UEFA",37,col("#C6363C","#FFFFFF","#0C4076"),"Rajko Mitić Stadium",
 mgr("드라간 스토이코비치","Dragan Stojković","Serbia","공격적","3-4-2-1",2021),tac("3-4-2-1","attacking",6,7,6,"mixed",5),[
  p("프레드라그 라이코비치","Predrag Rajković",1,"GK",29,"Al-Ittihad","star"),p("졸로탄 홀로반","Đorđe Petrović",12,"GK",25,"Chelsea","solid"),p("반야 밀린코비치사비치","Vanja Milinković-Savić",23,"GK",28,"Torino","solid"),
  p("니콜라 밀렌코비치","Nikola Milenković",4,"CB",27,"Nottingham Forest","star"),p("스트라히냐 파블로비치","Strahinja Pavlović",5,"CB",24,"AC Milan","star"),p("미야트 가치노비치","Mijat Gaćinović",2,"CM",30,"AEK","fringe"),
  p("스르잔 바비치","Srđan Babić",3,"CB",29,"Spartak Moscow","solid"),p("필리프 믈라데노비치","Filip Mladenović",17,"LWB",34,"Panathinaikos","solid"),
  p("안드리야 지브코비치","Andrija Živković",14,"RWB",28,"PAOK","solid"),p("니콜라 칼라시니치","Nemanja Gudelj",6,"CDM",33,"Sevilla","solid"),
  p("세르게이 밀린코비치사비치","Sergej Milinković-Savić",8,"CM",30,"Al-Hilal","star"),p("두산 타디치","Dušan Tadić",10,"CAM",36,"Fenerbahçe","star",True),
  p("사샤 루키치","Saša Lukić",16,"CM",29,"Fulham","solid"),p("이반 일리치","Ivan Ilić",18,"CM",24,"Torino","solid"),
  p("라자르 사마르지치","Lazar Samardžić",7,"CAM",23,"Atalanta","solid"),p("필리프 쿠하르치치","Filip Kostić",19,"LWB",32,"Juventus","solid"),
  p("알렉산다르 미트로비치","Aleksandar Mitrović",9,"ST",31,"Al-Hilal","star"),p("두산 블라호비치","Dušan Vlahović",11,"ST",25,"Juventus","star"),
  p("루카 요비치","Luka Jović",21,"ST",27,"AC Milan","solid"),p("니콜라 요비치","Nemanja Radonjić",20,"LW",29,"Torino","solid"),
  p("벨코 비르차닌","Veljko Birmančević",15,"RW",27,"Sparta Prague","solid"),p("스트라히냐 에라코비치","Strahinja Eraković",13,"CB",24,"Zenit","solid"),p("미하일로 일리치","Mihailo Ilić",22,"CB",22,"Partizan","fringe"),
]))

teams.append(T("슬로바키아","Slovakia","SVK","sk","UEFA",45,col("#0B4EA2","#FFFFFF","#EE1C25"),"Tehelné pole",
 mgr("프란체스코 칼조나","Francesco Calzona","Italy","수비적","4-3-3",2022),tac("4-3-3","defensive",6,5,5,"mixed",5),[
  p("마르틴 두브라프카","Martin Dúbravka",1,"GK",36,"Newcastle United","star"),p("마렉 로닥","Marek Rodák",12,"GK",28,"Fulham","solid"),p("헨리흐 리바르스키","Henrich Ravas",23,"GK",28,"New England","fringe"),
  p("페테르 페카리크","Peter Pekarík",2,"RB",38,"Hertha","fringe"),p("다비드 흐란카","Dávid Hancko",4,"CB",27,"Feyenoord","star",True),
  p("밀란 스크리니어","Milan Škriniar",3,"CB",30,"Paris Saint-Germain","star"),p("데니스 바르보어","Denis Vavro",5,"CB",29,"København","solid"),p("노르베르트 기외뫼르","Norbert Gyömbér",6,"CB",32,"Salernitana","solid"),
  p("유라이 쿠츠카","Juraj Kucka",8,"CM",38,"Slovan Bratislava","fringe"),p("스타니슬라프 로보츠카","Stanislav Lobotka",10,"CDM",30,"Napoli","star"),
  p("온드레이 둔다","Ondrej Duda",11,"CM",30,"Hellas Verona","solid"),p("라슬로 벤데시","László Bénes",15,"CM",28,"Hamburger SV","solid"),
  p("로베르트 보제니크","Róbert Boženík",9,"ST",25,"Boavista","solid"),p("루카스 하라슬린","Lukáš Haraslín",17,"LW",29,"Sparta Prague","solid"),
  p("이반 슈란츠","Ivan Schranz",18,"RW",31,"Slavia Prague","solid"),p("토마시 수슬로브","Tomáš Suslov",19,"CAM",23,"Hellas Verona","solid"),
  p("다비드 스트레렉","David Strelec",7,"ST",24,"Spezia","solid"),p("마투스 벤초","Matúš Bero",16,"CM",29,"VfL Bochum","solid"),
  p("베르노어 비사","Vernon De Marco",14,"LB",32,"Hatayspor","fringe"),p("데니스 코발리크","Denis Kovářik",21,"LB",24,"Žilina","fringe"),
  p("루보미르 사토리","Ľubomír Šatka",13,"CB",29,"Lech Poznań","solid"),p("마렉 함식","Marek Hamšík",20,"CM",38,"retired","fringe"),p("라디슬라프 크리스토프","Róbert Mak",22,"LW",34,"Sydney FC","fringe"),
]))

teams.append(T("체코","Czechia","CZE","cz","UEFA",44,col("#11457E","#FFFFFF","#D7141A"),"Eden Arena",
 mgr("미로슬라프 코우베크","Miroslav Koubek","Czechia","균형","4-2-3-1",2024),tac("4-2-3-1","balanced",7,6,6,"mixed",6),[
  p("마테스 코바르","Matěj Kovář",1,"GK",25,"Bayer Leverkusen","star"),p("이르지 스타레크","Jiří Staněk",16,"GK",33,"Slavia Prague","solid"),p("비테즈슬라프 야로시","Vítězslav Jaroš",23,"GK",24,"Liverpool","fringe"),
  p("블라디미르 초우팔","Vladimír Coufal",2,"RB",33,"West Ham United","solid"),p("토마시 호레시","Tomáš Holeš",3,"CB",32,"Slavia Prague","solid"),
  p("라디미르 쿠비크","Ladislav Krejčí",4,"CB",26,"Girona","star"),p("야쿠프 브르베니","Jakub Brabec",5,"CB",33,"Aris","solid"),p("다비드 제마","David Zima",6,"CB",24,"Slavia Prague","solid"),
  p("다비드 유라세크","David Jurásek",17,"LB",25,"Benfica","solid"),p("야로스라프 조라","Jaroslav Zelený",15,"LB",33,"Sparta Prague","fringe"),
  p("토마시 소우체크","Tomáš Souček",8,"CDM",30,"West Ham United","star",True),p("안토닌 바라크","Antonín Barák",10,"CAM",30,"Fiorentina","solid"),
  p("루카스 프로보드","Lukáš Provod",11,"CM",28,"Slavia Prague","solid"),p("아담 흘로제크","Adam Hložek",7,"CAM",23,"Bayer Leverkusen","star"),
  p("파트리크 쉬크","Patrik Schick",9,"ST",29,"Bayer Leverkusen","star"),p("얀 쿠흐타","Jan Kuchta",19,"ST",28,"Sparta Prague","solid"),
  p("바클라프 체르니","Václav Černý",18,"RW",27,"Wolfsburg","solid"),p("모이미르 히틸","Mojmír Chytil",14,"ST",26,"Slavia Prague","solid"),
  p("페트르 세브치크","Petr Ševčík",16,"CM",31,"Slavia Prague","solid"),p("파벨 슈바르츠","Pavel Šulc",20,"CAM",24,"Viktoria Plzeň","solid"),
  p("마테이 히라","Matěj Jurásek",21,"RW",22,"Slavia Prague","solid"),p("토마시 초르니","Tomáš Chorý",22,"ST",30,"Viktoria Plzeň","solid"),p("온드레이 링겔","Ondřej Lingr",13,"CAM",26,"Feyenoord","solid"),
]))

teams.append(T("슬로베니아","Slovenia","SVN","si","UEFA",55,col("#0055A4","#FFFFFF","#FF0000"),"Stožice Stadium",
 mgr("마탸시 케크","Matjaž Kek","Slovenia","균형","4-4-2",2018),tac("4-4-2","balanced",6,6,6,"mixed",6),[
  p("얀 오블라크","Jan Oblak",1,"GK",32,"Atlético Madrid","star",True),p("비드 베자크","Vid Belec",12,"GK",35,"APOEL","fringe"),p("이고르 브키치","Igor Vekić",16,"GK",27,"Vejle","fringe"),
  p("페터 스토야노비치","Petar Stojanović",2,"RB",29,"Salernitana","solid"),p("유레 발카시치","Jure Balkovec",3,"LB",30,"Alanyaspor","solid"),
  p("바니 드린시치","Vanja Drkušić",4,"CB",25,"Sochi","solid"),p("미하 메블야","Miha Mevlja",5,"CB",35,"Al-Wahda","fringe"),p("야카 비요크","Jaka Bijol",6,"CB",26,"Udinese","star"),
  p("아담 고르키치","Adam Gnezda Čerin",8,"CM",25,"Panathinaikos","solid"),p("토미 무르그","Timi Max Elšnik",10,"CM",27,"Olimpija","solid"),
  p("벤야민 베르비치","Benjamin Verbič",11,"LW",31,"Panathinaikos","solid"),p("안드레이 질린스키","Andraž Šporar",9,"ST",31,"Panathinaikos","solid"),
  p("잔 첼라르","Žan Celar",19,"ST",26,"Lugano","solid"),p("베냐민 셰슈코","Benjamin Šeško",7,"ST",22,"RB Leipzig","star"),
  p("산드르 로브리치","Sandi Lovrić",14,"CM",27,"Udinese","solid"),p("야사 쿠르티치","Josip Iličić",17,"CAM",37,"Maribor","fringe"),
  p("페테르 크라네츠","Petar Stojanović",15,"RB",29,"Salernitana","fringe"),p("미하 블라지치","Miha Blažič",13,"CB",32,"Lech Poznań","solid"),
  p("다비드 브레칼로","David Brekalo",18,"CB",26,"Orlando City","solid"),p("야카 크라베츠","Žan Karničnik",20,"RB",30,"Celje","solid"),
  p("얀 므로블야","Jan Mlakar",21,"ST",26,"Hajduk Split","solid"),p("라르스 투른","Lars Thöni",22,"CM",24,"Olimpija","fringe"),p("비다르 무시치","Vid Vogrinec",23,"GK",24,"Maribor","fringe"),
]))

teams.append(T("아일랜드","Ireland","IRL","ie","UEFA",59,col("#169B62","#FFFFFF","#FF883E"),"Aviva Stadium",
 mgr("헤이미르 할그림손","Heimir Hallgrímsson","Iceland","균형","3-5-2",2024),tac("3-5-2","balanced",7,6,6,"mixed",6),[
  p("카오임힌 켈레헤르","Caoimhín Kelleher",1,"GK",26,"Liverpool","star"),p("개빈 바주누","Gavin Bazunu",16,"GK",23,"Southampton","solid"),p("마크 트래버스","Mark Travers",23,"GK",26,"Bournemouth","fringe"),
  p("맷 도허티","Matt Doherty",2,"RB",33,"Wolverhampton","solid"),p("데릴 피셔","Dara O'Shea",4,"CB",26,"Burnley","solid"),
  p("네이선 콜린스","Nathan Collins",5,"CB",24,"Brentford","star"),p("존 에간","John Egan",3,"CB",32,"Sheffield United","solid"),p("리암 스케일스","Liam Scales",15,"CB",26,"Celtic","solid"),
  p("로비 브래디","Robbie Brady",17,"LWB",33,"Preston","solid"),p("앤드류 옴보에","Andrew Omobamidele",18,"CB",23,"Nottingham Forest","solid"),
  p("조시 컬런","Josh Cullen",6,"CDM",29,"Burnley","solid"),p("제이슨 나이트","Jason Knight",8,"CM",24,"Bristol City","solid"),
  p("앨런 브라운","Alan Browne",10,"CM",30,"Sunderland","solid"),p("윌 스몰리","Will Smallbone",14,"CM",25,"Southampton","solid"),
  p("추쿠우에메카 애네케","Chiedozie Ogbene",11,"RW",28,"Luton Town","solid"),p("미코 아이버","Mikkel Damsgaard",7,"CAM",25,"Brentford","fringe"),
  p("애덤 아이다","Adam Idah",9,"ST",24,"Celtic","star"),p("에반 퍼거슨","Evan Ferguson",19,"ST",21,"Brighton","star"),
  p("트로이 패럿","Troy Parrott",20,"ST",23,"AZ","solid"),p("컬럼 로빈슨","Callum Robinson",13,"ST",30,"Cardiff City","solid"),
  p("샘 파제틱","Sammie Szmodics",21,"CAM",29,"Ipswich","solid"),p("제이크 오브라엔","Jake O'Brien",22,"CB",24,"Everton","solid"),p("핀 아주리","Finn Azaz",12,"CAM",24,"Middlesbrough","solid"),
]))

# Fix Ireland Mikkel Damsgaard - he's Danish. Replace with Irish player
teams[-1]["players"] = [x for x in teams[-1]["players"] if x["nameEn"] != "Mikkel Damsgaard"] + [
  p("마이클 오비나","Michael Obafemi",7,"ST",25,"Burnley","solid"),
]

teams.append(T("보스니아 헤르체고비나","Bosnia and Herzegovina","BIH","ba","UEFA",71,col("#002395","#FFFFFF","#FF0000"),"Stadion Bilino Polje",
 mgr("세르게이 바르바레즈","Sergej Barbarez","Bosnia and Herzegovina","공격적","4-3-3",2024),tac("4-3-3","attacking",6,7,6,"mixed",6),[
  p("니콜라 바실","Nikola Vasilj",1,"GK",29,"Sankt Pauli","solid"),p("이브라힘 셰히치","Ibrahim Šehić",12,"GK",37,"Al-Khaleej","fringe"),p("케난 피리치","Kenan Pirić",22,"GK",31,"Antalyaspor","fringe"),
  p("세아드 콜라시나츠","Sead Kolašinac",3,"LB",32,"Atalanta","star"),p("에르빈 무이치","Ermin Bičakčić",4,"CB",35,"Hoffenheim","solid"),
  p("데니스 하지카두니치","Dennis Hadžikadunić",5,"CB",26,"Rostov","solid"),p("유수프 가지베고비치","Jusuf Gazibegović",2,"RB",25,"Sturm Graz","solid"),
  p("아미르 하지치","Amar Dedić",7,"RB",22,"Red Bull Salzburg","star"),p("니콜라 코바체비치","Nikola Kovačević",6,"CB",27,"Željezničar","fringe"),
  p("미르알렘 피아니치","Miralem Pjanić",8,"CM",35,"Sharjah","solid"),p("고란 자키치","Gojko Cimirot",10,"CDM",32,"Al-Fayha","solid"),
  p("에딘 제코","Edin Džeko",9,"ST",39,"Fiorentina","star",True),p("에르민 비차크치치","Ermedin Demirović",11,"ST",27,"Augsburg","star"),
  p("하리스 타바코비치","Haris Tabaković",19,"ST",31,"Hertha BSC","solid"),p("아마르 메미셰비치","Amar Memić",17,"RW",24,"Karviná","solid"),
  p("케난 코드로","Kenan Kodro",18,"ST",32,"Ferencváros","solid"),p("다르코 토도로비치","Darko Todorović",14,"RB",28,"Aktobe","fringe"),
  p("렌초 바이람","Renato Gojković",15,"CB",30,"Sarajevo","fringe"),p("안토니오 레디치","Antonio Radić",16,"CM",24,"Zrinjski","fringe"),
  p("벤야민 타히로비치","Benjamin Tahirović",13,"CDM",22,"Ajax","solid"),p("다리오 사리치","Dario Šarić",20,"CM",29,"Palermo","solid"),
  p("넬손 기요","Nemanja Bilbija",21,"ST",34,"Zrinjski","solid"),p("아드난 코바체비치","Adnan Kovačević",23,"CB",31,"Ferencváros","solid"),
]))

teams.append(T("루마니아","Romania","ROU","ro","UEFA",47,col("#002B7F","#FCD116","#CE1126"),"Arena Națională",
 mgr("에드워드 이오르다네스쿠","Edward Iordănescu","Romania","수비적","4-2-3-1",2022),tac("4-2-3-1","defensive",6,5,5,"mixed",5),[
  p("플로린 니차","Florin Niță",1,"GK",38,"Gaziantep","solid"),p("호라치우 몰도반","Horațiu Moldovan",12,"GK",27,"Atlético Madrid","star"),p("슈테판 타르노바누","Ștefan Târnovanu",16,"GK",25,"FCSB","fringe"),
  p("안드레이 라치우","Andrei Rațiu",2,"RB",26,"Rayo Vallecano","solid"),p("라두 드라구신","Radu Drăgușin",3,"CB",23,"Tottenham Hotspur","star"),
  p("안드레이 부르커","Andrei Burcă",4,"CB",32,"CFR Cluj","solid"),p("보고단 라코비탄","Bogdan Racovițan",5,"CB",25,"Rakow","solid"),
  p("니쿠쇼르 반쿠","Nicușor Bancu",6,"LB",32,"Universitatea Craiova","solid"),p("발렌틴 미하이라","Valentin Mihăilă",17,"LW",25,"Parma","solid"),
  p("라즈반 마린","Răzvan Marin",8,"CM",29,"Cagliari","solid"),p("니콜라에 스탄치우","Nicolae Stanciu",10,"CAM",32,"Damac","star",True),
  p("이안니스 하지","Ianis Hagi",7,"CAM",26,"Alavés","solid"),p("데니스 드라구스","Dennis Man",11,"RW",26,"Parma","star"),
  p("데니스 알리베크","Denis Alibec",9,"ST",34,"Farul","solid"),p("데니스 드라구스2","Denis Drăguș",19,"ST",25,"Gaziantep","solid"),
  p("마리우스 마린","Marius Marin",16,"CDM",26,"Pisa","solid"),p("다리우스 오로시안","Darius Olaru",14,"CM",26,"FCSB","solid"),
  p("안드레이 부르더","Andrei Buricea",15,"CM",24,"Rapid București","fringe"),p("플로린 탄아제","Florin Tănase",18,"CAM",30,"Al-Okhdood","solid"),
  p("조지 푸슈카스","George Pușcaș",20,"ST",29,"Bodrum","solid"),p("옥타비안 포페스쿠","Octavian Popescu",21,"LW",22,"FCSB","solid"),
  p("안드레이 블라다","Andrei Vlad",22,"GK",26,"FCSB","fringe"),p("보그단 플라니치","Bogdan Planic",13,"CB",33,"Maccabi Haifa","fringe"),
]))

save("europe_c", teams)
print("europe_c", len(teams))
