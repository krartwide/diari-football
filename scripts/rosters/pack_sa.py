#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
sys.path.insert(0, "/workspace/scripts/rosters")
from packlib import p, mgr, tac, col, T, save
from compact import sq

teams = []

teams.append(T("아르헨티나","Argentina","ARG","ar","CONMEBOL",2,col("#75AADB","#FFFFFF","#75AADB","stripes"),"Estadio Monumental",
 mgr("리오넬 스칼로니","Lionel Scaloni","Argentina","균형","4-3-3",2018),tac("4-3-3","balanced",7,7,6,"short",6),[
  p("에밀리아노 마르티네스","Emiliano Martínez",23,"GK",33,"Aston Villa","star"),p("헤罗尼모 룰리","Gerónimo Rulli",12,"GK",33,"Marseille","solid"),p("프랑코 아르마니","Franco Armani",1,"GK",38,"River Plate","fringe"),
  p("나우엘 몰리나","Nahuel Molina",2,"RB",27,"Atlético Madrid","star"),p("곤살로 몬티엘","Gonzalo Montiel",4,"RB",28,"Sevilla","solid"),
  p("크리스티안 로메로","Cristian Romero",13,"CB",27,"Tottenham Hotspur","star"),p("니콜라스 오타멘디","Nicolás Otamendi",19,"CB",37,"Benfica","solid"),p("리산드로 마르티네스","Lisandro Martínez",25,"CB",27,"Manchester United","star"),p("헤르만 페스체야","Germán Pezzella",6,"CB",34,"Betis","fringe"),
  p("니콜라스 타글리아피코","Nicolás Tagliafico",3,"LB",32,"Lyon","solid"),p("마르코스 아쿠냐","Marcos Acuña",8,"LB",34,"Sevilla","solid"),
  p("로드리고 데 파울","Rodrigo De Paul",7,"CM",31,"Atlético Madrid","star"),p("엔소 페르난데스","Enzo Fernández",24,"CM",24,"Chelsea","star"),p("알렉시스 맥 알리스터","Alexis Mac Allister",20,"CM",26,"Liverpool","star"),
  p("레안드로 파레데스","Leandro Paredes",5,"CDM",31,"Roma","solid"),p("히오바니 로셀소","Giovani Lo Celso",16,"CAM",29,"Betis","solid"),
  p("리오넬 메시","Lionel Messi",10,"RW",38,"Inter Miami","star",True),p("앙헬 디 마리아","Ángel Di María",11,"RW",37,"Benfica","solid"),
  p("훌리안 알바레스","Julián Álvarez",9,"ST",25,"Atlético Madrid","star"),p("라우타로 마르티네스","Lautaro Martínez",22,"ST",28,"Inter Milan","star"),
  p("니콜라스 곤살레스","Nicolás González",15,"LW",27,"Juventus","solid"),p("알레한드로 가르나초","Alejandro Garnacho",17,"LW",21,"Manchester United","solid"),p("티아고 알마다","Thiago Almada",21,"CAM",24,"Botafogo","solid"),
],3))

