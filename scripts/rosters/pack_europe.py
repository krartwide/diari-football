#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""All UEFA teams for the required set."""
import sys
sys.path.insert(0, "/workspace/scripts/rosters")
from packlib import p, mgr, tac, col, T, save

teams = []

teams.append(T("스페인","Spain","ESP","es","UEFA",1,col("#C60B1E","#F1BF00","#FFFFFF"),"Estadio Santiago Bernabéu",
 mgr("루이스 데 라 푸엔테","Luis de la Fuente","Spain","점유율","4-3-3",2022),tac("4-3-3","attacking",8,8,7,"short",8),[
  p("우나이 시몬","Unai Simón",1,"GK",28,"Athletic Club","star"),p("다비드 라야","David Raya",13,"GK",30,"Arsenal","solid"),p("로버트 산체스","Robert Sánchez",23,"GK",27,"Chelsea","fringe"),
  p("다니 카르바할","Dani Carvajal",2,"RB",33,"Real Madrid","solid"),p("페드로 포로","Pedro Porro",12,"RB",26,"Tottenham Hotspur","solid"),
  p("파우 쿠바르시","Pau Cubarsí",5,"CB",18,"Barcelona","star"),p("로빈 레 노름망","Robin Le Normand",3,"CB",29,"Atlético Madrid","star"),p("다니 비비안","Dani Vivian",4,"CB",26,"Athletic Club","solid"),p("아이메릭 라포르테","Aymeric Laporte",14,"CB",31,"Al-Nassr","solid"),
  p("마르크 쿠쿠레야","Marc Cucurella",17,"LB",27,"Chelsea","solid"),p("알레한드로 그리말도","Alejandro Grimaldo",15,"LB",30,"Bayer Leverkusen","solid"),
  p("로드리","Rodri",16,"CDM",29,"Manchester City","star",True),p("마르틴 수비멘디","Martín Zubimendi",18,"CDM",26,"Arsenal","star"),
  p("페드리","Pedri",20,"CM",23,"Barcelona","star"),p("가비","Gavi",9,"CM",21,"Barcelona","star"),p("파비안 루이스","Fabián Ruiz",8,"CM",29,"Paris Saint-Germain","solid"),p("미켈 메리노","Mikel Merino",6,"CM",29,"Arsenal","solid"),
  p("다니 올모","Dani Olmo",10,"CAM",27,"Barcelona","star"),p("라민 야말","Lamine Yamal",19,"RW",18,"Barcelona","star"),p("니코 윌리암스","Nico Williams",11,"LW",23,"Athletic Club","star"),
  p("페란 토레스","Ferran Torres",7,"ST",25,"Barcelona","solid"),p("미켈 오야르사발","Mikel Oyarzabal",21,"ST",28,"Real Sociedad","solid"),p("알바로 모라타","Álvaro Morata",22,"ST",33,"Como","solid"),
],1))

