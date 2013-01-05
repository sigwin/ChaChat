ChaChat
=======

git clone https://github.com/sigwin/ChaChat.git

cd ChaChat

npm install socket.io validator sqlite3

node app.js

------------------------------------------------
======
node -v

v0.8.16
 
express@3.0.5 , 
socket.io@0.9.13 , 
sqlite3@2.1.5 , 
validator@0.4.19

<pre>
~/ChaChat$ tree .
.
├── README.md
├── app.js
├── modules
│   ├── server_socket.js
│   └── server_sqlite3.js
├── package.json
├── public
│   ├── images
│   │   └── bg.gif
│   ├── javascripts
│   │   └── socket_client.js
│   └── stylesheets
│       └── style.css
├── routes
│   └── index.js
└── views
    ├── index.jade
    └── layout.jade
</pre>
