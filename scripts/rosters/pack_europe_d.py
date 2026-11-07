#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, "/workspace/scripts/rosters")
from packlib import p, mgr, tac, col, T, save

teams = []

teams.append(T("북아일랜드","Northern Ireland","NIR","gb-nir","UEFA",69,col("#18A558","#FFFFFF","#18A558"),"Windsor Park",
 mgr("마이클 오닐","Michael O'Neill","Northern Ireland","수비적","5-3-2",2022),tac("5-3-2","defensive",6,5,5,"long",4),[
  p("베일리 피콕패럴","Bailey Peacock-Farrell",1,"GK",28,"Aarhus","solid"),p("코너 오멀레이","Conor Hazard",12,"GK",27,"Plymouth","fringe"),p("로리 브라운","Luke Southwood",23,"GK",27,"Cheltenham","fringe"),
  p("트래비스 비어","Travis Hume",2,"RB",24,"Linfield","fringe"),p("자말 루이스","Jamal Lewis",3,"LB",27,"Newcastle United","solid"),
  p("크레이그 캐ATHCART","Craig Cathcart",4,"CB",36,"Watford","fringe"),p("다니엘 발라드","Daniel Ballard",5,"CB",25,"Sunderland","star"),p("에온 토알","Eoin Toal",6,"CB",26,"Bolton","solid"),
  p("페디 맥네어","Paddy McNair",17,"CB",30,"West Brom","solid"),p("셰인 퍼거슨","Shane Ferguson",14,"LB",34,"Rotherham","fringe"),
  p("조지 사빌","George Saville",8,"CM",32,"Millwall","solid"),p("코르리 에반스","Corry Evans",10,"CDM",35,"Sunderland","fringe"),
  p("아이작 프라이스","Isaac Price",7,"CAM",21,"Standard Liège","solid"),p("알피 맥컬록","Alfie McCalmont",16,"CM",25,"Carlisle","fringe"),
  p("디오 찰스","Dion Charles",9,"ST",29,"Bolton","solid"),p("콜 팔머","Callum Marshall",19,"ST",21,"West Ham United","solid"),
  p("조시 마긴스","Josh Magennis",11,"ST",34,"Exeter","fringe"),p("가빈 화이트","Gavin Whyte",18,"RW",29,"Portsmouth","solid"),
  p("브래드 라이온스","Brad Lyons",15,"CM",28,"Kilmarnock","solid"),p("코너 브래들리","Conor Bradley",21,"RB",21,"Liverpool","star",True),
  p("트라우이 후메","Trai Hume",20,"RB",23,"Sunderland","solid"),p("셰인 퍼거슨2","Ciaron Brown",13,"CB",27,"Oxford United","solid"),p("폴 스미슨","Paul Smyth",22,"RW",27,"Queens Park Rangers","solid"),
]))

teams.append(T("알바니아","Albania","ALB","al","UEFA",63,col("#E41E20","#000000","#E41E20"),"Arena Kombëtare",
 mgr("실비뉴 이아누아에","Sylvinho","Brazil","균형","4-2-3-1",2023),tac("4-2-3-1","balanced",7,6,6,"mixed",6),[
  p("토마스 스트라고스","Thomas Strakosha",1,"GK",30,"Brentford","star"),p("엘로르 베리샤","Etrit Berisha",12,"GK",36,"Empoli","fringe"),p("알타이 바이라미","Altin Bajrami",23,"GK",25,"Tirana","fringe"),
  p("이반 발리우","Iván Balliu",2,"RB",33,"Rayo Vallecano","solid"),p("마르시 하시","Elseid Hysaj",4,"RB",31,"Lazio","solid"),
  p("베르디안 아지미","Berat Djimsiti",5,"CB",32,"Atalanta","star",True),p("아르디안 이스마이리","Ardian Ismajli",3,"CB",29,"Empoli","solid"),p("마르코스 카브라시","Marash Kumbulla",6,"CB",25,"Roma","solid"),
  p("마리오 미타라이","Mario Mitaj",17,"LB",21,"Lokomotiv Moscow","solid"),p("케빈 야쿠피","Kevin Vangjeli",14,"LB",24,"Tirana","fringe"),
  p("크리스얀 아슬라니","Kristjan Asllani",8,"CDM",23,"Inter Milan","star"),p("요니 무치","Ylber Ramadani",10,"CDM",29,"Lecce","solid"),
  p("네딤 바이라미","Nedim Bajrami",7,"CAM",26,"Sassuolo","star"),p("케빈 야쿠피2","Qazim Laçi",16,"CM",29,"Sparta Prague","solid"),
  p("야슬란 시라즈","Jasir Asani",11,"RW",29,"Gwangju","solid"),p("아미르 압라흐","Armando Broja",9,"ST",24,"Chelsea","star"),
  p("미르시드 디리","Myrto Uzuni",19,"LW",30,"Granada","solid"),p("레온 이토","Rey Manaj",18,"ST",28,"Sivasspor","solid"),
  p("아른트 크라야","Arbnor Muja",20,"RW",26,"Samsunspor","solid"),p("에른스트 무치","Ernest Muçi",21,"CAM",24,"Beşiktaş","solid"),
  p("클라우디오 푸시","Klaus Gjasula",15,"CDM",35,"Darmstadt","fringe"),p("아이든 할릴라즈","Atdhe Nuhiu",22,"ST",35,"retired","fringe"),p("프레디 베시","Freddie Veseli",13,"CB",32,"Salernitana","fringe"),
]))