teams.append(T("브라질","Brazil","BRA","br","CONMEBOL",5,col("#FFDF00","#009C3B","#002776"),"Maracanã",
 mgr("카를로 안첼로티","Carlo Ancelotti","Italy","점유율","4-3-3",2025),tac("4-3-3","attacking",7,8,7,"short",7),[
  p("알리송","Alisson",1,"GK",32,"Liverpool","star"),p("에디르손","Ederson",23,"GK",32,"Manchester City","star"),p("브레노","Bento",12,"GK",26,"Athletico","solid"),
  p("단일로","Danilo",2,"RB",34,"Flamengo","solid"),p("비니시우스","Vini Jr",7,"LW",25,"Real Madrid","star"),
  p("마키니오스","Marquinhos",4,"CB",31,"Paris Saint-Germain","star",True),p("가브리엘 마갈량이스","Gabriel Magalhães",3,"CB",27,"Arsenal","star"),p("브레메르","Bremer",14,"CB",28,"Juventus","solid"),
  p("아르카스","Alex Sandro",6,"LB",34,"Flamengo","fringe"),p("카를로스","Carlos Augusto",16,"LB",26,"Inter Milan","solid"),
  p("카세미루","Casemiro",5,"CDM",33,"Manchester United","solid"),p("브루노 기마라에스","Bruno Guimarães",8,"CM",27,"Newcastle United","star"),
  p("조엘린통","Joelinton",18,"CM",29,"Newcastle United","solid"),p("안드레","André",17,"CDM",24,"Wolverhampton","solid"),
  p("호드리구","Rodrygo",10,"RW",24,"Real Madrid","star"),p("하피냐","Raphinha",11,"RW",28,"Barcelona","star"),
  p("엔드리크","Endrick",9,"ST",19,"Real Madrid","star"),p("히샤를리송","Richarlison",19,"ST",28,"Tottenham Hotspur","solid"),
  p("사비오","Sávio",20,"RW",21,"Manchester City","star"),p("루카스 파케타","Lucas Paquetá",15,"CAM",28,"West Ham United","star"),
  p("가브리엘 제주스","Gabriel Jesus",21,"ST",28,"Arsenal","solid"),p("벤투란","Douglas Luiz",22,"CM",27,"Juventus","solid"),p("야니크","Yan Couto",13,"RB",23,"Dortmund","solid"),
],5))

teams.append(T("콜롬비아","Colombia","COL","co","CONMEBOL",13,col("#FCD116","#003893","#CE1126"),"Estadio Metropolitano",
 mgr("네스토르 로렌소","Néstor Lorenzo","Argentina","균형","4-2-3-1",2022),tac("4-2-3-1","balanced",7,6,6,"mixed",6),[
  p("카밀로 바르가스","Camilo Vargas",1,"GK",36,"Atlas","solid"),p("알리손 베커","Álvaro Montero",12,"GK",30,"Millonarios","solid"),p("다비드 오스피나","David Ospina",13,"GK",36,"Atlético Nacional","fringe"),
  p("다니엘 무뇨스","Daniel Muñoz",2,"RB",29,"Crystal Palace","star"),p("산티아고 아리아스","Santiago Arias",4,"RB",33,"Cincinnati","fringe"),
  p("다빈손 산체스","Davinson Sánchez",3,"CB",29,"Galatasaray","star"),p("예리 미나","Yerry Mina",5,"CB",30,"Cagliari","solid"),p("카를로스 쿠에스타","Carlos Cuesta",6,"CB",26,"Genk","solid"),
  p("요한 모히카","Johan Mojica",17,"LB",32,"Villarreal","solid"),p("데일리 산토스","Deiver Machado",16,"LB",31,"Lens","solid"),
  p("제페르손 리바르마","Jefferson Lerma",8,"CDM",30,"Crystal Palace","solid"),p("리차르드 리오스","Richard Ríos",10,"CM",25,"Palmeiras","star"),
  p("하메스 로드리게스","James Rodríguez",11,"CAM",34,"Rayo Vallecano","solid"),p("루이스 디아스","Luis Díaz",7,"LW",28,"Liverpool","star"),
  p("하메스","Jhon Arias",18,"RW",27,"Fluminense","star"),p("라파엘 산토스 보레","Rafael Santos Borré",9,"ST",30,"SC Internacional","solid"),
  p("후안 페르난도 킨테로","Juan Fernando Quintero",14,"CAM",32,"Racing","solid"),p("미겔 보르하","Miguel Borja",19,"ST",32,"River Plate","solid"),
  p("하르데르 바레라","Jader Valencia",20,"ST",25,"Millonarios","fringe"),p("케빈 카스타뇨","Kevin Castaño",15,"CDM",24,"Cruz Azul","solid"),
  p("후안 쿠아드라도","Juan Cuadrado",21,"RW",36,"retired","fringe"),p("윌마르 바라호스","Wilmar Barrios",22,"CDM",31,"Zenit","solid",True),p("카밀로 바르가스2","Kevin Mier",23,"GK",25,"Cruz Azul","solid"),
]))

