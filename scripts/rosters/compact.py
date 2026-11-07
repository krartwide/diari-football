"""Helpers: build 23-man from compact pipe strings."""
import sys
sys.path.insert(0,"/workspace/scripts/rosters")
from packlib import p

def sq(*rows):
    """Each row: name|nameEn|num|POS|age|club|tier|[C]"""
    out=[]
    for r in rows:
        parts=r.split("|")
        name,ne,num,pos,age,club,tier=parts[:7]
        cap = len(parts)>7 and parts[7]=="C"
        out.append(p(name,ne,int(num),pos,int(age),club,tier,cap))
    return out
