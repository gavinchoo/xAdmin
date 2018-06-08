### 利用openssl生成证书文件
###### 生成私钥key文件
openssl genrsa 1024 > private/private.pem

###### 通过私钥文件生成CSR证书签名
openssl req -new -key private/private.pem -out private/csr.pem

###### 通过私钥文件和CSR证书签名生成证书文件
openssl x509 -req -days 365 -in private/csr.pem -signkey private/private.pem -out private/file.crt

### 修改启动文件www
##### 安装spdy
~~~
npm i spdy --save
~~~
##### 配置Https 证书端口号
~~~javascript
var https = require('spdy');
var privateKey  = fs.readFileSync(path.join(__dirname, './private/private.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, './private/file.crt'), 'utf8');
var credentials = {key: privateKey, cert: certificate};

var sslport = normalizePort(process.env.SSLPORT || '8001');

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(sslport);
httpsServer.on('error', onError);
httpsServer.on('listening', onListening);
~~~