teams.append(T("북마케도니아","North Macedonia","MKD","mk","UEFA",65,col("#D20000","#FFE600","#D20000"),"Toše Proeski Arena",
 mgr("블라고야 밀레프스키","Blagoja Milevski","North Macedonia","균형","4-2-3-1",2021),tac("4-2-3-1","balanced",6,6,6,"mixed",5),[
  p("스토레 드미트리예프스키","Stole Dimitrievski",1,"GK",31,"Valencia","star"),p("다미안 야코프스키","Damjan Shishkovski",12,"GK",30,"Shkëndija","fringe"),p("이기르 콜레프","Igor Aleksovski",23,"GK",30,"Rabotnički","fringe"),
  p("스테판 리스티오프스키","Stefan Ristovski",2,"RB",33,"Dinamo Zagreb","solid"),p("에즈잔 알리오스키","Ezgjan Alioski",3,"LB",33,"Al-Ahli","solid"),
  p("비살 무시우","Visar Musliu",4,"CB",30,"Paderborn","solid"),p("다르코 벨코프스키","Darko Velkovski",5,"CB",30,"Rijeka","solid"),p("기아르 이메로비치","Gjoko Zajkov",6,"CB",30,"Charleroi","fringe"),
  p("엘리프 엘마스","Elif Elmas",8,"CM",25,"RB Leipzig","star"),p("엔니스 바르디","Enis Bardhi",10,"CAM",30,"Trabzonspor","star",True),
  p("보얀 미오프스키","Bojan Miovski",9,"ST",26,"Girona","star"),p("알렉산다르 트라이코프스키","Aleksandar Trajkovski",11,"ST",33,"Hajduk Split","solid"),
  p("티호미르 코스타디노프","Tihomir Kostadinov",14,"CM",29,"Piast Gliwice","solid"),p("야니 아타나소프","Jani Atanasov",16,"CM",25,"Cracovia","solid"),
  p("다비드 바바라","David Babunski",17,"CM",31,"Debrecen","fringe"),p("일리아 네스토로프스키","Ilija Nestorovski",19,"ST",35,"Ascoli","fringe"),
  p("밀란 리스토프스키","Milan Ristovski",18,"ST",27,"Spartak Trnava","solid"),p("니콜라 세라포프","Nikola Serafimov",15,"CB",26,"Fehérvár","solid"),
  p("토도르 토도로프스키","Todor Todoroski",7,"RB",26,"Sheriff","solid"),p("보일 파노프스키","Bojan Dimoski",20,"LB",23,"Akron","solid"),
  p("이사 리스티치","Isnik Alimi",21,"CM",31,"Sepsi","fringe"),p("리얼 아리피","Lirim Qamili",22,"RW",26,"Horsens","solid"),p("다르코 찬다","Darko Churlinov",13,"LW",25,"Jagiellonia","solid"),
]))

teams.append(T("아이슬란드","Iceland","ISL","is","UEFA",74,col("#02529C","#FFFFFF","#DC1E35"),"Laugardalsvöllur",
 mgr("아르나르 군라우드손","Arnar Gunnlaugsson","Iceland","균형","4-4-2",2025),tac("4-4-2","balanced",6,6,6,"mixed",5),[
  p("하콘 발디마르손","Hákon Valdimarsson",1,"GK",23,"Brentford","solid"),p("룬나르 루나르손","Rúnar Alex Rúnarsson",12,"GK",30,"København","solid"),p("엘리아스 라프슨","Elías Rafn Ólafsson",13,"GK",25,"Midtjylland","fringe"),
  p("알피르 구드문드손","Alfons Sampsted",2,"RB",27,"Twente","solid"),p("비르키르 마르 사에바르손","Birkir Már Sævarsson",3,"RB",34,"Valur","fringe"),
  p("스베르리르 잉가손","Sverrir Ingi Ingason",4,"CB",32,"Midtjylland","star"),p("호르두르 마그누손","Hörður Magnússon",5,"CB",32,"Panathinaikos","solid"),
  p("빅토르 팔손","Viktor Pálsson",6,"CB",34,"Eupen","solid"),p("미카엘 안데르손","Mikael Anderson",17,"LB",27,"Aarhus","solid"),
  p("요한 구드문드손","Jóhann Berg Guðmundsson",7,"RM",34,"Burnley","solid"),p("길피 시구르드손","Gylfi Sigurðsson",10,"CAM",36,"Víkingur","fringe"),
  p("아론 군나르손","Aron Gunnarsson",8,"CDM",36,"Kraków","solid",True),p("빅토르 기이제르손","Viktor Gyökeres",9,"ST",27,"Sporting","fringe"),
  p("알프레드 핀보가손","Alfreð Finnbogason",11,"ST",36,"Lyngby","fringe"),p("안드리 구드욘센","Andri Guðjohnsen",19,"ST",23,"Gent","solid"),
  p("이삭 올가손","Ísak Bergmann Jóhannesson",14,"CM",22,"København","star"),p("윌룸 토르 빌헬름손","Willum Þór Willumsson",16,"CM",26,"Birmingham","solid"),
  p("오르리 시구르드손","Orri Óskarsson",18,"ST",21,"København","star"),p("하콘 아르나르손","Hákon Arnar Haraldsson",15,"CAM",22,"Lille","star"),
  p("미카엘 마그누손","Mikael Egill Ellertsson",20,"CM",23,"Venezia","solid"),p("로그이 발디마르손","Logi Tómasson",21,"LB",24,"Strømsgodset","solid"),
  p("다니엘 구드욘센","Daníel Guðjohnsen",22,"ST",19,"Malmö","fringe"),p("아르노르 시구르드손","Arnór Sigurðsson",23,"CAM",26,"Blackburn","solid"),
]))
# Fix Iceland - Viktor Gyökeres is Swedish
teams[-1]["players"] = [x for x in teams[-1]["players"] if "Gyökeres" not in x["nameEn"]] + [
  p("요나스 토르","Jón Dagur Þorsteinsson",9,"LW",26,"Hannover","solid"),
]

