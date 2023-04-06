from flask import Flask, request, render_template, url_for, send_from_directory
import json, random
app = Flask(__name__)
class jss:
    def __init__(self, name):
        self.name = name
        self.f = json.loads(open(self.name, "r").read())
    def save(self):
        open(self.name, "w").write(json.dumps(self.f))
    def load(self):
        self.f = json.loads(open(self.name, "r").read())
js = jss("news.json")
jsn = jss("comments.json")
@app.route('/')
def hello_world():
    js.load()
    return js.f
@app.route('/<id>')
def hello_worl(id):
    js.load()
    for i in js.f:
        if i["id"] == id:
            try:
                i["times"] += 1
                print(i)
            except:
                i["times"] = 1
                print(1)
            js.save()
            return i
    return []
@app.route('/comments/<id>')
def hellow(id):
    jsn.load()
    for i in jsn.f:
        if i == id:
            return jsn.f[id]
    return []
@app.route('/s2d8wbhmx9miokrfn4j7', methods = ['GET', 'POST'])
def hello_wor():
    if request.method == "POST":
        title = request.form["title"]
        text = request.form["text"]
        dis = request.form["dis"]
        url = request.form["url"]
        ids = []
        for i in js.f:
            ids.append(i)
        t = True
        while t:
            idd = random.randint(1000,9999)
            if idd not in ids:
                t = False
        js.f.insert(0,{"id": str(idd), "title": title, "excerpt": dis, "content": text, "thumbnail_url": url})
        js.save()
        return "good"
    elif request.method == "GET":
        return render_template("form.html")
@app.route('/favicon.ico')
def favicon():
    return url_for('static', filename='favicon.ico')
@app.route('/search/<search>')
def hello_wo(search):
    js.load()
    li = []
    for i in js.f:
        if search in json.dumps(i):
            li.append(i)
    return li
    return False
@app.route('/s2d8wbhmx9miokrfn4j7/edit/<idd>')
def hello_w(idd):
    if request.method == "GET":
        js.load()
        num = 0
        for i in js.f:
            if i["id"] == idd:
                r = i
                break
            num += 1
        return render_template("edit.html", data=r, value=f"{num}", idd=idd)
@app.route('/s2d8wbhmx9miokrfn4j7/edit', methods = ['POST', 'GET'])
def hello():
    if request.method == "POST":
        title = request.form["title"]
        text = request.form["text"]
        dis = request.form["dis"]
        url = request.form["url"]
        num = request.form["num"]
        idd = request.form["id"]
        js.f[int(num)] = {"id": str(idd), "title": title, "excerpt": dis, "content": text, "thumbnail_url": url}
        js.save()
        return "good"
    elif request.method == "GET":
        return render_template("red.html")
@app.route('/email', methods = ['POST', 'GET'])
def email():
    f = json.loads(open("email.json", "r").read())
    email = request.form.get("email")
    f.append(str(email))
    open("email.json", "w").write(json.dumps(f))
    return ""
@app.route('/static/<path>')
def send_report(path):
    if ".." in path:
        return
    return send_from_directory('images', path)
app.run("0.0.0.0", port=5000)