teams.append(T("프랑스","France","FRA","fr","UEFA",3,col("#002395","#FFFFFF","#ED2939"),"Stade de France",
 mgr("디디에 데샹","Didier Deschamps","France","수비적","4-2-3-1",2012),tac("4-2-3-1","balanced",7,7,6,"mixed",6),[
  p("마이크 메냥","Mike Maignan",16,"GK",30,"AC Milan","star"),p("브리스 삼바","Brice Samba",1,"GK",31,"Lens","solid"),p("알퐁스 아레올라","Alphonse Areola",23,"GK",32,"West Ham United","fringe"),
  p("쥘 쿤데","Jules Koundé",5,"RB",27,"Barcelona","star"),p("벵자맹 파바르","Benjamin Pavard",2,"RB",29,"Inter Milan","solid"),
  p("윌리엄 살리바","William Saliba",17,"CB",24,"Arsenal","star"),p("다요 우파메카노","Dayot Upamecano",4,"CB",27,"Bayern Munich","solid"),p("이브라히마 코나테","Ibrahima Konaté",15,"CB",26,"Liverpool","solid"),p("루카스 에르난데스","Lucas Hernández",21,"CB",29,"Paris Saint-Germain","solid"),
  p("테오 에르난데스","Theo Hernández",22,"LB",28,"AC Milan","star"),
  p("아우렐리앙 추아메니","Aurélien Tchouaméni",8,"CDM",25,"Real Madrid","star"),p("은골로 캉테","N'Golo Kanté",13,"CDM",34,"Al-Ittihad","solid"),
  p("에두아르도 카마빙가","Eduardo Camavinga",6,"CM",23,"Real Madrid","star"),p("아드리앙 라비오","Adrien Rabiot",14,"CM",30,"Marseille","solid"),p("워렌 자이르에메리","Warren Zaïre-Emery",18,"CM",19,"Paris Saint-Germain","solid"),
  p("앙투안 그리즈만","Antoine Griezmann",7,"CAM",34,"Atlético Madrid","star"),
  p("킬리안 음바페","Kylian Mbappé",10,"ST",27,"Real Madrid","star",True),p("우스만 뎀벨레","Ousmane Dembélé",11,"RW",28,"Paris Saint-Germain","star"),p("마이클 올리스","Michael Olise",12,"RW",24,"Bayern Munich","star"),
  p("브래들리 바르콜라","Bradley Barcola",20,"LW",23,"Paris Saint-Germain","solid"),p("킹슬리 코망","Kingsley Coman",19,"LW",29,"Bayern Munich","solid"),
  p("마르쿠스 튀람","Marcus Thuram",9,"ST",28,"Inter Milan","solid"),p("랑달 콜로 무아니","Randal Kolo Muani",25,"ST",27,"Juventus","solid"),
],2))

teams.append(T("잉글랜드","England","ENG","gb-eng","UEFA",4,col("#FFFFFF","#000066","#CF081F"),"Wembley Stadium",
 mgr("토마스 투헬","Thomas Tuchel","Germany","압박형","4-2-3-1",2025),tac("4-2-3-1","attacking",8,7,7,"short",7),[
  p("조던 픽포드","Jordan Pickford",1,"GK",31,"Everton","star"),p("딘 헨더슨","Dean Henderson",13,"GK",28,"Crystal Palace","solid"),p("제임스 트래포드","James Trafford",22,"GK",23,"Manchester City","fringe"),
  p("카일 워커","Kyle Walker",2,"RB",35,"Manchester City","solid"),p("리즈 제임스","Reece James",24,"RB",26,"Chelsea","star"),p("트렌트 알렉산더아놀드","Trent Alexander-Arnold",66,"RB",27,"Real Madrid","star"),
  p("존 스톤스","John Stones",5,"CB",31,"Manchester City","star"),p("마크 게히","Marc Guéhi",6,"CB",25,"Crystal Palace","star"),p("리바이 콜윌","Levi Colwill",14,"CB",22,"Chelsea","solid"),p("해리 매과이어","Harry Maguire",15,"CB",32,"Manchester United","solid"),
  p("루크 쇼","Luke Shaw",3,"LB",30,"Manchester United","solid"),
  p("디클란 라이스","Declan Rice",4,"CDM",26,"Arsenal","star"),p("주드 벨링엄","Jude Bellingham",10,"CM",22,"Real Madrid","star"),p("코비 마이누","Kobbie Mainoo",16,"CM",20,"Manchester United","solid"),p("콘어 갤러거","Conor Gallagher",8,"CM",25,"Atlético Madrid","solid"),
  p("필 포든","Phil Foden",11,"CAM",25,"Manchester City","star"),p("콜 파머","Cole Palmer",20,"CAM",23,"Chelsea","star"),p("에베레치 에제","Eberechi Eze",18,"CAM",27,"Arsenal","solid"),
  p("부카요 사카","Bukayo Saka",7,"RW",24,"Arsenal","star"),p("앤서니 고든","Anthony Gordon",19,"LW",24,"Newcastle United","solid"),p("자로드 보웬","Jarrod Bowen",21,"RW",29,"West Ham United","solid"),
  p("해리 케인","Harry Kane",9,"ST",32,"Bayern Munich","star",True),p("올리 왓킨스","Ollie Watkins",17,"ST",29,"Aston Villa","solid"),
],1))

