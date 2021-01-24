(() => {
    // ユーザープールの設定
    const poolData = {
        UserPoolId: 'XXX',
        ClientId: 'XXX'
    }
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
    // Amazon Cognito 認証情報プロバイダーを初期化します
    AWS.config.region = "XXX"; // リージョン
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "XXX"
    });
  
    /**
     * サインイン処理
     */
    document.getElementById("signinButton").addEventListener("click", () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // 何か1つでも未入力の項目がある場合、メッセージを表示して処理を中断
      const message = document.getElementById('message-span');
      if (!email | !password) {
        message.innerHTML = "All fields are required.";
        return false;
      }
  
      // 認証データの作成
      const authenticationData = {
        Username: email,
        Password: password
      };
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
      );
  
      const userData = {
        Username: email,
        Pool: userPool
      };
      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  
      // 認証処理
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          console.log(result)
          const idToken = result.getIdToken().getJwtToken(); // IDトークン
          const accessToken = result.getAccessToken().getJwtToken(); // アクセストークン
          const refreshToken = result.getRefreshToken().getToken(); // 更新トークン
  
          console.log("idToken : " + idToken);
          console.log("accessToken : " + accessToken);
          console.log("refreshToken : " + refreshToken);
  
          // サインイン成功の場合、次の画面へ遷移
          console.log('Success !!!')
          
          // ID プールからクレデンシャル情報を取得することが
          // https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/switching-identities.html
          AWS.config.credentials.params.Logins = AWS.config.credentials.params.Logins || {};
          AWS.config.credentials.params.Logins['cognito-idp.ap-northeast-1.amazonaws.com/XXX'] = idToken;
        },
  
        onFailure: err => {
          // サインイン失敗の場合、エラーメッセージを画面に表示
          console.log(err);
          message.innerHTML = err.message;
        }
      });
    });
  })();

function getS3List(){
    console.log('click button')
    var bucketName = 'sassa-english'
    let s3 = new AWS.S3({params:{Bucket: bucketName}});
    s3.listObjects({Delimiter: '/'},function(err, data){
        if(err){
            console.log(err, err.stack);
        } else {
            console.log(data)
        }
    })
};
