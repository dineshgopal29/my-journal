# Generates static/img/social/<name>.png for every blog post and guide and sets `image:` in its frontmatter.
# Run from the repo root: python3 scripts/generate-social-cards.py  (needs Pillow + pngquant; macOS Helvetica Neue)
import glob,re,os,subprocess
from PIL import Image,ImageDraw,ImageFont
W,H=1200,630
F="/System/Library/Fonts/HelveticaNeue.ttc"
def font(sz,idx): return ImageFont.truetype(F,sz,index=idx)
logo=Image.open("static/img/logo1.png").convert("RGBA").resize((96,96))
def clean(t): return re.sub(r'[^\x00-⿿]','',t).replace('  ',' ').strip(' -–—:')
def wrap(d,text,f,maxw):
    lines,cur=[],''
    for w in text.split():
        t=(cur+' '+w).strip()
        if d.textlength(t,font=f)<=maxw: cur=t
        else: lines.append(cur); cur=w
    lines.append(cur); return lines
def card(title,kind,out):
    img=Image.new("RGB",(W,H)); d=ImageDraw.Draw(img)
    for y in range(H):
        t=y/H; d.line([(0,y),(W,y)],fill=(int(49+20*t),int(46+10*t),int(129+30*t)))
    d.text((80,70),kind.upper(),font=font(28,1),fill="#a5b4fc")
    for size in (72,64,56,48):
        f=font(size,1); lines=wrap(d,title,f,W-160)
        if len(lines)<=4: break
    y=130
    for l in lines[:4]:
        d.text((80,y),l,font=f,fill="white"); y+=int(size*1.2)
    img.paste(logo,(80,H-140),logo)
    d.text((196,H-122),"AI Social Journal",font=font(34,1),fill="white")
    d.text((196,H-80),"aisocialjournal.com",font=font(26,0),fill="#c7d2fe")
    img.save(out,optimize=True); subprocess.run(["pngquant","--quality","70-90","--ext",".png","--force",out],check=True)
n=0
for kind,pat in (("Blog","blog/*.md"),("Guide","docs/*/*.md")):
    for p in sorted(glob.glob(pat)):
        s=open(p).read(); m=re.match(r'---\n(.*?)\n---\n',s,re.S)
        fm=m.group(1)
        tm=re.search(r'^title:\s*(.+)$',fm,re.M); title=clean(tm.group(1).strip().strip('"\''))
        name=re.sub(r'^\d{4}-\d{2}-\d{2}-','',os.path.basename(p)[:-3])
        out=f"static/img/social/{name}.png"; card(title,kind,out)
        line=f"image: /img/social/{name}.png"
        if re.search(r'^image:.*$',fm,re.M): fm2=re.sub(r'^image:.*$',line,fm,flags=re.M)
        else: fm2=re.sub(r'^(title:.*)$',lambda mm:mm.group(1)+"\n"+line,fm,count=1,flags=re.M)
        s=s.replace(fm,fm2,1); open(p,'w').write(s); n+=1; print(name,'|',title)
print(n)
