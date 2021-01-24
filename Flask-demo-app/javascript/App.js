import logo from './logo.svg';
import './App.css';
import './cognitoConfig'

import Amplify, {Auth, Storage} from 'aws-amplify';

function setCredential(){
  console.log('click')
  localStorage.setItem('CognitoIdentityServiceProvider.XXX.LastAuthUser', 'XXX');
  localStorage.setItem('CognitoIdentityServiceProvider.XXX.userName.idToken', 'XXX');
  localStorage.setItem('CognitoIdentityServiceProvider.XXX.userName.accessToken', 'XXX');
  localStorage.setItem('CognitoIdentityServiceProvider.XXX.userName.refreshToken', 'XXX');
  localStorage.setItem('CognitoIdentityServiceProvider.XXX.clockDrift', '0');

  Auth.currentAuthenticatedUser({
    bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(user => console.log(user))
  .catch(err => console.log(err))
}

// async function signIn() {
//   try {
//       await Auth.signIn('sassa');
//       console.log('code resent successfully');
//   } catch (err) {
//       console.log('error resending code: ', err);
//   }
// }

const getUser = async () => {
  let user = await Auth.currentAuthenticatedUser()
  console.log(user)
}

const getCredentials = async () => {
  let credential = await Auth.currentCredentials()
  console.log(credential)
}

function checkCredential(){
  console.log('check Credential')
  getCredentials();
  getUser();
  Amplify.configure({
    Storage: {
      AWSS3: {
          bucket: 'XXX', //REQUIRED -  Amazon S3 bucket name
          region: 'XXX', //OPTIONAL -  Amazon service region
      }
    }
  })
  getObject()
}

const getObject = async() => {
  const data = await Storage.get('XXX', { download: true });
  console.log(data)
  // data.Body is a Blob
  data.Body.text().then(string => { 
  // handle the String data return String 
    console.log(string)
  })
}

const signOut = async() => {
  await Auth.signOut();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="button" value='setCredential' onClick={() => setCredential()}/>
        <input type="button" value='checkCredential' onClick={() => checkCredential()}/>
        <input type="button" value='signOut' onClick={() => signOut()}/>
      </header>
    </div>
  );
}

export default App;
