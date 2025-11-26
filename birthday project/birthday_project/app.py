from flask import Flask, render_template, request, redirect, url_for
import random

app = Flask(__name__)

# Danh sách câu trả lời đúng
correct_answers = ["có","co","yes","yê","ye","dạ có","ừ","ok","uh","yêu","yeu"]

# Danh sách thông báo khi nhập sai
error_messages = [
    "mk đéo đúng!",
    "tệ vãi…",
    "???",
    "câu trả lời của bạn chưa đúng ý tôi",
    "vãi l tệ!"
]

@app.route("/", methods=["GET", "POST"])
def lockscreen():
    message = ""
    if request.method == "POST":
        ans = request.form.get("password", "").strip().lower()
        if ans in correct_answers:
            return redirect("/desktop")
        else:
            message = random.choice(error_messages)
    return render_template("lock.html", message=message)

@app.route("/desktop")
def desktop():
    # Danh sách ảnh sinh nhật
    birthday_images = ["birthday1.jpg", "birthday2.jpg", "birthday3.jpg"]
    return render_template("desktop.html", birthday_images=birthday_images)

if __name__ == "__main__":
    app.run(debug=True)