teams.append(T("포르투갈","Portugal","POR","pt","UEFA",6,col("#FF0000","#006600","#FFFF00"),"Estádio da Luz",
 mgr("로베르토 마르티네스","Roberto Martínez","Spain","균형","4-3-3",2023),tac("4-3-3","attacking",7,7,7,"short",7),[
  p("디오구 코스타","Diogo Costa",1,"GK",26,"Porto","star"),p("호세 사","José Sá",12,"GK",32,"Wolverhampton","solid"),p("루이 실바","Rui Silva",22,"GK",31,"Betis","fringe"),
  p("주앙 칸셀루","João Cancelo",20,"RB",31,"Al-Hilal","solid"),p("디오고 달로트","Diogo Dalot",2,"RB",26,"Manchester United","solid"),
  p("루벤 디아스","Rúben Dias",4,"CB",28,"Manchester City","star",True),p("안토니우 실바","António Silva",3,"CB",22,"Benfica","solid"),p("곤살루 이나시우","Gonçalo Inácio",14,"CB",24,"Sporting CP","solid"),p("다니루 페레이라","Danilo Pereira",13,"CB",34,"Al-Ittihad","fringe"),
  p("누누 멘데스","Nuno Mendes",19,"LB",23,"Paris Saint-Germain","star"),
  p("비티냐","Vitinha",16,"CM",25,"Paris Saint-Germain","star"),p("주앙 네베스","João Neves",15,"CDM",21,"Paris Saint-Germain","star"),p("루벤 네베스","Rúben Neves",18,"CDM",28,"Al-Hilal","solid"),p("마테우스 누네스","Matheus Nunes",6,"CM",27,"Manchester City","solid"),
  p("브루노 페르난데스","Bruno Fernandes",8,"CAM",31,"Manchester United","star"),p("베르나르두 실바","Bernardo Silva",10,"RW",31,"Manchester City","star"),
  p("하파엘 레앙","Rafael Leão",17,"LW",26,"AC Milan","star"),p("페드루 네투","Pedro Neto",11,"RW",25,"Chelsea","solid"),p("프란시스쿠 콘세이상","Francisco Conceição",21,"RW",22,"Juventus","solid"),
  p("크리스티아누 호날두","Cristiano Ronaldo",7,"ST",40,"Al-Nassr","star"),p("곤살루 하무스","Gonçalo Ramos",9,"ST",24,"Paris Saint-Germain","solid"),p("디오구 조타","Diogo Jota",23,"ST",28,"Liverpool","solid"),p("히카르두 오르타","Ricardo Horta",5,"CAM",31,"Braga","fringe"),
]))

