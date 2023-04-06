import json
js = open("news.json", "r").read()
js = json.loads(js)
inp = input(">>>> ")
ii = 0
for i in js:
	if i["id"] == inp:
		js.pop(ii)
	ii+=1
open("news.json", "w").write(json.dumps(js))