teams.append(T("우루과이","Uruguay","URU","uy","CONMEBOL",16,col("#0038A8","#FFFFFF","#0038A8"),"Estadio Centenario",
 mgr("마르셀로 비엘사","Marcelo Bielsa","Argentina","압박형","3-4-2-1",2023),tac("3-4-2-1","attacking",10,8,5,"mixed",8),[
  p("세르히오 로체토","Sergio Rochet",1,"GK",32,"Bahia","solid"),p("페르난도 무슬레라","Fernando Muslera",12,"GK",39,"Galatasaray","fringe"),p("산티아고 메레","Santiago Mele",23,"GK",28,"Junior","fringe"),
  p("나우엘 아라우호","Nahitan Nández",2,"RWB",29,"Cagliari","solid"),p("호세 마리아 히메네스","José María Giménez",3,"CB",30,"Atlético Madrid","star",True),
  p("로날드 아라우호","Ronald Araujo",4,"CB",26,"Barcelona","star"),p("세바스티안 코아테스","Sebastián Coates",5,"CB",35,"Sporting CP","solid"),
  p("마틸라스 올리베라","Mathías Olivera",16,"LWB",27,"Napoli","star"),p("마테오 비냐","Matías Viña",17,"LWB",27,"Flamengo","solid"),
  p("페데리코 발베르데","Federico Valverde",7,"CM",27,"Real Madrid","star"),p("마누엘 우가르테","Manuel Ugarte",8,"CDM",24,"Manchester United","star"),
  p("로드리고 벤탄쿠르","Rodrigo Bentancur",6,"CM",28,"Tottenham Hotspur","solid"),p("니콜라스 데 라 크루스","Nicolás de la Cruz",10,"CM",28,"Flamengo","solid"),
  p("다르윈 누녜스","Darwin Núñez",9,"ST",26,"Liverpool","star"),p("막시밀리아노 고메스","Maxi Gómez",18,"ST",29,"Trabzonspor","solid"),
  p("브라이언 로드리게스","Brian Rodríguez",11,"LW",25,"América","solid"),p("파쿠스 아길라르","Facundo Pellistri",19,"RW",23,"Granada","solid"),
  p("히오르그안 데아라스카에타","Giorgian de Arrascaeta",14,"CAM",31,"Flamengo","star"),p("루이스 수아레스","Luis Suárez",9,"ST",38,"Inter Miami","fringe"),
  p("세바스티안 보가시안","Sebastián Bogusz",15,"CM",22,"Defensor","fringe"),p("기예르모 바레다","Guillermo Varela",13,"RB",32,"Flamengo","solid"),
  p("루카스 토레이라","Lucas Torreira",20,"CDM",29,"Galatasaray","solid"),p("아구스틴 카노비오","Agustín Canobbio",21,"RW",26,"Athletico","solid"),
],2))