teams.append(T("네덜란드","Netherlands","NED","nl","UEFA",7,col("#FF6600","#FFFFFF","#000000"),"Johan Cruijff Arena",
 mgr("로널드 쿠만","Ronald Koeman","Netherlands","공격적","4-3-3",2023),tac("4-3-3","attacking",7,8,8,"short",7),[
  p("바르트 페를브뤼헌","Bart Verbruggen",1,"GK",23,"Brighton","star"),p("마르크 플레컨","Mark Flekken",13,"GK",32,"Bayer Leverkusen","solid"),p("로빈 룰센","Robin Roefs",23,"GK",22,"Sunderland","fringe"),
  p("덴절 둠프리스","Denzel Dumfries",22,"RB",29,"Inter Milan","star"),p("예레미 프림퐁","Jericho Frimpong",12,"RWB",24,"Bayer Leverkusen","solid"),
  p("버질 반데이크","Virgil van Dijk",4,"CB",34,"Liverpool","star",True),p("마테이스 더리흐트","Matthijs de Ligt",3,"CB",26,"Manchester United","star"),p("위르리엔 팀버","Jurriën Timber",5,"CB",24,"Arsenal","solid"),p("미키 판더펜","Micky van de Ven",15,"CB",24,"Tottenham Hotspur","star"),
  p("네이선 아케","Nathan Aké",6,"LB",30,"Manchester City","solid"),p("퀼린츠히 하르트만","Quilindschy Hartman",17,"LB",24,"Feyenoord","solid"),
  p("프렌키 더용","Frenkie de Jong",21,"CM",28,"Barcelona","star"),p("티자니 레인더스","Tijjani Reijnders",14,"CM",27,"AC Milan","star"),p("라이언 흐라벤베르흐","Ryan Gravenberch",8,"CDM",23,"Liverpool","star"),p("예르디 스하우턴","Jerdy Schouten",16,"CDM",28,"PSV","solid"),
  p("사비 시몬스","Xavi Simons",7,"CAM",22,"RB Leipzig","star"),p("조이 페이르만","Joey Veerman",20,"CM",27,"PSV","solid"),
  p("코디 학포","Cody Gakpo",11,"LW",26,"Liverpool","star"),p("스티븐 베르흐베인","Steven Bergwijn",18,"LW",28,"Ajax","solid"),p("노아 랑","Noa Lang",19,"LW",26,"PSV","solid"),
  p("멤피스 데파이","Memphis Depay",10,"ST",31,"Corinthians","solid"),p("바우트 베흐호르스트","Wout Weghorst",9,"ST",33,"Ajax","solid"),p("브리안 브로비","Brian Brobbey",25,"ST",23,"Ajax","solid"),
]))

teams.append(T("벨기에","Belgium","BEL","be","UEFA",8,col("#000000","#FDDA25","#EF3340"),"King Baudouin Stadium",
 mgr("루디 가르시아","Rudi Garcia","France","균형","4-2-3-1",2025),tac("4-2-3-1","attacking",6,7,7,"short",6),[
  p("코앙 카스텔스","Koen Casteels",1,"GK",33,"Al-Qadsiah","star"),p("마츠 셀스","Matz Sels",13,"GK",33,"Nottingham Forest","solid"),p("토마 카민스키","Thomas Kaminski",12,"GK",33,"Charleroi","fringe"),
  p("티모시 카스타뉴","Timothy Castagne",21,"RB",29,"Fulham","solid"),p("토마 뫼니에","Thomas Meunier",15,"RB",34,"Trabzonspor","fringe"),
  p("바우터 파스","Wout Faes",4,"CB",27,"Leicester City","solid"),p("아르튀르 테아트","Arthur Theate",3,"CB",25,"Eintracht Frankfurt","solid"),p("조아킴 안데르센","Joachim Andersen",2,"CB",29,"Fulham","solid"),p("얀 베르통언","Jan Vertonghen",5,"CB",38,"Anderlecht","solid"),
  p("막심 드 카위퍼","Maxim De Cuyper",22,"LB",24,"Club Brugge","solid"),
  p("아마두 오나나","Amadou Onana",6,"CDM",24,"Aston Villa","star"),p("유리 틸레만스","Youri Tielemans",8,"CM",28,"Aston Villa","star"),p("케빈 더 브라위너","Kevin De Bruyne",7,"CAM",34,"Napoli","star",True),p("오렐 망갈라","Orel Mangala",18,"CDM",27,"Lyon","solid"),
  p("샤를 더케텔라르","Charles De Ketelaere",10,"CAM",24,"Atalanta","solid"),p("제레미 도쿠","Jérémy Doku",11,"LW",23,"Manchester City","star"),p("르안드로 트로사르","Leandro Trossard",17,"LW",30,"Arsenal","solid"),
  p("요한 바카요코","Johan Bakayoko",19,"RW",22,"PSV","solid"),p("알렉시스 살레마커스","Alexis Saelemaekers",16,"RM",26,"Roma","solid"),
  p("로멜루 루카쿠","Romelu Lukaku",9,"ST",32,"Napoli","star"),p("로이스 오펜다","Lois Openda",23,"ST",25,"RB Leipzig","star"),p("미시 바추아이","Michy Batshuayi",20,"ST",32,"Eintracht Frankfurt","fringe"),p("드리스 메르텐스","Dries Mertens",14,"CAM",38,"Galatasaray","fringe"),
]))

