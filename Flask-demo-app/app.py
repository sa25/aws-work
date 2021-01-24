from flask import Flask, render_template
import ssl

app = Flask(__name__)

context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
context.load_cert_chain('./cert/cert.pem', './cert/privkey.pem')

@app.route('/signin')
def sign_in():
    return render_template('signin.html')

if __name__ == "__main__":
    app.run(host='127.0.0.1', ssl_context=context, threaded=True, debug=True)