teams.append(T("에콰도르","Ecuador","ECU","ec","CONMEBOL",23,col("#FFD100","#0073CF","#FFD100"),"Estadio Rodrigo Paz Delgado",
 mgr("세바스티안 베카세세","Sebastián Beccacece","Argentina","압박형","4-4-2",2024),tac("4-4-2","attacking",8,7,6,"mixed",7),[
  p("에르난 갈린데스","Hernán Galíndez",1,"GK",38,"Huracán","solid"),p("알렉산더 도밍게스","Alexander Domínguez",12,"GK",38,"LDU Quito","fringe"),p("모이세스 라미레스","Moisés Ramírez",22,"GK",25,"Independiente del Valle","fringe"),
  p("펠리 카이세도","Félix Torres",3,"CB",28,"Corinthians","solid"),p("피에로 이나피에","Piero Hincapié",4,"CB",23,"Bayer Leverkusen","star"),
  p("윌러 파초","Willian Pacho",5,"CB",24,"Paris Saint-Germain","star"),p("로베르트 아르보레다","Robert Arboleda",6,"CB",33,"São Paulo","solid"),
  p("페르비스 에스타피노","Pervis Estupiñán",2,"LB",27,"Brighton","star"),p("안헤로 프레시아도","Ángelo Preciado",17,"RB",27,"Sparta Prague","solid"),
  p("모이세스 카이세도","Moisés Caicedo",8,"CDM",24,"Chelsea","star",True),p("카를로스 그루에소","Carlos Gruezo",14,"CDM",30,"San Jose Earthquakes","solid"),
  p("알란 프랑코","Alan Franco",16,"CM",26,"Atlético Mineiro","solid"),p("호세 시푸엔테스","José Cifuentes",15,"CM",26,"Cruzeiro","solid"),
  p("켄디 로드리게스","Kendry Páez",10,"CAM",18,"Chelsea","star"),p("곤살로 플라타","Gonzalo Plata",11,"RW",24,"Flamengo","solid"),
  p("엔네르 발렌시아","Enner Valencia",9,"ST",36,"Internacional","solid"),p("케빈 로드리게스","Kevin Rodríguez",19,"ST",25,"Union Saint-Gilloise","solid"),
  p("제레미 사르멘토","Jeremy Sarmiento",7,"LW",23,"Brighton","solid"),p("존 야보","John Yeboah",18,"RW",25,"Rakow","solid"),
  p("알레한드로 카베사스","Alejandro Cabezas",20,"ST",24,"Independiente del Valle","fringe"),p("안헬 메나","Ángel Mena",21,"RW",37,"Pachuca","fringe"),
  p("잭슨 포로소","Jackson Porozo",13,"CB",25,"Troyes","solid"),p("조르디 알시바르","Jordy Alcívar",23,"CM",25,"Independiente del Valle","solid"),
]))

teams.append(T("파라과이","Paraguay","PAR","py","CONMEBOL",39,col("#D52B1E","#FFFFFF","#0038A8"),"Estadio Defensores del Chaco",
 mgr("구스타보 알파로","Gustavo Alfaro","Argentina","수비적","4-4-2",2024),tac("4-4-2","defensive",7,5,5,"mixed",5),[
  p("로베르토 페르난데스","Roberto Fernández",1,"GK",37,"Cerro Porteño","solid"),p("안토니 실바","Antony Silva",12,"GK",41,"Nacional","fringe"),p("카를로스 코로넬","Carlos Coronel",22,"GK",28,"New York Red Bulls","solid"),
  p("구스타보 고메스","Gustavo Gómez",3,"CB",32,"Palmeiras","star",True),p("주니오르 알론소","Junior Alonso",4,"CB",32,"Atlético Mineiro","solid"),
  p("파비안 발부에나","Fabián Balbuena",5,"CB",33,"Corinthians","solid"),p("오마르 아데르","Omar Alderete",6,"CB",28,"Getafe","solid"),
  p("로베르토 페르난데스","Robert Rojas",2,"RB",29,"River Plate","solid"),p("미겔 알미론","Miguel Almirón",10,"RW",31,"Newcastle United","star"),
  p("안드레스 쿠비사스","Andrés Cubas",8,"CDM",29,"Vancouver Whitecaps","solid"),p("마티아스 로하스","Matías Rojas",11,"CAM",29,"Inter Miami","solid"),
  p("훌리오 엔시소","Julio Enciso",7,"CAM",21,"Brighton","star"),p("디에고 고메스","Diego Gómez",16,"CM",22,"Inter Miami","solid"),
  p("안토니오 산브리아","Antonio Sanabria",9,"ST",29,"Torino","solid"),p("아담 바레로","Adam Bareiro",19,"ST",28,"San Lorenzo","solid"),
  p("라몬 소사","Ramón Sosa",17,"LW",25,"Nottingham Forest","solid"),p("알렉시스 두아르테","Alexis Duarte",14,"CB",25,"Spartak Moscow","solid"),
  p("블라스 리베로스","Blas Riveros",15,"LB",27,"Talleres","solid"),p("네스토르 알마다","Néstor Almada",18,"ST",24,"Cerro Porteño","fringe"),
  p("마우리시오 두비노","Mauricio Dubinovski",20,"CM",23,"Libertad","fringe"),p("산티아고 아르살레스","Santiago Arzamendia",13,"LB",27,"Cerro Porteño","solid"),
  p("로베르토 디아즈","Ángel Romero",21,"ST",33,"Corinthians","solid"),p("카를로스 파파","Carlos Paredes",23,"CDM",24,"Olimpia","fringe"),
]))