teams.append(T("독일","Germany","GER","de","UEFA",9,col("#FFFFFF","#000000","#DD0000"),"Allianz Arena",
 mgr("율리안 나겔스만","Julian Nagelsmann","Germany","압박형","4-2-3-1",2023),tac("4-2-3-1","attacking",9,8,7,"short",8),[
  p("마누엘 노이어","Manuel Neuer",1,"GK",39,"Bayern Munich","star"),p("마르크앙드레 테어 슈테겐","Marc-André ter Stegen",22,"GK",33,"Barcelona","solid"),p("알렉산더 뉘벨","Alexander Nübel",12,"GK",29,"Stuttgart","fringe"),
  p("요슈아 키미히","Joshua Kimmich",6,"RB",30,"Bayern Munich","star",True),p("벤야민 헨리히스","Benjamin Henrichs",2,"RB",28,"RB Leipzig","solid"),
  p("안토니오 뤼디거","Antonio Rüdiger",2,"CB",32,"Real Madrid","star"),p("요나탄 타","Jonathan Tah",4,"CB",29,"Bayer Leverkusen","star"),p("니코 슐로터베크","Nico Schlotterbeck",23,"CB",26,"Borussia Dortmund","solid"),p("발데마르 안톤","Waldemar Anton",14,"CB",29,"Borussia Dortmund","solid"),
  p("다비트 라움","David Raum",3,"LB",27,"RB Leipzig","solid"),p("막시밀리안 미텔슈테트","Maximilian Mittelstädt",18,"LB",28,"Stuttgart","solid"),
  p("파스칼 그로스","Pascal Groß",8,"CM",34,"Borussia Dortmund","solid"),p("로베르트 안드리히","Robert Andrich",16,"CDM",31,"Bayer Leverkusen","solid"),p("알레크스 그리말도","Aleksandar Pavlović",5,"CDM",21,"Bayern Munich","star"),
  p("플로리안 비르츠","Florian Wirtz",17,"CAM",22,"Bayer Leverkusen","star"),p("자말 무시알라","Jamal Musiala",10,"CAM",22,"Bayern Munich","star"),p("일카이 귄도안","İlkay Gündoğan",21,"CM",35,"Manchester City","solid"),
  p("레로이 사네","Leroy Sané",19,"RW",29,"Bayern Munich","star"),p("세르주 그나브리","Serge Gnabry",7,"RW",30,"Bayern Munich","solid"),p("카이 하베르츠","Kai Havertz",9,"ST",26,"Arsenal","star"),
  p("니클라스 ürüle","Niclas Füllkrug",11,"ST",32,"West Ham United","solid"),p("데니스 운다프","Deniz Undav",13,"ST",29,"Stuttgart","solid"),p("막시밀리안 바이어","Maximilian Beier",15,"ST",23,"Borussia Dortmund","solid"),
]))

