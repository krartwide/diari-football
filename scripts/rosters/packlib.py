import json, os
OUT="/workspace/scripts/rosters/json"
os.makedirs(OUT, exist_ok=True)

def p(name, nameEn, number, position, age, club, tier="solid", isCaptain=False):
    d={"name":name,"nameEn":nameEn,"number":number,"position":position,"age":age,"club":club,"tier":tier}
    if isCaptain: d["isCaptain"]=True
    return d

def mgr(n,e,nat,per,form,since):
    return {"name":n,"nameEn":e,"nationality":nat,"personality":per,"preferredFormation":form,"since":since}

def tac(form, ment="balanced", pr=6, te=6, wi=6, bu="mixed", dl=6):
    return {"formation":form,"mentality":ment,"pressing":pr,"tempo":te,"width":wi,"buildUp":bu,"defensiveLine":dl}

def col(a,b,c,pat="solid"):
    return {"primary":a,"secondary":b,"accent":c,"pattern":pat}

def T(name,nameEn,code,iso,conf,rank,colors,stad,manager,tactics,players,wc=None):
    # ensure unique numbers
    used=set(); fixed=[]
    for pl in players:
        n=pl["number"]
        while n in used: n+=1
        used.add(n)
        if n!=pl["number"]:
            pl={**pl,"number":n}
        fixed.append(pl)
    d={"name":name,"nameEn":nameEn,"fifaCode":code,"iso2":iso,"confederation":conf,"fifaRank":rank,
       "colors":colors,"stadium":stad,"manager":manager,"tactics":tactics,"players":fixed}
    if wc is not None: d["worldCupTitles"]=wc
    return d

def save(name, teams):
    path=f"{OUT}/{name}.json"
    with open(path,"w",encoding="utf-8") as f:
        json.dump(teams,f,ensure_ascii=False)
    print(f"{name}: {len(teams)} teams, {sum(len(t['players']) for t in teams)} players")
    short=[t["name"] for t in teams if len(t["players"])<20]
    if short: print("  short squads:", short)
    return path