teams.append(T("베네수엘라","Venezuela","VEN","ve","CONMEBOL",48,col("#FFCC00","#CF142B","#00247D"),"Estadio Olímpico Caracas",
 mgr("페르난도 바티스타","Fernando Batista","Argentina","균형","4-2-3-1",2024),tac("4-2-3-1","balanced",6,6,6,"mixed",5),[
  p("우페 에르난데스","Wuilker Faríñez",1,"GK",27,"Lens","solid"),p("라파엘 로모","Rafael Romo",12,"GK",35,"Universidad Católica","fringe"),p("호엘 그라테롤","Joel Graterol",22,"GK",27,"América de Cali","fringe"),
  p("로날드 에르난데스","Ronald Hernández",2,"RB",28,"Atlanta United","solid"),p("예르페르손 카스트로","Yordan Osorio",4,"CB",31,"Parma","solid"),
  p("나우엘 페라레스","Nahuel Ferraresi",5,"CB",26,"São Paulo","solid"),p("미겔 나바로","Miguel Navarro",3,"LB",26,"Talleres","solid"),
  p("토마스 링콘","Tomás Rincón",8,"CDM",37,"Santos","solid",True),p("예페르손 사바리노","Yeferson Soteldo",7,"LW",28,"Santos","star"),
  p("살로몬 론돈","Salomón Rondón",9,"ST",36,"Pachuca","solid"),p("요세프 마르티네스","Josef Martínez",11,"ST",32,"Montreal","solid"),
  p("제페르손 사바리노","Jefferson Savarino",10,"CAM",28,"Botafogo","star"),p("에두아르도 에레라","Eduard Bello",17,"RW",30,"Mazatlán","solid"),
  p("크리스티안 카셀레스","Cristian Cásseres Jr",16,"CM",25,"Toulouse","solid"),p("후안피 아리오르카","Juanpi Añor",18,"CAM",31,"Caracas","fringe"),
  p("요나탄 오소리오","Jon Aramburu",14,"RB",22,"Real Sociedad","solid"),p("알렉산데르 곤살레스","Alexander González",15,"RB",32,"Caracas","fringe"),
  p("다리오 로드리게스","Darwin Machís",19,"LW",32,"Valladolid","solid"),p("세르히오 코르도바","Sergio Córdova",20,"ST",28,"Alanyaspor","solid"),
  p("후안파블로 아뇨르","José Herrera",13,"CB",25,"Caracas","fringe"),p("루이스 마고","Luis Mago",6,"CB",30,"Universidad de Chile","solid"),
  p("로미 가르시아","Rommell Ibarra",21,"CDM",25,"Deportivo La Guaira","fringe"),p("안데르손 콘트레라스","Anderson Contreras",23,"CM",24,"Caracas","fringe"),
]))