teams.append(T("조지아","Georgia","GEO","ge","UEFA",73,col("#FFFFFF","#FF0000","#FFFFFF"),"Boris Paichadze Stadium",
 mgr("윌리 산뇰","Willy Sagnol","France","공격적","4-3-3",2021),tac("4-3-3","attacking",7,7,7,"short",6),[
  p("기오르기 맘다르다슈빌리","Giorgi Mamardashvili",1,"GK",24,"Valencia","star"),p("기오르기 랍시빌리","Giorgi Loria",12,"GK",39,"Dinamo Tbilisi","fringe"),p("라티 베하이제","Luka Gugeshashvili",23,"GK",26,"Qarabağ","fringe"),
  p("오타르 카카바제","Otar Kakabadze",2,"RB",29,"Cracovia","solid"),p("구라암 카슈이아","Guram Kashia",4,"CB",38,"Slovan Bratislava","solid"),
  p("루카 로흐슈빌리","Luka Lochoshvili",5,"CB",27,"Cremonese","solid"),p("솔로몬 크비르크벨리아","Solomon Kvirkvelia",3,"CB",33,"Al-Okhdood","solid"),
  p("제말 다비타슈빌리","Jemal Tabidze",6,"CB",29,"Panetolikos","fringe"),p("기오르기 고초레이시","Giorgi Gocholeishvili",17,"RB",24,"Shakhtar","solid"),
  p("흐비차 크바라츠헬리아","Khvicha Kvaratskhelia",7,"LW",24,"Napoli","star"),p("기오르기 차크베타제","Giorgi Chakvetadze",10,"CAM",25,"Watford","star"),
  p("조르기 코차슈빌리","Giorgi Kochorashvili",8,"CM",26,"Levante","solid"),p("오타르 키테이슈빌리","Otar Kiteishvili",11,"CM",29,"Sturm Graz","solid",True),
  p("조르기 미카우타제","Georges Mikautadze",9,"ST",24,"Metz","star"),p("부두 지리","Budu Zivzivadze",19,"ST",31,"Karlsruher","solid"),
  p("주라브 키카바제","Zuriko Davitashvili",18,"LW",24,"Bordeaux","solid"),p("사바 로보차니제","Saba Lobzhanidze",14,"RW",30,"Atlanta United","solid"),
  p("아니 코바시제","Anzor Mekvabishvili",16,"CDM",23,"Universitatea Craiova","solid"),p("레반 셰그리다제","Levan Shengelia",20,"RW",29,"Panetolikos","fringe"),
  p("니카 카베키아","Nika Kvekveskiri",15,"CDM",33,"Lech Poznań","solid"),p("라티 셰리다","Lasha Dvali",13,"CB",30,"APOEL","solid"),
  p("기오르기 아부라제","Giorgi Aburjania",21,"CM",30,"Hatayspor","fringe"),p("바토 미카엘제","Vato Arveladze",22,"CAM",27,"Neftçi","fringe"),
]))

teams.append(T("핀란드","Finland","FIN","fi","UEFA",75,col("#003580","#FFFFFF","#003580"),"Helsinki Olympic Stadium",
 mgr("야코브 프리스","Jacob Friis","Denmark","수비적","4-4-2",2025),tac("4-4-2","defensive",6,5,5,"mixed",5),[
  p("루카스 흐라데키","Lukáš Hrádecký",1,"GK",35,"Bayer Leverkusen","star",True),p("제시 외르키","Jesse Joronen",12,"GK",32,"Venezia","solid"),p("빌레 비랄타","Viljami Sinisalo",23,"GK",23,"Aston Villa","fringe"),
  p("요나 토이비오","Jukka Raitala",2,"RB",36,"HJK","fringe"),p("니콜라이 알호","Nikolai Alho",3,"RB",32,"Asteras","solid"),
  p("파울루스 아라유리","Paulus Arajuuri",4,"CB",37,"HJK","fringe"),p("로베르트 이바노프","Robert Ivanov",5,"CB",31,"Eintracht Braunschweig","solid"),
  p("리하르드 옌센","Richard Jensen",6,"CB",24,"Aberdeen","solid"),p("일마리 니스칸","Ilmari Niskanen",17,"LB",27,"Dundee United","solid"),
  p("글렌 카마라","Glen Kamara",8,"CM",29,"Rennes","solid"),p("로베르트 테일러","Robert Taylor",11,"LW",30,"Inter Miami","solid"),
  p("테무 푸키","Teemu Pukki",9,"ST",35,"Minnesota United","star"),p("요엘 포흐얀팔로","Joel Pohjanpalo",19,"ST",30,"Venezia","star"),
  p("프레드릭 옌센","Fredrik Jensen",10,"CAM",27,"Augsburg","solid"),p("로비 우로넨","Robin Lod",14,"CM",32,"Minnesota United","solid"),
  p("올리버 안톨라","Oliver Antman",7,"RW",23,"Nordsjælland","solid"),p("다니엘 하칸스","Daniel Håkans",18,"LW",24,"Vålerenga","solid"),
  p("카안 카이리넨","Kaan Kairinen",16,"CM",26,"Sparta Prague","solid"),p("마티 페르툴라","Matti Peltola",15,"CDM",22,"DC United","solid"),
  p("투오마스 오야라","Tuomas Ollila",20,"LB",25,"Paris FC","solid"),p("아른 아르헨","Arttu Hoskonen",13,"CB",28,"Cracovia","solid"),
  p("벤야민 칼만","Benjamin Källman",21,"ST",27,"Cracovia","solid"),p("온니 발레카리","Onni Valakari",22,"CAM",25,"Pafos","solid"),
]))

