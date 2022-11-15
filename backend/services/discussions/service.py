from flask import Flask, jsonify, request
import mysql.connector as mysql

service = Flask(__name__)

MYSQL_SERVER = "database"
MYSQL_USER = "root"
MYSQL_PASS = "admin"
MYSQL_DATABASE = "AnimeBook"

def get_database_link():
    link = mysql.connect(
        host= MYSQL_SERVER, user=MYSQL_USER, password=MYSQL_PASS, database=MYSQL_DATABASE
    )
    
    return link


@service.route("/discussions/<int:topic_id>", methods=["GET"])
def get_anime_topics(topic_id):
    discussions = []
    
    link = get_database_link()
    cur = link.cursor(dictionary=True)
    cur.execute(
        "SELECT " +  
            "id, " +
            "text, " +
            "author " +
        "FROM " +
            "Discussion " +
        "WHERE " +
            "topic_id = " + str(topic_id) + " " +
        "ORDER BY text "
    )
    discussions = cur.fetchall()
    
    return jsonify(discussions)


@service.route("/add_discussion/<int:topic_id>/<string:text>/<string:author>")
def add_discussion(topic_id, text, author):
    response = jsonify(status = "ok", error = "")
    
    link = get_database_link()
    cur = link.cursor(dictionary=True)
    
    try:
        cur.execute("INSERT INTO Discussion(topic_id, text, author) " +
                    f"VALUES ({topic_id}, '{text}', '{author}')")
        link.commit()
    except Exception as e:
        link.rollback()
        response = jsonify(situacao = "error", error = "An error occurred: " + str(e))
        
    return response


if __name__ == "__main__":
    service.run(
        host="0.0.0.0",
        debug=True
    )