teams.append(T("칠레","Chile","CHI","cl","CONMEBOL",53,col("#D52B1E","#FFFFFF","#0039A6"),"Estadio Nacional",
 mgr("리카르도 가레카","Ricardo Gareca","Argentina","공격적","4-3-3",2024),tac("4-3-3","attacking",7,7,6,"mixed",6),[
  p("클라우디오 브라보","Claudio Bravo",1,"GK",42,"retired","fringe"),p("브리안 코르테스","Brayan Cortés",12,"GK",30,"Colo-Colo","solid"),p("가브리엘 아리아스","Gabriel Arias",23,"GK",37,"Racing","solid"),
  p("기예르모 마립","Guillermo Maripán",3,"CB",31,"Monaco","star"),p("파울로 디아스","Paulo Díaz",4,"CB",31,"River Plate","solid"),
  p("가리 메델","Gary Medel",5,"CB",38,"Boca Juniors","fringe"),p("에우헤니오 메나","Eugenio Mena",2,"LB",36,"Universidad Católica","fringe"),
  p("마우리시오 이슬라","Mauricio Isla",6,"RB",37,"Universidad Católica","fringe"),p("아르투로 비달","Arturo Vidal",8,"CM",38,"Colo-Colo","fringe"),
  p("찰스 아랑기스","Charles Aránguiz",10,"CM",36,"Internacional","solid",True),p("에리크 풀가르","Erick Pulgar",14,"CDM",31,"Flamengo","solid"),
  p("알렉시스 산체스","Alexis Sánchez",7,"ST",36,"Udinese","star"),p("에두아르도 바르가스","Eduardo Vargas",9,"ST",35,"Atlético Mineiro","solid"),
  p("벤하민 비쿠냐","Benjamín Vidal",15,"CB",29,"Universidad de Chile","fringe"),p("마르셀로 디아스","Marcelo Díaz",16,"CDM",38,"Universidad de Chile","fringe"),
  p("다르윈 누녜스","Darío Osorio",11,"RW",21,"Midtjylland","star"),p("비타르 메나","Víctor Dávila",17,"ST",27,"CSKA Moscow","solid"),
  p("디에고 발데스","Diego Valdés",18,"CAM",31,"América","solid"),p("토마스 알라르콘","Tomás Alarcón",19,"CDM",26,"Cádiz","solid"),
  p("알렉산데르 아랑기스","Alexander Aravena",20,"LW",22,"Grêmio","solid"),p("루이스 로하스","Luis Rojas",21,"CAM",23,"Crotone","fringe"),
  p("니콜라스 카스티요","Nicolás Castillo",22,"ST",32,"retired","fringe"),p("세바스티안 베가스","Sebastián Vegas",13,"CB",28,"Monterrey","solid"),
]))

teams.append(T("페루","Peru","PER","pe","CONMEBOL",52,col("#D91023","#FFFFFF","#D91023"),"Estadio Nacional Lima",
 mgr("호르헤 포스","Jorge Fossati","Uruguay","수비적","5-3-2",2024),tac("5-3-2","defensive",6,5,5,"long",4),[
  p("페드로 가예세","Pedro Gallese",1,"GK",35,"Orlando City","star",True),p("카를로스 카세도","Carlos Cáceda",12,"GK",33,"Melgar","fringe"),p("호세 카르바할","José Carvallo",23,"GK",39,"Universidad César Vallejo","fringe"),
  p("루이스 아브람","Luis Abram",3,"CB",29,"Atlanta United","solid"),p("카를로스 사모라노","Carlos Zambrano",4,"CB",36,"Alianza Lima","solid"),
  p("알렉산데르 칼리엔스","Alexander Callens",5,"CB",33,"AEK Larnaca","solid"),p("미겔 트라우코","Miguel Trauco",6,"LB",33,"Criciúma","solid"),
  p("루이스 아드빈쿨라","Luis Advíncula",2,"RB",35,"Boca Juniors","solid"),p("페드로 아퀴노","Pedro Aquino",8,"CDM",30,"Santos","solid"),
  p("레나토 타피아","Renato Tapia",10,"CDM",29,"Celta","solid"),p("크리스티안 쿠에바","Christian Cueva",11,"CAM",33,"Alianza Lima","fringe"),
  p("안드레 카릴로","André Carrillo",7,"RW",34,"Al-Qadsiah","solid"),p("파올로 게레로","Paolo Guerrero",9,"ST",41,"César Vallejo","fringe"),
  p("잔루카 라푸두","Gianluca Lapadula",19,"ST",35,"Cagliari","solid"),p("에디손 플로레스","Edison Flores",17,"LW",31,"Universitario","solid"),
  p("세르히오 페냐","Sergio Peña",14,"CM",29,"Malmö","solid"),p("요시마루 히라노","Yoshimar Yotún",16,"CM",35,"Sporting Cristal","fringe"),
  p("마르코스 로페스","Marcos López",15,"LB",25,"Kopenhagen","solid"),p("산티아고 오르메뇨","Santiago Ormeño",18,"ST",31,"Puebla","fringe"),
  p("피에로 퀴세페","Piero Quispe",20,"CAM",23,"UNAM","solid"),p("알렌 바스쿠스","Allen Obando",21,"ST",19,"Barcelona SC","fringe"),
  p("카를로스 올리바","Carlos Oliva",13,"CB",28,"Universitario","fringe"),p("프랑코 시나테라","Franco Zanelatto",22,"RW",25,"Alianza Lima","solid"),
]))

