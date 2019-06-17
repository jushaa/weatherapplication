from flask import Flask, jsonify, request
import mysql.connector
import yaml

db = yaml.load(open('python/db.yaml'))
mydb = mysql.connector.connect(
    host=db['mysql_host'],
    user=db['mysql_user'],
    password=db['mysql_password'],
    database=db['mysql_db']
)

app = Flask(__name__)

@app.route('/getUser', methods=['POST'])
def getAll():
    mycursor = mydb.cursor()
    getEmail = request.json
    email = getEmail['email']
    mycursor.execute("SELECT username FROM login WHERE email='" + str(email) + "'")
    username = str(mycursor.fetchone()[0])
    return username

@app.route('/makeUser', methods=['GET', 'POST'])
def setUser():
    mycursor = mydb.cursor()
    sqlFormula = "INSERT INTO login (email,password,username) VALUES(%s, %s, %s)"

    getEmail = request.json
    email = getEmail['email']

    getUsername = request.json
    username = getUsername['username']

    getPassword = request.json
    password = getPassword['password']

    user1 = (str(email), str(password), str(username))

    try:
        mycursor.execute(sqlFormula, user1)
        mydb.commit()
        return "Logged in successfully"
    except mysql.connector.IntegrityError as err:
        print("Error: {}".format(err))
        return "WRONG"


@app.route("/saveWeather", methods=['post'])
def saveWeather():
    mycursor = mydb.cursor()
    sqlFormula = "INSERT INTO weather (date,temperature,humidity,windspeed,username) VALUES(%s, %s, %s, %s, %s)"

    getDate = request.json
    date = getDate['date']

    getTemp = request.json
    temperature = getTemp['temperature']

    getHumidity = request.json
    humidity = getHumidity['humidity']

    getWind = request.json
    windspeed = getWind['windspeed']

    getUsername = request.json
    username = getUsername['username']

    weather = (str(date), int(temperature), int(humidity), int(windspeed), str(username))

    try:
        print()
        mycursor.execute(sqlFormula, weather)
        mydb.commit()
        return "Saved"
    except mysql.connector.IntegrityError as err:
        print("Error: {}".format(err))
        return "WRONG"

@app.route("/getWeather" , methods=['GET', 'POST'] )
def getWeather():
    mycursor = mydb.cursor()

    getUsername = request.json
    username = getUsername['username']
    mycursor.execute("SELECT date,temperature,humidity,windspeed FROM weather WHERE username='" + str(username) + "'")
    rows = mycursor.fetchall()
    items = []

    for row in rows:
        items.append({'date': row[0], 'temperature': row[1], 'humidity': row[2], 'windspeed': row[3]})

    mycursor.close()

    return jsonify(items)

@app.route("/Authenticate", methods=['GET', 'POST', 'DELETE'])
def Authenticate():
    getEmail = request.json
    email = getEmail['email']

    getPassword = request.json
    password = getPassword['password']

    mycursor = mydb.cursor()
    sqlFormula = "SELECT * from login where email='" + str(email) + "' and password='" + str(password) + "'"
    mycursor.execute(sqlFormula)
    data = mycursor.fetchone()
    if data is None:
        return "Username or Password is wrong"
    else:
        return "Logged in successfully"

if __name__ == '__main__':
    app.run(debug=True)