teams.append(T("코소보","Kosovo","KVX","xk","UEFA",80,col("#244AA5","#D0A650","#FFFFFF"),"Fadil Vokrri Stadium",
 mgr("프랑코 포다","Franco Foda","Germany","균형","4-3-3",2024),tac("4-3-3","balanced",6,6,6,"mixed",6),[
  p("아리안트 무리치","Arijanet Murić",1,"GK",26,"Ipswich","star"),p("사미르 우카니","Samir Ujkani",12,"GK",37,"Empoli","fringe"),p("비스아르 세리피","Visar Bekaj",23,"GK",28,"Antalyaspor","fringe"),
  p("메르김 보지","Mergim Vojvoda",2,"RB",30,"Torino","solid"),p("피단 알리티","Fidan Aliti",4,"CB",31,"Alanyaspor","solid"),
  p("아미르 라흐마니","Amir Rrahmani",3,"CB",31,"Napoli","star",True),p("레르돈 베리샤","Lumbardh Dellova",5,"CB",26,"Rapid București","solid"),
  p("플로렌트 무슬라야","Florent Muslija",7,"CAM",26,"Paderborn","solid"),p("밀로트 라시차","Milot Rashica",8,"RW",29,"Beşiktaş","star"),
  p("베다르 사키리","Vedat Muriqi",9,"ST",31,"Fenerbahçe","star"),p("에디온 제그로바","Edon Zhegrova",10,"RW",26,"Lille","star"),
  p("비사르 무시우","Visar Musliu",6,"CB",30,"Paderborn","fringe"),p("이바르 마수리","Ibrahim Drešević",15,"CB",28,"Fatih Karagümrük","solid"),
  p("베사르 할리미","Besar Halimi",14,"CAM",31,"Sandhausen","fringe"),p("플로리안 루스테미","Florian Loshaj",16,"CM",28,"Cracovia","solid"),
  p("엘바산 라시티","Elbasan Rashani",11,"LW",32,"Clermont","solid"),p("알비온 리라","Albion Rrahmani",19,"ST",24,"Rapid București","solid"),
  p("레안드르 미시","Leard Sadriu",17,"CB",24,"Miedź","fringe"),p("돈 제릴","Donis Avdijaj",18,"CAM",28,"TSV Hartberg","solid"),
  p("유리 헤이지","Uriel Antuna",20,"RW",29,"Cruz Azul","fringe"),p("요나스 요한손","Ismet Lushaku",21,"CM",25,"AIK","solid"),
  p("아스트리트 셀마니","Astrit Selmani",22,"ST",28,"Hapoel Tel Aviv","solid"),p("레온 아브디야","Leon Abdyli",13,"LB",22,"Ballkani","fringe"),
]))
# Remove Uriel Antuna (Mexican) from Kosovo
teams[-1]["players"] = [x for x in teams[-1]["players"] if x["nameEn"] != "Uriel Antuna"] + [
  p("바론 베리샤","Valon Berisha",20,"CM",32,"Molde","solid"),
]

teams.append(T("이스라엘","Israel","ISR","il","UEFA",77,col("#0038B8","#FFFFFF","#0038B8"),"Bloomfield Stadium",
 mgr("란 벤 시몬","Ran Ben Shimon","Israel","균형","4-3-3",2024),tac("4-3-3","balanced",6,6,6,"short",6),[
  p("다니엘 페레츠","Daniel Peretz",1,"GK",24,"Bayern Munich","star"),p("오머 니라흐","Ofir Marciano",12,"GK",36,"Feyenoord","fringe"),p("요아브 게르피","Yoav Gerafi",23,"GK",31,"Maccabi Haifa","fringe"),
  p("엘리 다이","Eli Dasa",2,"RB",32,"Dynamo Moscow","solid"),p("로이 레비","Roy Revivo",3,"LB",22,"Maccabi Tel Aviv","solid"),
  p("미게 비토","Miguel Vítor",4,"CB",35,"Hapoel Be'er Sheva","solid"),p("라즈 슈로모","Raz Shlomo",5,"CB",26,"Maccabi Tel Aviv","solid"),
  p("다비드 쿠페르","David Keltjens",6,"CB",30,"Hapoel Be'er Sheva","fringe"),p("니르 비톤","Nir Bitton",8,"CDM",33,"Maccabi Tel Aviv","solid"),
  p("마노르 솔로몬","Manor Solomon",7,"LW",26,"Tottenham Hotspur","star"),p("오скар 글루흐","Oscar Gloukh",10,"CAM",21,"Red Bull Salzburg","star"),
  p("에란 자하비","Eran Zahavi",9,"ST",38,"Maccabi Tel Aviv","solid",True),p("도르 페레츠","Dor Peretz",14,"CM",30,"Maccabi Tel Aviv","solid"),
  p("타하 후세인","Mohammad Abu Fani",16,"CM",27,"Ferencváros","solid"),p("리엘 아부카시스","Gabi Kanichowsky",18,"CM",27,"Maccabi Tel Aviv","solid"),
  p("데니스 페로스","Dolev Haziza",11,"RW",29,"Maccabi Haifa","solid"),p("타이 바리보","Tai Baribo",19,"ST",27,"Philadelphia Union","solid"),
  p("요나탄 코헨","Yonatan Cohen",17,"ST",29,"Maccabi Tel Aviv","solid"),p("이단 나흐미아스","Idan Nachmias",15,"CB",28,"Maccabi Tel Aviv","solid"),
  p("세아브 데이안","Sean Goldberg",13,"CB",30,"Maccabi Haifa","solid"),p("라비브 다얀","Ramzi Safuri",20,"CAM",29,"Hapoel Be'er Sheva","solid"),
  p("아닐 바라시","Anan Khalaili",21,"RW",21,"Union Saint-Gilloise","solid"),p("라비브 슈리키","Lior Refaelov",22,"CAM",39,"Anderlecht","fringe"),
]))

teams.append(T("몬테네그로","Montenegro","MNE","me","UEFA",83,col("#C40308","#FFD100","#C40308"),"Podgorica City Stadium",
 mgr("미오드라그 라둘로비치","Miodrag Radulović","Montenegro","균형","4-2-3-1",2023),tac("4-2-3-1","balanced",6,6,5,"mixed",5),[
  p("밀란 미야토비치","Milan Mijatović",1,"GK",38,"Budućnost","solid"),p("이반 야보비치","Ivan Nikčević",12,"GK",27,"Sutjeska","fringe"),p("파블레 벨리미로비치","Pavle Vulić",23,"GK",25,"Dečić","fringe"),
  p("아담 마리치","Adam Marušić",2,"RB",32,"Lazio","star",True),p("이고르 부키시치","Igor Vujačić",4,"CB",31,"Rubin Kazan","solid"),
  p("마르코 시미치","Marko Simić",5,"CB",38,"Budućnost","fringe"),p("스테판 사비치","Stefan Savić",3,"CB",34,"Trabzonspor","star"),
  p("조반 크르스토비치","Žarko Tomašević",6,"CB",35,"Kosovo club","fringe"),p("마르코 베시나","Marko Vešović",17,"RB",33,"Qarabağ","solid"),
  p("니콜라 부크사노비치","Nikola Vukčević",8,"CDM",33,"Al-Ahli","solid"),p("블라디미르 요보비치","Vladimir Jovović",10,"CAM",30,"Jablonec","solid"),
  p("스테판 무기사","Stefan Mugoša",9,"ST",32,"Incheon United","solid"),p("마르코 요보비치","Marko Janković",11,"CM",29,"Qarabağ","solid"),
  p("두산 라디치","Driton Camaj",7,"LW",28,"Kisvárda","solid"),p("밀로시 라이코비치","Miloš Raičković",14,"CM",28,"Budućnost","solid"),
  p("니콜라 크르스토비치","Nikola Krstović",19,"ST",24,"Lecce","star"),p("우로시 주라코비치","Uroš Đuranović",18,"ST",31,"Slaven Belupo","solid"),
  p("안드리야 야노비치","Andrija Janjić",15,"CB",24,"Budućnost","fringe"),p("블라디미르 볼코프","Vladimir Boljević",16,"CM",36,"Budućnost","fringe"),
  p("알렉산다르 시체비치","Aleksandar Šćekić",13,"CDM",33,"Železničar","fringe"),p("세아드 하크살라","Sead Hakšabanović",20,"LW",26,"St. Pauli","solid"),
  p("일리야 부크셰비치","Ilija Vukotić",21,"CM",26,"Boavista","solid"),p("마르코 바키치","Marko Bakić",22,"CM",31,"Farul","solid"),
]))

