# UEFA national teams — 2025-2026 World Cup era
from _emit import pl, team

def T(*a, **k):
    return team(*a, **k)

TEAMS = []

# ─── ESP ───
TEAMS.append(T('스페인','Spain','ESP','es','UEFA',1,'#C60B1E','#F1BF00','#FFFFFF','Estadio Santiago Bernabéu','루이스 데 라 푸엔테','Luis de la Fuente','Spain','점유율','4-3-3',2022,[
 pl('우나이 시몬','Unai Simón',1,'GK',28,'Athletic Club',tier='star'),pl('다비드 라야','David Raya',13,'GK',30,'Arsenal',tier='solid'),pl('알렉스 레미로','Álex Remiro',23,'GK',30,'Real Sociedad',tier='fringe'),
 pl('다니 카르바할','Dani Carvajal',2,'RB',33,'Real Madrid',tier='solid'),pl('페드로 포로','Pedro Porro',12,'RB',26,'Tottenham Hotspur',tier='solid'),
 pl('파우 쿠바르시','Pau Cubarsí',5,'CB',18,'Barcelona',tier='star'),pl('로빈 레 노름망','Robin Le Normand',3,'CB',29,'Atlético Madrid',tier='star'),pl('다니 비비안','Dani Vivian',4,'CB',26,'Athletic Club',tier='solid'),pl('아이메릭 라포르테','Aymeric Laporte',14,'CB',31,'Al-Nassr',tier='solid'),
 pl('마르크 쿠쿠레야','Marc Cucurella',17,'LB',27,'Chelsea',tier='solid'),pl('알레한드로 그리말도','Alejandro Grimaldo',15,'LB',30,'Bayer Leverkusen',tier='solid'),
 pl('로드리','Rodri',16,'CDM',29,'Manchester City',tier='star',captain=True),pl('마르틴 수비멘디','Martín Zubimendi',18,'CDM',26,'Arsenal',tier='star'),
 pl('페드리','Pedri',20,'CM',23,'Barcelona',tier='star'),pl('가비','Gavi',9,'CM',21,'Barcelona',tier='star'),pl('파비안 루이스','Fabián Ruiz',8,'CM',29,'Paris Saint-Germain',tier='solid'),pl('미켈 메리노','Mikel Merino',6,'CM',29,'Arsenal',tier='solid'),
 pl('다니 올모','Dani Olmo',10,'CAM',27,'Barcelona',tier='star'),pl('라민 야말','Lamine Yamal',19,'RW',18,'Barcelona',tier='star'),pl('니코 윌리암스','Nico Williams',11,'LW',23,'Athletic Club',tier='star'),
 pl('페란 토레스','Ferran Torres',7,'ST',25,'Barcelona',tier='solid'),pl('미켈 오야르사발','Mikel Oyarzabal',21,'ST',28,'Real Sociedad',tier='solid'),pl('알바로 모라타','Álvaro Morata',22,'ST',33,'Como',tier='solid'),
],mentality='attacking',pressing=8,tempo=8,width=7,build_up='short',defensive_line=8,wc=1))