teams.append(T("크로아티아","Croatia","CRO","hr","UEFA",10,col("#FF0000","#FFFFFF","#171796","checkered"),"Stadion Maksimir",
 mgr("즐라트코 달리치","Zlatko Dalić","Croatia","균형","4-2-3-1",2017),tac("4-2-3-1","balanced",6,6,6,"short",6),[
  p("도미니크 리바코비치","Dominik Livaković",1,"GK",30,"Fenerbahçe","star"),p("이보르 판다리치","Ivica Ivušić",12,"GK",30,"Pafos","solid"),p("네딜코 라브로비치","Nediljko Labrović",23,"GK",26,"Rijeka","fringe"),
  p("요시프 스타니시치","Josip Stanišić",2,"RB",25,"Bayern Munich","solid"),p("요시프 유라노비치","Josip Juranović",22,"RB",30,"Union Berlin","solid"),
  p("요슈코 그바르디올","Joško Gvardiol",4,"CB",23,"Manchester City","star"),p("요시프 슈타로","Josip Šutalo",5,"CB",25,"Ajax","solid"),p("마르틴 에를리치","Martin Erlić",21,"CB",27,"Bologna","solid"),p("도마고이 비다","Domagoj Vida",15,"CB",36,"AEK Athens","fringe"),
  p("보르나 소리","Borna Sosa",19,"LB",27,"Ajax","solid"),p("보르나 바리시치","Borna Barišić",3,"LB",33,"Trabzonspor","fringe"),
  p("루카 모드리치","Luka Modrić",10,"CM",39,"AC Milan","star",True),p("마테오 코바치치","Mateo Kovačić",8,"CM",31,"Manchester City","star"),p("마르셀로 브로조비치","Marcelo Brozović",11,"CDM",32,"Al-Nassr","solid"),p("로브로 마예르","Lovro Majer",7,"CM",27,"Wolfsburg","solid"),
  p("니콜라 블라시치","Nikola Vlašić",13,"CAM",27,"Torino","solid"),p("마리오 파샬리치","Mario Pašalić",18,"CM",29,"Atalanta","solid"),
  p("루카 수시치","Luka Sučić",16,"CM",23,"Real Sociedad","solid"),p("안드레 이 페트코비치","Andrej Kramarić",9,"ST",34,"Hoffenheim","star"),
  p("이반 페리시치","Ivan Perišić",14,"LW",36,"Hajduk Split","solid"),p("안테 부디미르","Ante Budimir",17,"ST",34,"Osasuna","solid"),p("마르코 피야차","Marko Pjaca",20,"LW",30,"Rijeka","fringe"),p("브루노 페트코비치","Bruno Petković",9,"ST",31,"Dinamo Zagreb","solid"),
]))

teams.append(T("이탈리아","Italy","ITA","it","UEFA",12,col("#0066CC","#FFFFFF","#009246"),"Stadio Olimpico",
 mgr("루치아노 스팔레티","Luciano Spalletti","Italy","점유율","4-3-3",2023),tac("4-3-3","balanced",7,7,6,"short",7),[
  p("잔루이지 돈나룸마","Gianluigi Donnarumma",1,"GK",26,"Paris Saint-Germain","star",True),p("알렉산드로 부옹iorno","Alex Meret",12,"GK",28,"Napoli","solid"),p("구글리엘모 비카리오","Guglielmo Vicario",13,"GK",29,"Tottenham Hotspur","solid"),
  p("조반니 디로렌초","Giovanni Di Lorenzo",2,"RB",32,"Napoli","star"),p("다비데 칼라브리아","Davide Calabria",22,"RB",29,"AC Milan","fringe"),
  p("알레산드로 바스토니","Alessandro Bastoni",5,"CB",26,"Inter Milan","star"),p("프란체스코 아체르비","Francesco Acerbi",15,"CB",37,"Inter Milan","solid"),p("리카르도 칼라피오리","Riccardo Calafiori",4,"CB",23,"Arsenal","star"),p("잔루카 만치니","Gianluca Mancini",3,"CB",29,"Roma","solid"),
  p("페데리코 디마르코","Federico Dimarco",14,"LB",28,"Inter Milan","star"),p("데스티니 우도기","Destiny Udogie",17,"LB",23,"Tottenham Hotspur","solid"),
  p("니콜로 바렐라","Nicolò Barella",18,"CM",28,"Inter Milan","star"),p("요르겐 스킬레","Jorginho",8,"CDM",34,"Arsenal","solid"),p("마누엘 로카텔리","Manuel Locatelli",16,"CDM",27,"Juventus","solid"),p("다비데 프라테시","Davide Frattesi",10,"CM",25,"Inter Milan","solid"),
  p("로렌초 펠레그리니","Lorenzo Pellegrini",11,"CAM",29,"Roma","solid"),p("니콜로 피올라","Nicolò Fagioli",21,"CM",24,"Juventus","solid"),
  p("페데리코 키에사","Federico Chiesa",7,"RW",28,"Liverpool","star"),p("도메니코 베라르디","Domenico Berardi",19,"RW",31,"Sassuolo","solid"),p("지아코모 라스파도리","Giacomo Raspadori",20,"ST",25,"Napoli","solid"),
  p("마테오 레텔루이","Mateo Retegui",9,"ST",26,"Atalanta","star"),p("모이세 킨","Moise Kean",23,"ST",25,"Fiorentina","solid"),p("스테판 엘샤라위","Stephan El Shaarawy",6,"LW",33,"Roma","fringe"),
]))