teams.append(T("불가리아","Bulgaria","BUL","bg","UEFA",88,col("#FFFFFF","#00966E","#D62612"),"Vasil Levski Stadium",
 mgr("일리얀 일리예프","Iliyan Iliev","Bulgaria","균형","4-2-3-1",2023),tac("4-2-3-1","balanced",6,6,6,"mixed",5),[
  p("다니엘 나우모프","Daniel Naumov",1,"GK",27,"CSKA 1948","solid"),p("이반 듀로프","Ivan Dyulgerov",12,"GK",26,"Cherno More","fringe"),p("스베토슬라프 부디노프","Svetoslav Vutsov",23,"GK",23,"Slavia Sofia","fringe"),
  p("안톤 네디알코프","Anton Nedyalkov",3,"LB",32,"Ludogorets","solid",True),p("발레리 보지노프","Valentin Antov",4,"CB",24,"Cremonese","solid"),
  p("크리스티안 디미트로프","Kristian Dimitrov",5,"CB",28,"Hajduk Split","solid"),p("페타르 잠보프","Petar Zanev",6,"CB",40,"retired","fringe"),
  p("키릴 데스포도프","Kiril Despodov",7,"RW",28,"PAOK","star"),p("마르틴 미노프","Martin Minchev",9,"ST",24,"Çaykur Rizespor","solid"),
  p("토도르 네델레프","Todor Nedelev",10,"CAM",32,"Botev Plovdiv","solid"),p("게오르기 밀라노프","Georgi Milanov",8,"CM",33,"Al-Ittihad Kalba","fringe"),
  p("일리안 일리예프","Ilian Iliev Jr",11,"CAM",25,"Cherno More","solid"),p("키릴 코스테프","Kiril Despodov2",14,"CM",26,"Ludogorets","fringe"),
  p("안드레이 갈라비노프","Andrey Galabinov",19,"ST",36,"Spezia","fringe"),p("알렉산다르 코레브","Aleksandar Kolev",18,"ST",32,"Levski Sofia","solid"),
  p("이바일로 초체프","Ivaylo Chochev",16,"CM",32,"CSKA 1948","solid"),p("야니스 카라벨로프","Yanis Karabelyov",15,"CM",29,"Beroe","solid"),
  p("조르지 아타나소프","Georgi Atanasov",17,"RB",24,"Botev Plovdiv","fringe"),p("스트라힐 포포프","Strahil Popov",2,"RB",35,"Hatayspor","fringe"),
  p("빅토르 게네프","Viktor Genev",13,"CB",36,"Slavia Sofia","fringe"),p("마린 페트코프","Marin Petkov",20,"ST",21,"Levski Sofia","solid"),
  p("필리프 크르스테프","Filip Krastev",21,"CM",23,"Levski Sofia","solid"),p("리안 비데프","Rian Bidev",22,"LW",22,"Ludogorets","fringe"),
]))
# Fix duplicate Despodov2
for pl in teams[-1]["players"]:
  if pl["nameEn"]=="Kiril Despodov2":
    pl["name"]="일리야 그루에프"; pl["nameEn"]="Iliya Gruev"; pl["club"]="Werder Bremen"; pl["position"]="CDM"

teams.append(T("벨라루스","Belarus","BLR","by","UEFA",98,col("#009739","#CE1126","#FFFFFF"),"Dinamo Stadium Minsk",
 mgr("카를로스 알로스","Carlos Alós","Spain","수비적","4-4-2",2024),tac("4-4-2","defensive",5,5,5,"long",4),[
  p("안드레이 쿠드라이페츠","Andrey Kudravets",1,"GK",22,"BATE","solid"),p("세르게이 체르니크","Sergey Chernik",12,"GK",37,"Dinamo Minsk","fringe"),p("파벨 파블류첸코","Pavel Pavlyuchenko",23,"GK",27,"Shakhtyor","fringe"),
  p("막심 발리츠키","Maksim Valadzko",2,"RB",32,"BATE","solid"),p("니키타 나우모프","Nikita Naumov",4,"CB",35,"Isloch","fringe"),
  p("자하르 볼코프","Zakhar Volkov",5,"CB",28,"Khimki","solid"),p("데니스 폴야코프","Denis Polyakov",3,"CB",34,"Dinamo Minsk","solid"),
  p("유리 파브류코프","Yuri Kovalev",6,"LB",32,"BATE","solid"),p("막심 스카비슈","Maksim Skavysh",9,"ST",35,"Torpedo-BelAZ","solid"),
  p("블라디슬라프 클리모비치","Vladislav Klimovich",8,"CM",28,"Dinamo Minsk","solid"),p("드미트리 파블류케비치","Dmitry Podstrelov",10,"CAM",26,"Torpedo","solid"),
  p("비탈리 리사코비치","Vitali Lisakovich",11,"ST",27,"Rubin Kazan","solid",True),p("예브게니 야블론스키","Yevgeniy Yablonskiy",14,"CDM",30,"Dinamo Minsk","solid"),
  p("니키타 코롤류크","Nikita Korzun",16,"CM",30,"Dinamo Minsk","solid"),p("파벨 세브체프","Pavel Savitskiy",7,"LW",33,"Neman","solid"),
  p("아르템 비주스","Artsyom Bykau",17,"CM",34,"Shakhtyor","fringe"),p("세르게이 폴리스케비치","Sergey Politevich",15,"CB",35,"Dinamo Minsk","fringe"),
  p("드미트리 베스프료프","Dzmitry Bespamyatnykh",18,"ST",26,"Isloch","fringe"),p("로만 유제프스키","Roman Yuzepchuk",19,"RB",26,"Kryvbas","solid"),
  p("안드레이 솔로베이","Andrey Solovey",20,"ST",28,"Torpedo-BelAZ","solid"),p("일리야 바실리예프","Ilya Vasilevich",21,"CM",24,"Dinamo Brest","fringe"),
  p("알렉세이 류시크","Aleksey Rios",13,"RB",38,"retired","fringe"),p("예고르 보그모로프","Yegor Bogomolov",22,"LW",23,"BATE","fringe"),
]))

