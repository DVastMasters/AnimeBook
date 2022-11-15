from flask import Flask, jsonify
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


@service.route("/animes/<int:page>/<int:page_length>", methods=["GET"])
def get_anime_feeds(page, page_length):
    animes = []
    
    link = get_database_link()
    cur = link.cursor(dictionary=True)
    cur.execute(
        "SELECT " +  
            "id, " +
            "title, " +
            "image_path, " +
            "(SELECT COUNT(*) FROM Topic WHERE anime_id = id) AS c_topics " +
        "FROM " +
            "Anime " +
        "ORDER BY " +
            "c_topics DESC " +
        "LIMIT " + str((page - 1) * page_length) + ", " + str(page_length)
    )
    animes = cur.fetchall()
    
    return jsonify(animes)


@service.route("/search_animes/<string:title>/<int:page>/<int:page_length>", methods=["GET"])
def search_animes(title, page, page_length):
    animes = []
    
    link = get_database_link()
    cur = link.cursor(dictionary=True)
    cur.execute(
        "SELECT " +  
            "id, " +
            "title, " +
            "image_path " +
        "FROM " +
            "Anime " +
        "WHERE " +
            "title LIKE '%" + title + "%' " +
        "ORDER BY title ASC " +
        "LIMIT " + (str((page - 1) * page_length)) + ", " + str(page_length)
    )
    animes = cur.fetchall()
    
    return jsonify(animes)


@service.route("/suggestion_anime/<string:title>/<string:about>")
def add_suggestion(title, about):
    response = jsonify(status = "ok", error = "")
    
    link = get_database_link()
    cur = link.cursor(dictionary=True)
    
    try:
        cur.execute("INSERT INTO Suggestion(title, about) " +
                    f"VALUES ('{title}', '{about}')")
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