teams.append(T("스위스","Switzerland","SUI","ch","UEFA",17,col("#FF0000","#FFFFFF","#FF0000"),"St. Jakob-Park",
 mgr("무라트 야킨","Murat Yakin","Switzerland","수비적","4-2-3-1",2021),tac("4-2-3-1","defensive",6,5,5,"mixed",5),[
  p("그레고르 코벨","Gregor Kobel",1,"GK",27,"Borussia Dortmund","star"),p("얀 조머","Yann Sommer",12,"GK",36,"Inter Milan","solid"),p("이본 음보모","Yvonne Mbumbu",21,"GK",30,"Young Boys","fringe"),
  p("실반 비드머","Silvan Widmer",3,"RB",32,"Mainz","solid"),p("케빈 음바부","Kevin Mbabu",2,"RB",30,"FC Augsburg","fringe"),
  p("마누엘 아칸지","Manuel Akanji",5,"CB",30,"Manchester City","star"),p("니코 엘베디","Nico Elvedi",4,"CB",29,"Borussia Mönchengladbach","solid"),p("파비안 셰어","Fabian Schär",22,"CB",34,"Newcastle United","solid"),p("베아트 아칸지","Bećir Omeragić",15,"CB",23,"Montpellier","fringe"),
  p("리카르도 로드리게스","Ricardo Rodríguez",13,"LB",33,"Betis","solid"),p("울리세스 가르시아","Ulisses Garcia",17,"LB",29,"Olympique Marseille","solid"),
  p("그라니트 자카","Granit Xhaka",10,"CM",32,"Bayer Leverkusen","star",True),p("레모 프로일러","Remo Freuler",8,"CDM",33,"Bologna","solid"),p("미셸 아에비셔","Michel Aebischer",16,"CM",28,"Bologna","solid"),p("지브릴 소우","Djibril Sow",6,"CM",28,"Sevilla","solid"),
  p("제르단 샤치리","Xherdan Shaqiri",23,"CAM",34,"Chicago Fire","fringe"),p("빈센트 자시","Vincent Sierro",18,"CM",29,"Toulouse","solid"),
  p("루벤 바르가스","Ruben Vargas",17,"LW",27,"FC Augsburg","solid"),p("단 은도예","Dan Ndoye",19,"RW",24,"Bologna","solid"),p("브렐 엠볼로","Breel Embolo",9,"ST",28,"Monaco","star"),
  p("노아 오카포르","Noah Okafor",11,"ST",25,"AC Milan","solid"),p("자이라 체친","Zeki Amdouni",7,"ST",25,"Burnley","solid"),p("크리스찬 파스우드","Christian Fassnacht",14,"RM",32,"Young Boys","fringe"),
]))

# Continue in pack_europe_b via exec
print("europe A", len(teams))
save("europe_a", teams)