teams.append(T("룩셈부르크","Luxembourg","LUX","lu","UEFA",94,col("#00A1DE","#ED2939","#FFFFFF"),"Stade de Luxembourg",
 mgr("뤽 홀츠","Luc Holtz","Luxembourg","수비적","4-4-2",2010),tac("4-4-2","defensive",5,5,5,"mixed",4),[
  p("안토니 모리스","Anthony Moris",1,"GK",35,"Union Saint-Gilloise","star",True),p("랄프 겐스","Ralph Gietl",12,"GK",28,"Progrès","fringe"),p("티모 일링","Timothy Martin",23,"GK",24,"Virton","fringe"),
  p("로랑 야스크","Laurent Jans",2,"RB",33,"Waldhof Mannheim","solid"),p("막심 샤넬","Maxime Chanot",4,"CB",35,"AC Ajaccio","solid"),
  p("디르크 칼슨","Dirk Carlson",5,"CB",27,"ADO Den Haag","solid"),p("엔스 파비오","Enes Mahmutovic",3,"CB",28,"Swift Hesperange","solid"),
  p("세바스티앙 티요","Sébastien Thill",10,"CM",31,"Stal Rzeszów","solid"),p("크리스토퍼 마르틴스","Christopher Martins",8,"CDM",28,"Spartak Moscow","star"),
  p("쥐엘 로드리게스","Gerson Rodrigues",9,"ST",30,"Sivasspor","star"),p("다니엘 신아니","Danel Sinani",7,"CAM",28,"St. Pauli","solid"),
  p("빈센트 티요","Vincent Thill",11,"CAM",25,"Sabah FK","solid"),p("레안드로 바레이로","Leandro Barreiro",16,"CM",25,"Benfica","star"),
  p("미셀 핀토","Mica Pinto",17,"LB",32,"Sparta Rotterdam","solid"),p("야닉 보겔","Yannick Borges",14,"RB",27,"Progrès","fringe"),
  p("알다이르 아드제","Aldaír Adão",18,"ST",27,"Unao","fringe"),p("에드빈 아르테스가","Edvin Muratovic",19,"ST",28,"Swift","fringe"),
  p("올리비에 티요","Olivier Thill",20,"CM",28,"Eyüpspor","solid"),p("마틴 마르티노비치","Mathias Olesen",15,"CM",24,"Köln","solid"),
  p("플러드 피르크스","Florian Bohnert",6,"RB",27,"Bastia","solid"),p("알도스 올리베라","Aldin Skenderovic",13,"CB",28,"Progrès","solid"),
  p("제임스 키르히","James Obiang",21,"CM",24,"F91 Dudelange","fringe"),p("세미르 미칸","Samir Mikanovic",22,"LW",23,"Racing FC","fringe"),
]))

teams.append(T("아르메니아","Armenia","ARM","am","UEFA",100,col("#D90012","#0033A0","#F2A800"),"Republican Stadium",
 mgr("바르단 미나샹","Vardan Minasyan","Armenia","균형","4-3-3",2024),tac("4-3-3","balanced",6,6,6,"mixed",5),[
  p("스탄니슬라프 부토린","Stanislav Buchnev",1,"GK",34,"Pyunik","solid"),p("헨리흐 므히타랸","Henrikh Mkhitaryan",10,"CAM",36,"Inter Milan","star",True),
  p("타론 보그잔","Taron Voskanyan",2,"RB",32,"Alashkert","fringe"),p("발마니 아르타크","Varazdat Haroyan",4,"CB",33,"Astana","solid"),
  p("호브한네스 하브타낙얀","Hovhannes Hambardzumyan",3,"RB",34,"Anorthosis","fringe"),p("안드레아스 우무다","Andréas Hountondji",5,"CB",28,"Ararat-Armenia","fringe"),
  p("카렌 무라드얀","Kamo Hovhannisyan",6,"LB",32,"Astana","solid"),p("에드가 말라티안","Edgar Malakyan",8,"CM",34,"Alashkert","fringe"),
  p("루카스 자카리안","Lucas Zelarayán",7,"CAM",33,"Columbus Crew","star"),p("그란트 카샤예프","Grant-Leon Ranos",9,"ST",22,"Borussia Mönchengladbach","solid"),
  p("소르말 바라즈얀","Sargis Adamyan",11,"ST",32,"Köln","solid"),p("아트빌리 바라즈얀","Artel Barsaghian",14,"CM",24,"Pyunik","fringe"),
  p("나이리 티키르얀","Nair Tiknizyan",17,"LB",25,"Lokomotiv Moscow","solid"),p("에드가 세베키안","Edgar Sevikyan",18,"RW",24,"Lokomotiv Moscow","solid"),
  p("우미트 바르다얀","Ugochukwu Iwu",16,"CDM",25,"Rubin Kazan","solid"),p("타론 보그잔2","Tigran Barseghyan",19,"RW",31,"Astana","solid"),
  p("아람 코차랸","Aram Karamyan",15,"CB",27,"Urartu","fringe"),p("다비드 마나시안","David Davidyan",20,"CM",26,"Pyunik","fringe"),
  p("아르만 호브세피안","Arman Hovhannisyan",13,"CB",31,"Alashkert","fringe"),p("게보르그 므히타랸","Gevorg Mkrtchyan",21,"ST",23,"Van","fringe"),
  p("사르키스 샤흐베디안","Sargis Shahinyan",22,"CM",29,"Alashkert","fringe"),p("안드레이 아바기안","Andrejs Cigaņiks",12,"LB",28,"Widzew","fringe"),
  p("흐라치야 아베티샨","Hrachya Avetisyan",23,"GK",26,"Urartu","fringe"),
]))
# Fix Latvia player mistakenly in Armenia
teams[-1]["players"] = [x for x in teams[-1]["players"] if x["nameEn"] != "Andrejs Cigaņiks"] + [
  p("바헤 무라디안","Vahagn Hayrapetyan",12,"LB",28,"Ararat-Armenia","fringe"),
]
# Fix fake Brazilian CB
for pl in teams[-1]["players"]:
  if "Hountondji" in pl["nameEn"]:
    pl["name"]="스타스 포고스얀"; pl["nameEn"]="Stas Poyarkov"; pl["club"]="Pyunik"; pl["age"]=27

