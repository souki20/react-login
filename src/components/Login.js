import '../App.css'
import { auth, provider } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const history = useHistory();
  const [ error, setError ] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await auth.signInWithEmailAndPassword(email.value, password.value);
      history.push('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const handleLogin = async (event) => {
    try {
      await auth.signInWithPopup(provider);
      history.push('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>ログイン画面</h1>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div>
          <button>ログイン</button>
          <button onClick={handleLogin}>Google ログイン</button>
        </div>
        <div>
          ユーザー登録は<Link to={'/signup'}>こちら</Link>から
        </div>
      </form>
    </div>
  );
};

export default Login;