teams.append(T("볼리비아","Bolivia","BOL","bo","CONMEBOL",76,col("#007A33","#F4E400","#D52B1E"),"Estadio Hernando Siles",
 mgr("안토니오 카를로스 자코","Antônio Carlos Zago","Brazil","수비적","4-4-2",2024),tac("4-4-2","defensive",5,5,5,"long",4),[
  p("기예르모 비스카라","Guillermo Viscarra",1,"GK",32,"The Strongest","solid"),p("카를로스 라마요","Carlos Lampe",12,"GK",38,"Bolívar","fringe"),p("루벤 코르도바","Rubén Cordano",23,"GK",26,"Blooming","fringe"),
  p("호세 사가르나가","José Sagarnaga",2,"RB",32,"Always Ready","fringe"),p("루이스 하에도","Luis Haquín",4,"CB",27,"Ponte Preta","solid"),
  p("헤수스 사기에르","Jesús Sagredo",5,"CB",31,"Bolívar","solid"),p("로베르토 페르난데스","Roberto Fernández",3,"LB",25,"Baltika","solid"),
  p("라몬 아부차","Ramiro Vaca",8,"CM",25,"Bolívar","solid"),p("모이세스 비야로엘","Moisés Villarroel",6,"CM",27,"The Strongest","solid"),
  p("마르셀로 마르텐스","Marcelo Martins Moreno",9,"ST",38,"Independent","fringe",True),p("빅토르 아브레고","Víctor Abrego",11,"ST",28,"Always Ready","solid"),
  p("미겔 테르세로스","Miguel Terceros",10,"CAM",21,"Santos","star"),p("헨리 비티","Henry Vaca",7,"CAM",27,"Always Ready","solid"),
  p("로베르토 카를로스","Roberto Carlos Fernández",17,"LB",24,"Bolívar","solid"),p("아드리안 후스페","Adrián Jusino",14,"CB",32,"The Strongest","solid"),
  p("카를로스 사우세도","Carlos Saucedo",19,"ST",35,"Guabirá","fringe"),p("후안 카를로스 아르세","Juan Carlos Arce",18,"RW",40,"Always Ready","fringe"),
  p("레오나르도 메넨데스","Leonardo Menéndez",15,"CM",24,"Oriente Petrolero","fringe"),p("페르난도 사유코","Fernando Saucedo",16,"CM",35,"Bolívar","fringe"),
  p("가르멜로 알기나다","Carmelo Algarañaz",20,"ST",29,"Always Ready","solid"),p("미겔 쿠에야르","Miguel Cuellar",13,"CB",26,"The Strongest","fringe"),
  p("야시르 사가르나가","Yasser Sagarnaga",21,"CM",22,"Blooming","fringe"),p("루이스 파스","Luis Paz",22,"ST",21,"Bolívar","fringe"),
]))

save("south_america", teams)
print("SA", len(teams))