teams.append(T("에스토니아","Estonia","EST","ee","UEFA",110,col("#0072CE","#000000","#FFFFFF"),"A. Le Coq Arena",
 mgr("위르겐 헨","Jürgen Henn","Estonia","수비적","5-3-2",2024),tac("5-3-2","defensive",5,5,5,"long",4),[
  p("칼 헤인","Karl Hein",1,"GK",23,"Arsenal","star"),p("마트베이 이고로프","Matvei Igorov",12,"GK",26,"Flora","fringe"),p("칼 안드레 발리마에","Karl-Romet Nõmm",23,"GK",27,"Paide","fringe"),
  p("말로니 메츠","Marten Kuusk",2,"CB",29,"Újpest","solid"),p("카르로 페트","Karol Mets",4,"CB",32,"Zürich","solid",True),
  p("마크 안데르스 소우프","Maksim Paskotši",5,"CB",22,"Grasshoppers","solid"),p("요세프 살리스테","Joseph Saliste",3,"LB",30,"Paide","solid"),
  p("마티아스 카이토","Mattias Käit",8,"CM",26,"Rapid București","solid"),p("콘스탄틴 바실리예프","Konstantin Vassiljev",10,"CAM",41,"Flora","fringe"),
  p("라이노 사프","Ragnar Klavan",6,"CB",39,"retired","fringe"),p("헨리 아니에르","Henri Anier",9,"ST",34,"Muangthong","solid"),
  p("라아우노 사피넨","Rauno Sappinen",11,"ST",29,"Flora","solid"),p("세르게이 제니오프","Sergei Zenjov",7,"RW",36,"Flora","fringe"),
  p("마르쿠스 포옴","Markus Poom",14,"CM",26,"Flora","solid"),p("블라디슬라프 크레이다","Vladislav Kreida",16,"CDM",25,"Flora","solid"),
  p("케빈 칸노","Kevin Kanno",17,"RB",24,"Levadia","fringe"),p("탐베트 후사르","Tambet Husaar",18,"LB",23,"Nõmme Kalju","fringe"),
  p("에리크 사르","Erik Sorga",19,"ST",25,"DC United","solid"),p("야콥 피사레프","Jakob Pissarev",15,"CM",22,"Flora","fringe"),
  p("켄네스 칼리우스테","Ken Kallaste",13,"LB",36,"Flora","fringe"),p("안드레아스 바이젠","Andreas Vaher",20,"CB",21,"Flora","fringe"),
  p("로만 야쿠프","Roman Zahharšenko",21,"ST",24,"Paide","fringe"),p("마르틴 베트","Martin Vetkal",22,"CM",21,"Flora","fringe"),
]))

teams.append(T("키프로스","Cyprus","CYP","cy","UEFA",115,col("#D4762C","#FFFFFF","#D4762C"),"GSP Stadium",
 mgr("테미스토클리스 포카","Temur Ketsbaia","Georgia","균형","4-2-3-1",2024),tac("4-2-3-1","balanced",6,6,6,"mixed",5),[
  p("네오피토스 미카엘","Neofytos Michael",1,"GK",31,"Anorthosis","solid"),p("요아니스 피타스","Ioannis Pittas",9,"ST",28,"AIK","star",True),
  p("니콜라스 이오아누","Nicholas Ioannou",3,"LB",29,"Como","solid"),p("콘스탄티노스 라이피스","Konstantinos Laifis",4,"CB",32,"Standard Liège","solid"),
  p("안드레아스 카로","Andreas Karo",5,"CB",28,"Maccabi Petah Tikva","solid"),p("안데르손 코레이아","Anderson Correia",2,"LB",28,"Anorthosis","solid"),
  p("그리가리스 카스틸라스","Grigoris Kastanos",8,"CM",27,"Salernitana","solid"),p("이오안니스 코우수로스","Ioannis Kousoulos",6,"CDM",29,"Omonia","solid"),
  p("말로리 마타","Charalampos Charalambous",10,"CAM",25,"Omonia","solid"),p("안드레아스 흐리소스","Andreas Chrysostomou",14,"CM",24,"Anorthosis","fringe"),
  p("피로스 소티리우","Pieros Sotiriou",11,"ST",32,"APOEL","solid"),p("마르쿠스 로덴","Marinos Tzionis",7,"LW",24,"Čukarički","solid"),
  p("로리스 카리우","Loizos Loizou",17,"RW",24,"Omonia","solid"),p("안드레스 마카리스","Andreas Makris",19,"ST",29,"AEL","fringe"),
  p("크리스토스 셰카","Christos Shelis",15,"CB",25,"Volos","solid"),p("스텔리오스 안드레우","Stelios Andreou",13,"CB",22,"Charleroi","solid"),
  p("미나스 안토니우","Minas Antoniou",18,"RB",31,"AEK Larnaca","solid"),p("이오안니스 코스탈로스","Ioannis Kostalos",16,"CM",23,"Aris","fringe"),
  p("안드로스 판텔리","Andros Panteli",20,"GK",27,"Apollon","fringe"),p("니콜라스 파나지오토우","Nikolas Panayiotou",21,"CB",25,"Omonia","solid"),
  p("안드레아스 아브라미스","Andreas Avraam",22,"LB",36,"retired","fringe"),p("요르고스 에프스타티우","Giorgos Efstatthiou",12,"GK",24,"AEK Larnaca","fringe"),
  p("하리스 마브리아스","Charis Mavrias",23,"RW",31,"Apollon","fringe"),
]))

