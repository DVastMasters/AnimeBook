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


@service.route("/topics/<int:anime_id>/<int:page>/<int:page_length>", methods=["GET"])
def get_anime_topics(anime_id, page, page_length):
    topics = []
    
    link = get_database_link()
    cur = link.cursor(dictionary=True)
    cur.execute(
        "SELECT " +  
            "id, " +
            "title, " +
            "description, " +
            "author " +
        "FROM " +
            "Topic " +
        "WHERE " +
            "anime_id = " + str(anime_id) + " " +
        "ORDER BY title " +
        "LIMIT " + str((page - 1) * page_length) + ", " + str(page_length)
    )
    topics = cur.fetchall()
    
    return jsonify(topics)


@service.route("/topic/<int:id>", methods=["GET"])
def get_topic_by_id(id):
    topic = []
    
    link = get_database_link()
    cur = link.cursor(dictionary=True)
    cur.execute(
        "SELECT " +  
            "id, " +
            "title, " +
            "description, " +
            "author, " +
            "(SELECT COUNT(*) FROM Discussion WHERE topic_id = id) AS c_discussion " +
        "FROM " +
            "Topic " +
        "ORDER BY " +
            "c_discussion DESC " +
        "WHERE " +
            "id = " + str(id)
    )
    topic = cur.fetchone()
    
    return jsonify(topic)


@service.route("/add_topic/<int:anime_id>/<string:title>/<string:description>/<string:author>")
def add_topic(anime_id, title, description, author):    
    response = jsonify(status = "ok", error = "")
    
    link = get_database_link()
    cur = link.cursor(dictionary=True)
    
    try:
        cur.execute("INSERT INTO Topic(anime_id, title, description, author) " +
                    f"VALUES ({anime_id}, '{title}', '{description}', '{author}')")
        link.commit()
    except Exception as e:
        link.rollback()
        response = jsonify(status = "error", error = "An error occurred: " + str(e))
        
    return response


if __name__ == "__main__":
    service.run(
        host="0.0.0.0",
        debug=True
    )