# ─── FRA ───
TEAMS.append(T('프랑스','France','FRA','fr','UEFA',3,'#002395','#FFFFFF','#ED2939','Stade de France','디디에 데샹','Didier Deschamps','France','수비적','4-2-3-1',2012,[
 pl('마이크 메냥','Mike Maignan',16,'GK',30,'AC Milan',tier='star'),pl('브리스 삼바','Brice Samba',1,'GK',31,'Lens',tier='solid'),pl('알퐁스 아레올라','Alphonse Areola',23,'GK',32,'West Ham United',tier='fringe'),
 pl('쥘 쿤데','Jules Koundé',5,'RB',27,'Barcelona',tier='star'),pl('벵자맹 파바르','Benjamin Pavard',2,'RB',29,'Inter Milan',tier='solid'),
 pl('윌리엄 살리바','William Saliba',17,'CB',24,'Arsenal',tier='star'),pl('다요 우파메카노','Dayot Upamecano',4,'CB',27,'Bayern Munich',tier='solid'),pl('이브라히마 코나테','Ibrahima Konaté',15,'CB',26,'Liverpool',tier='solid'),pl('루카스 에르난데스','Lucas Hernández',21,'CB',29,'Paris Saint-Germain',tier='solid'),
 pl('테오 에르난데스','Theo Hernández',22,'LB',28,'AC Milan',tier='star'),
 pl('아우렐리앙 추아메니','Aurélien Tchouaméni',8,'CDM',25,'Real Madrid',tier='star'),pl("은골로 캉테","N'Golo Kanté",13,'CDM',34,'Al-Ittihad',tier='solid'),
 pl('에두아르도 카마빙가','Eduardo Camavinga',6,'CM',23,'Real Madrid',tier='star'),pl('아드리앙 라비오','Adrien Rabiot',14,'CM',30,'Marseille',tier='solid'),pl('워렌 자이르에메리','Warren Zaïre-Emery',18,'CM',19,'Paris Saint-Germain',tier='solid'),
 pl('앙투안 그리즈만','Antoine Griezmann',7,'CAM',34,'Atlético Madrid',tier='star'),
 pl('킬리안 음바페','Kylian Mbappé',10,'ST',27,'Real Madrid',tier='star',captain=True),pl('우스만 뎀벨레','Ousmane Dembélé',11,'RW',28,'Paris Saint-Germain',tier='star'),pl('마이클 올리스','Michael Olise',12,'RW',24,'Bayern Munich',tier='star'),
 pl('브래들리 바르콜라','Bradley Barcola',20,'LW',23,'Paris Saint-Germain',tier='solid'),pl('킹슬리 코망','Kingsley Coman',19,'LW',29,'Bayern Munich',tier='solid'),
 pl('마르쿠스 튀람','Marcus Thuram',9,'ST',28,'Inter Milan',tier='solid'),pl('랑달 콜로 무아니','Randal Kolo Muani',25,'ST',27,'Juventus',tier='solid'),
],mentality='balanced',pressing=7,tempo=7,width=6,build_up='mixed',defensive_line=6,wc=2))

# ─── ENG ───
TEAMS.append(T('잉글랜드','England','ENG','gb-eng','UEFA',4,'#FFFFFF','#000066','#CF081F','Wembley Stadium','토마스 투헬','Thomas Tuchel','Germany','압박형','4-2-3-1',2025,[
 pl('조던 픽포드','Jordan Pickford',1,'GK',31,'Everton',tier='star'),pl('딘 헨더슨','Dean Henderson',13,'GK',28,'Crystal Palace',tier='solid'),pl('제임스 트래포드','James Trafford',22,'GK',23,'Manchester City',tier='fringe'),
 pl('카일 워커','Kyle Walker',2,'RB',35,'Manchester City',tier='solid'),pl('리즈 제임스','Reece James',24,'RB',26,'Chelsea',tier='star'),pl('트렌트 알렉산더아놀드','Trent Alexander-Arnold',66,'RB',27,'Real Madrid',tier='star'),
 pl('존 스톤스','John Stones',5,'CB',31,'Manchester City',tier='star'),pl('마크 게히','Marc Guéhi',6,'CB',25,'Crystal Palace',tier='star'),pl('리바이 콜윌','Levi Colwill',14,'CB',22,'Chelsea',tier='solid'),pl('해리 매과이어','Harry Maguire',15,'CB',32,'Manchester United',tier='solid'),
 pl('루크 쇼','Luke Shaw',3,'LB',30,'Manchester United',tier='solid'),
 pl('디클란 라이스','Declan Rice',4,'CDM',26,'Arsenal',tier='star'),pl('주드 벨링엄','Jude Bellingham',10,'CM',22,'Real Madrid',tier='star'),pl('코비 마이누','Kobbie Mainoo',16,'CM',20,'Manchester United',tier='solid'),pl('콘어 갤러거','Conor Gallagher',8,'CM',25,'Atlético Madrid',tier='solid'),
 pl('필 포든','Phil Foden',11,'CAM',25,'Manchester City',tier='star'),pl('콜 파머','Cole Palmer',20,'CAM',23,'Chelsea',tier='star'),pl('에베레치 에제','Eberechi Eze',18,'CAM',27,'Arsenal',tier='solid'),
 pl('부카요 사카','Bukayo Saka',7,'RW',24,'Arsenal',tier='star'),pl('앤서니 고든','Anthony Gordon',19,'LW',24,'Newcastle United',tier='solid'),pl('자로드 보웬','Jarrod Bowen',21,'RW',29,'West Ham United',tier='solid'),
 pl('해리 케인','Harry Kane',9,'ST',32,'Bayern Munich',tier='star',captain=True),pl('올리 왓킨스','Ollie Watkins',17,'ST',29,'Aston Villa',tier='solid'),
],mentality='attacking',pressing=8,tempo=7,width=7,build_up='short',defensive_line=7,wc=1))

print('partial', len(TEAMS))