teams.append(T("페로 제도","Faroe Islands","FRO","fo","UEFA",130,col("#0065A8","#FFFFFF","#ED2939"),"Tórsvøllur",
 mgr("헤그누르 아브라함센","Håkan Ericson","Sweden","수비적","4-4-2",2024),tac("4-4-2","defensive",5,4,5,"long",3),[
  p("마트티아스 람","Mattias Lamhauge",1,"GK",25,"Fredericia","solid"),p("군나르 닐센","Gunnar Nielsen",12,"GK",38,"FH","fringe"),p("테아투르 시소우손","Teitur Gestsson",23,"GK",33,"HB","fringe"),
  p("빌요름르 다비센","Viljormur Davidsen",3,"LB",33,"HB","solid",True),p("구드리 한센","Gilli Sørensen",2,"RB",33,"NSÍ","fringe"),
  p("오드마르 페어","Odmar Færø",4,"CB",35,"KÍ","solid"),p("손니 한센","Sonni Nattestad",5,"CB",30,"B36","solid"),
  p("브란두르 헨드릭손","Brandur Hendriksson",8,"CM",29,"Fredrikstad","solid"),p("메인하르드 올센","Meinhard Olsen",7,"CAM",28,"KÍ","solid"),
  p("클레멘스 안드레아스","Klæmint Olsen",9,"ST",34,"NSÍ","solid"),p("요안 시문 에드문손","Jóan Símun Edmundsson",10,"ST",33,"Beveren","solid"),
  p("페투르 크누트센","Petur Knudsen",11,"ST",27,"NSÍ","solid"),p("아르니 프레데릭스베르그","Árni Frederiksberg",17,"RW",33,"KÍ","solid"),
  p("게오르기 다니엘센","Geza Davidsen",14,"CM",25,"HB","fringe"),p("한니 소르스테인손","Hannes Agnarsson",16,"CM",26,"B36","fringe"),
  p("안드레아스 올센","Andreas Olsen",18,"CB",27,"Víkingur","fringe"),p("요한 요한센","Jóhan Troest Davidsen",6,"CB",37,"NSÍ","fringe"),
  p("굴루르 베트라손","Gullur Vestursson",15,"LB",24,"KÍ","fringe"),p("라그너 요엔센","Ragnar Joensen",19,"CM",23,"HB","fringe"),
  p("파트릭 요한센","Patrik Johannesen",20,"ST",29,"B36","solid"),p("소에렌 바르탈센","Sølvi Vatnhamar",21,"CAM",38,"Víkingur","fringe"),
  p("한누스 한센","Hannus Hansen",13,"GK",22,"KÍ","fringe"),p("비르니르 야콥센","Bárður á Reynatrøð",22,"RB",25,"HB","fringe"),
]))

teams.append(T("아제르바이잔","Azerbaijan","AZE","az","UEFA",120,col("#00B5E2","#EF3340","#509E2F"),"Tofiq Bahramov Stadium",
 mgr("페르난도 무스레라","Fernando Musa","Brazil","수비적","5-3-2",2024),tac("5-3-2","defensive",5,5,5,"long",4),[
  p("샤흐루딘 마흐마마디예프","Shahrudin Mahammadaliyev",1,"GK",31,"Qarabağ","solid"),p("살라흐딘 사흐라딜리","Salahat Aghayev",12,"GK",34,"Sabah","fringe"),p("유시프 마메달리예프","Yusif Mammadaliyev",23,"GK",26,"Neftçi","fringe"),
  p("바흘 마메도프","Bahlul Mustafazade",4,"CB",28,"Qarabağ","solid"),p("바딜 잘리예프","Badavi Hüseynov",5,"CB",34,"Qarabağ","solid"),
  p("엘빈 자파로프","Elvin Jafarguliyev",3,"LB",24,"Qarabağ","solid"),p("타발 바예라모프","Toral Bayramov",2,"RB",24,"Qarabağ","solid"),
  p("에민 마흐무도프","Emin Mahmudov",8,"CM",33,"Neftçi","solid",True),p("리차르드 알메이다","Richard Almeida",10,"CAM",36,"Qarabağ","fringe"),
  p("레나트 다다쇼프","Renat Dadashov",9,"ST",26,"Hatayspor","solid"),p("마히르 엠렐리","Mahir Emreli",11,"ST",28,"Dinamo Zagreb","solid"),
  p("압둘라 악시즈","Abdulla Abdullayev",6,"CB",23,"Qarabağ","fringe"),p("오잔 알리예프","Ozan Can Kökçü",7,"CAM",26,"Erzurumspor","fringe"),
  p("무사 구르바노프","Musa Gurbanli",19,"ST",23,"Qarabağ","solid"),p("나라이만 아흐마도프","Nariman Akhundzade",18,"ST",21,"Qarabağ","solid"),
  p("아딜 나기예프","Adil Naghiyev",14,"CB",29,"Sabah","fringe"),p("잘랄 후세이노프","Jalal Huseynov",15,"CB",22,"Arda","solid"),
  p("존니 실바","Jonny Silva",16,"CM",25,"Sabah","fringe"),p("압둘셀람 아브두라흐마노프","Joshgun Diniyev",17,"CM",30,"Zira","solid"),
  p("루슬란 구르바노프","Ruslan Gurbanov",20,"ST",33,"Kapaz","fringe"),p("아크신 고르바노프","Azer Aliyev",13,"LB",31,"Neftçi","fringe"),
  p("일킨 무라도프","Ilkin Muradov",21,"CDM",28,"Turan Tovuz","fringe"),p("에민 람다노프","Emin Ramazanov",22,"RW",24,"Sumgayit","fringe"),
]))
# Fix manager for AZE - use known coach
teams[-1]["manager"] = mgr("페르난도 산토스","Fernando Santos","Portugal","수비적","4-3-3",2024)

save("europe_d", teams)
print("europe_d", len(teams))
